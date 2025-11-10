interface UseIndexedDBOptions<T> {
  dbName?: string;
  storeName?: string;
  key: string;
  defaultValue: T;
  // debounce ms for batching writes to IndexedDB (0 = no debounce)
  debounceMs?: number;
}

/**
 * Reactive composable for storing and syncing data in IndexedDB.
 * Works similarly to useSessionStorage().
 */
export default function useIndexedDB<T>({
  dbName = "nuxt-indexeddb",
  storeName = "data",
  key,
  defaultValue,
  debounceMs = 200,
}: UseIndexedDBOptions<T>) {
  const data = ref<T>(defaultValue);
  let db: IDBDatabase | null = null;

  // Only run IndexedDB code on the client
  const isClient = typeof window !== "undefined" && "indexedDB" in window;

  // Sync id and helpers for cross-context (iframe/window) sync
  const broadcastId = Math.random().toString(36).slice(2);
  let isApplyingRemote = false; // prevent loops when applying incoming updates
  let isInitializing = false; // prevent writes while initializing from DB

  // debounce state
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let pendingValue: any = undefined;

  const registerSyncChannel = () => {
    if (!isClient) return () => {};
    const channelName = `nuxt-indexeddb-sync:${dbName}`;

    if ((globalThis as any).BroadcastChannel) {
      const bc = new (globalThis as any).BroadcastChannel(channelName);
      const onMessage = async (ev: MessageEvent) => {
        try {
          const msg = ev.data;
          if (!msg || msg.key !== key || msg.id === broadcastId) return;
          // cancel any pending local debounced writing to avoid overwriting this remote update
          if (debounceTimer) {
            clearTimeout(debounceTimer as any);
            debounceTimer = null;
            pendingValue = undefined;
          }
          isApplyingRemote = true;
          if (typeof msg.value !== "undefined") {
            // directly apply broadcasted value when present
            data.value = msg.value as any;
            setTimeout(() => (isApplyingRemote = false), 0);
            return;
          }
          if (!db) db = await openDB();
          const stored = await getItem(key);
          if (stored !== null && typeof stored !== "undefined")
            data.value = stored as any;
          setTimeout(() => (isApplyingRemote = false), 0);
        } catch {
          // ignore
        }
      };
      bc.addEventListener("message", onMessage);
      return () => bc.close();
    }

    // Fallback: use localStorage 'storage' event as a broadcast channel
    const onStorage = async (ev: StorageEvent) => {
      try {
        if (ev.key !== `nuxt-indexeddb-sync:${dbName}`) return;
        const msg = ev.newValue ? JSON.parse(ev.newValue) : null;
        if (!msg || msg.key !== key || msg.id === broadcastId) return;
        // cancel any pending local debounced writing to avoid overwriting this remote update
        if (debounceTimer) {
          clearTimeout(debounceTimer as any);
          debounceTimer = null;
          pendingValue = undefined;
        }
        isApplyingRemote = true;
        if (typeof msg.value !== "undefined") {
          data.value = msg.value as any;
          setTimeout(() => (isApplyingRemote = false), 0);
          return;
        }
        if (!db) db = await openDB();
        const stored = await getItem(key);
        if (stored !== null && typeof stored !== "undefined")
          data.value = stored as any;
        setTimeout(() => (isApplyingRemote = false), 0);
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  };

  const broadcastChange = (payload?: any) => {
    if (!isClient) return;
    const channelName = `nuxt-indexeddb-sync:${dbName}`;
    const msgObj: any = { key, id: broadcastId, ts: Date.now() };
    if (typeof payload !== "undefined") msgObj.value = payload;
    try {
      if ((globalThis as any).BroadcastChannel) {
        const bc = new (globalThis as any).BroadcastChannel(channelName);
        // structured data can be posted directly via BroadcastChannel
        bc.postMessage(msgObj);
        bc.close();
      } else {
        // write to localStorage to trigger storage event in other contexts
        // localStorage requires a stringifies payload; ensure it's JSON-safe
        try {
          localStorage.setItem(channelName, JSON.stringify(msgObj));
        } catch {
          // if payload not serializable, send without value
          localStorage.setItem(
            channelName,
            JSON.stringify({ key, id: broadcastId, ts: Date.now() }),
          );
        }
      }
    } catch {
      /* ignore */
    }
  };

  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      if (!isClient)
        return reject(new Error("IndexedDB is not available on the server"));
      const request = indexedDB.open(dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const getItem = (key: string): Promise<T | null> => {
    return new Promise((resolve, reject) => {
      if (!db) return resolve(null);
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  };

  // Ensure value is safe/clonable for IndexedDB. Prefer structuredClone, fallback to JSON.
  const makeClonable = <U>(value: U): U => {
    try {
      const sc = (globalThis as any).structuredClone;
      if (typeof sc === "function") return sc(value);
    } catch {
      // ignore and fallback
    }

    try {
      return JSON.parse(JSON.stringify(value));
    } catch {
      // If everything fails, return the original (may still throw when put is attempted)
      return value;
    }
  };

  const setItem = (key: string, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) return reject(new Error("DB not initialized"));
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      let safe: any;
      try {
        safe = makeClonable(value);
        store.put(safe, key);
      } catch (err) {
        tx.abort();
        return reject(err);
      }
      tx.oncomplete = () => {
        try {
          // notify other contexts that this key changed
          // include the stored value in the broadcast to avoid extra reads
          broadcastChange(safe);
        } catch {
          /* ignore broadcast errors */
        }
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  };

  const init = async () => {
    if (!isClient) return;
    db = await openDB();
    const stored = await getItem(key);
    if (stored !== null && typeof stored !== "undefined") {
      // Prevent watcher from writing the loaded value back to the DB
      isInitializing = true;
      data.value = stored;
      // release initialization guard on next tick
      setTimeout(() => {
        isInitializing = false;
      }, 0);
    }
  };

  const registerWatcher = () =>
    watch(
      data,
      async (newVal) => {
        if (!isClient) return;
        if (isApplyingRemote || isInitializing) return; // skip writes triggered by incoming sync or init
        if (!db) db = await openDB();
        // Unwrap Vue reactivity first to avoid proxies (which can cause DataCloneError)
        const raw = toRaw(newVal as any);

        if (!debounceMs || debounceMs <= 0) {
          // immediate write
          await setItem(key, raw);
          return;
        }

        // debounce: store pending value and schedule a write
        pendingValue = raw;
        if (debounceTimer) clearTimeout(debounceTimer as any);
        debounceTimer = setTimeout(async () => {
          // on timer fire, write the pending value
          try {
            const toWrite = pendingValue;
            pendingValue = undefined;
            // ensure DB is open
            if (!db) db = await openDB();
            await setItem(key, toWrite);
          } catch {
            // ignore write errors here
          } finally {
            debounceTimer = null;
          }
        }, debounceMs) as any;
      },
      { deep: true },
    );

  // Detect whether this composable is called inside a component's setup
  const instance = getCurrentInstance();

  if (instance) {
    // Safe to run init immediately (no DOM dependency) and register watcher tied to the component
    const stopSync = registerSyncChannel();
    onScopeDispose(() => stopSync());
    // Delay init
    onMounted(() => {
      init();
    });
    registerWatcher();

    // ensure the debounce timer is cleared when the component unmounts
    onScopeDispose(() => {
      if (debounceTimer) {
        clearTimeout(debounceTimer as any);
        debounceTimer = null;
        pendingValue = undefined;
      }
    });
  } else if (isClient) {
    // If no active component instance (e.g. composable used outside setup or after an await),
    // create an effect scope and run init/watch inside it so the watcher is properly tracked.
    const scope = effectScope();
    scope.run(async () => {
      const stopSync = registerSyncChannel();
      onScopeDispose(() => stopSync());
      // run init immediately for non-component usages
      await init();
      registerWatcher();
      // cleanup debounce timer when the scope disposes
      onScopeDispose(() => {
        if (debounceTimer) {
          clearTimeout(debounceTimer as any);
          debounceTimer = null;
          pendingValue = undefined;
        }
      });
    });
    // Note: scope will live for the lifetime of this module; if you need to stop it, call scope.stop().
  }

  return data;
}

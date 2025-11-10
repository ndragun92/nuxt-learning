import { useIDBKeyval } from "@vueuse/integrations/useIDBKeyval";

const { data, isFinished } = useIDBKeyval("test", {
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  image: "",
  images: [],
  category: "",
  tags: [],
  status: "",
});

const refreshIDB = useSessionStorage("keyval-store", `${Date.now()}`);

export default function useBuilder() {
  const localData = ref(data.value);
  const watchData = computed(() => data.value);

  const getDataFromIndexedDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("keyval-store");

      request.onerror = () => reject("Failed to open IndexedDB");

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction("keyval", "readonly");
        const store = tx.objectStore("keyval");
        const getReq = store.get("test");

        getReq.onsuccess = () => resolve(getReq.result);
        getReq.onerror = () => reject("Failed to get data");
      };
    });
  };

  watchDebounced(
    watchData,
    (_data) => {
      console.log("test", window.location.href);
      refreshIDB.value = `${Date.now()}`;
    },
    {
      deep: true,
      debounce: 1000,
    },
  );

  watch(refreshIDB, () => {
    getDataFromIndexedDB()
      .then((_data) => {
        localData.value = _data as typeof localData.value;
      })
      .catch((err) => console.error(err));
  });

  return { data, localData, isFinished };
}

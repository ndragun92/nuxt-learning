<template>
  <header
    class="border-b-2 bg-neutral-900 border-b-pink-800 h-16 sticky top-0 z-20 flex justify-between items-center px-4 text-white"
  >
    <div class="flex items-center gap-2">
      <button
        v-if="showSidebar"
        type="button"
        class="size-8 flex items-center justify-center border border-pink-800 rounded hover:bg-neutral-800"
        @click="showSidebar = false"
      >
        <Icon name="mdi:close" size="20" />
      </button>
      <UiLogo />
      <sup class="font-semibold text-pink-800">Workshop</sup>
    </div>
    <div
      v-if="returnCurrentRoute?.meta"
      class="font-semibold flex items-center gap-2"
    >
      <button
        class="size-6 flex items-center justify-center bg-neutral-800 border border-pink-800 rounded hover:bg-neutral-700"
        @click="navigateToPreviousRoute"
      >
        <Icon name="mdi:chevron-left" />
      </button>
      <h2>
        {{ returnCurrentRoute?.meta?.displayName || "Missing displayName" }}
      </h2>
      <button
        class="size-6 flex items-center justify-center bg-neutral-800 border border-pink-800 rounded hover:bg-neutral-700"
        @click="navigateToNextRoute"
      >
        <Icon name="mdi:chevron-right" />
      </button>
    </div>
    <div v-if="returnCurrentRoute?.meta" class="text-sm">
      {{ returnCurrentRouteIndex + 1 }} of {{ routes.length }}
    </div>
  </header>
  <div class="flex flex-1 min-h-0">
    <aside class="p-4">
      <nav
        class="bg-white h-full overflow-y-auto overflow-x-hidden border border-neutral-100 shadow-lg shadow-neutral-100 rounded-lg"
        :class="{
          'w-64': showSidebar,
          'w-16': !showSidebar,
        }"
      >
        <ul class="divide-y divide-neutral-100 text-neutral-500">
          <template v-if="showSidebar">
            <li v-for="(route, index) in routes" :key="route.name">
              <NuxtLink
                :to="{
                  name: route.name,
                }"
                class="px-4 py-3 block w-full hover:text-black hover:pl-6 transition-all font-medium"
                active-class="bg-neutral-100 !text-pink-800"
                >[{{ index + 1 }}]
                {{ route.meta?.displayName || "Missing displayName" }}</NuxtLink
              >
            </li>
          </template>
          <li v-else class="pt-4">
            <button
              type="button"
              class="size-8 mx-auto flex items-center justify-center border border-pink-800 rounded hover:bg-neutral-200"
              @click="showSidebar = true"
            >
              <Icon name="solar:hamburger-menu-linear" size="20" />
            </button>
          </li>
        </ul>
      </nav>
    </aside>
    <main
      class="flex-1 min-h-0 h-full overflow-y-auto overflow-x-hidden py-4 px-2"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const showSidebar = ref(false);

const router = useRouter();

const routes = computed(() =>
  [...router.options.routes.filter((o) => o.path.split("/").length < 3)].sort(
    (a, b) => {
      const orderA = (a.meta?.order as number) ?? 0;
      const orderB = (b.meta?.order as number) ?? 0;
      return orderA - orderB;
    },
  ),
);

const route = useRoute();

const routeName = computed(() => route.name);

const returnCurrentRoute = computed(() => {
  return routes.value.find((route) => route.name === routeName.value);
});

const returnCurrentRouteIndex = computed(() => {
  return routes.value.findIndex((route) => route.name === routeName.value) ?? 0;
});

const navigateToPreviousRoute = () => {
  const previousRouteIndex = returnCurrentRouteIndex.value - 1;
  const previousRoute = routes.value[previousRouteIndex];
  if (previousRoute) {
    router.push({ name: previousRoute.name });
  }
};

const navigateToNextRoute = () => {
  const nextRouteIndex = returnCurrentRouteIndex.value + 1;
  const nextRoute = routes.value[nextRouteIndex];
  if (nextRoute) {
    router.push({ name: nextRoute.name });
  }
};

onMounted(() => {
  useEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      navigateToPreviousRoute();
    }
    if (e.key === "ArrowRight") {
      navigateToNextRoute();
    }
  });
});
</script>

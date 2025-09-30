<template>
  <header
    class="border-b-2 bg-neutral-900 border-b-pink-800 h-16 sticky top-0 z-20 flex justify-between items-center px-4 text-white"
  >
    <div class="flex items-center gap-2">
      <UiLogo />
      <sup class="font-semibold text-pink-800">Workshop</sup>
    </div>
    <div class="font-semibold flex items-center gap-2">
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
    <div class="text-sm">
      {{ returnCurrentRouteIndex + 1 }} of {{ routes.length }}
    </div>
  </header>
  <div class="flex flex-1 min-h-0">
    <aside class="p-4">
      <nav
        class="w-64 bg-white h-full overflow-y-auto overflow-x-hidden border border-neutral-100 shadow-lg shadow-neutral-100 rounded-lg"
      >
        <ul class="divide-y divide-neutral-100 text-neutral-500">
          <li v-for="route in routes" :key="route.name">
            <NuxtLink
              :to="{
                name: route.name,
              }"
              class="px-4 py-3 block w-full hover:text-black hover:pl-6 transition-all font-medium"
              active-class="bg-neutral-100 !text-pink-800"
              >{{ route.meta?.displayName || "Missing displayName" }}</NuxtLink
            >
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
const router = useRouter();

const routes = computed(() => router.options.routes);

console.log("routes", routes.value);

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
</script>

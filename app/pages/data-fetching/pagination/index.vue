<template>
  <div class="container mx-auto">
    <div
      class="bg-white/25 sticky top-0 z-10 py-2 px-4 flex justify-between items-center"
    >
      <div>
        <UiButton
          :class="{
            'opacity-50 cursor-not-allowed': currentPage <= 1,
          }"
          :disabled="currentPage <= 1"
          @click="onPrevPage"
        >
          <Icon name="mdi:chevron-left"
        /></UiButton>
      </div>
      <div class="text-xs text-gray-500">
        {{ currentPage }} / {{ maxPages }}
      </div>
      <div>
        <UiButton
          :class="{
            'opacity-50 cursor-not-allowed': currentPage >= maxPages,
          }"
          :disabled="currentPage >= maxPages"
          @click="onNextPage"
        >
          <Icon name="mdi:chevron-right" />
        </UiButton>
      </div>
    </div>
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mt-4">
      Products
    </h2>

    <div v-if="status === 'pending'" class="text-center px-4 py-12">
      Loading products...
    </div>
    <div
      v-else-if="data"
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <div v-for="item in data" :key="item.id" class="group relative">
        <ClientOnly>
          <div
            class="relative aspect-square w-full rounded-md overflow-hidden bg-gray-200"
          >
            <div
              v-if="!item.loaded"
              class="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            />

            <img
              :key="`${item.id}--${item.images[0]}`"
              :src="item.images[0]"
              :alt="item.title"
              class="aspect-square w-full h-full rounded-md object-cover transition-opacity duration-700"
              :class="{ 'opacity-0': !item.loaded, 'opacity-100': item.loaded }"
              @load="item.loaded = true"
            />
          </div>
        </ClientOnly>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <span>
                <span aria-hidden="true" class="absolute inset-0"></span>
                {{ item.title }}
              </span>
            </h3>
            <p class="mt-1 text-sm text-gray-500 line-clamp-2">
              {{ item.description }}
            </p>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ item.price }}€</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center px-4 py-12">No products found.</div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const limit = 8;
const maxPages = 4;

const currentOffset = computed(() => parseInt(`${route.query.offset}`) || 0);
const currentPage = computed(() => Math.floor(currentOffset.value / limit) + 1);

const fetchQuery = computed(() => ({ offset: currentOffset.value, limit }));
const fetchKey = computed(() => `products-page-${currentOffset.value}`);

const { data, status } = await useFetch<
  {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    loaded: boolean;
  }[]
>("https://api.escuelajs.co/api/v1/products", {
  transform: (items) =>
    items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      images: item.images,
      loaded: false,
    })),
  key: fetchKey,
  method: "get",
  deep: true,
  query: fetchQuery,
  getCachedData: (key, nuxtApp) => {
    // Current issue with double fetch on initial call
    // https://github.com/nuxt/nuxt/issues/33383
    console.log("getCachedData", key);
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

const onPrevPage = async () => {
  const prevOffset = currentOffset.value - limit;
  await router.push({
    query: {
      ...route.query,
      offset: String(prevOffset),
    },
  });
};

const onNextPage = async () => {
  const nextOffset = currentOffset.value + limit;
  await router.push({
    query: {
      ...route.query,
      offset: String(nextOffset),
    },
  });
};
</script>

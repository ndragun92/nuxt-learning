<template>
  <UiDivider>Page Two</UiDivider>
  <section class="mx-auto max-w-2xl mt-4 space-y-4">
    <div v-if="status === 'pending'" class="text-center">Loading...</div>
    <div v-else-if="data" class="bg-white px-6 py-12">
      <figure>
        <blockquote
          class="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9"
        >
          <p>“{{ data.value }}”</p>
        </blockquote>
        <figcaption class="mt-10 flex items-center gap-x-6">
          <img class="size-12 bg-gray-50" :src="data.icon_url" alt="" />
          <div class="text-sm/6">
            <div class="font-semibold text-gray-900">Chuck Norris</div>
            <div class="mt-0.5 text-gray-600">
              <NuxtTime
                :datetime="data.created_at"
                year="numeric"
                month="long"
                day="numeric"
                hour="2-digit"
                minute="2-digit"
                second="2-digit"
              />
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
  <div class="mt-8 space-y-4">
    <UiDivider>Display data inside nested component</UiDivider>
    <ElDataFetchingFirstComponent />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "data-fetching",
});

const { status, data } = useFetch<{
  created_at: string;
  icon_url: string;
  value: string;
}>("https://api.chucknorris.io/jokes/random", {
  key: "shared-jokes",
  lazy: true,
  getCachedData: (key, nuxtApp) => {
    console.log("getCachedData", key);
    // Return from cache if exists and prevent additional load
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <UiDivider>Page One</UiDivider>
  <section class="mx-auto max-w-2xl mt-4 space-y-4">
    <div class="flex justify-center">
      <UiButton @click="onFetchNewJoke">Fetch new joke</UiButton>
    </div>
    <div v-if="status === 'pending'" class="text-center">Loading...</div>
    <div v-else-if="data" class="bg-white px-6 py-24 sm:py-32 lg:px-8">
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
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "data-fetching",
});

const { status, data, refresh } = await useFetch<{
  created_at: string;
  icon_url: string;
  value: string;
}>("https://api.chucknorris.io/jokes/random", {
  key: "shared-jokes",
  getCachedData: (key, nuxtApp) => {
    console.log("getCachedData", key);
    // Return from cache if exists and prevent additional load
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

const onFetchNewJoke = async () => {
  clearNuxtData("shared-jokes");
  await refresh();
};
</script>

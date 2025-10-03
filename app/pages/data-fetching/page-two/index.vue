<template>
  <div>Page Two</div>
  <div v-if="status === 'pending'">Loading...</div>
  <div v-else>
    <pre>
    {{ data }}
  </pre
    >
    <ElDataFetchingFirstComponent />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "data-fetching",
});

const { status, data } = useFetch("https://api.chucknorris.io/jokes/random", {
  key: "shared-jokes",
  lazy: true,
  getCachedData: (key, nuxtApp) => {
    console.log("getCachedData", key);
    // Return from cache if exists and prevent additional load
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <div>Page One</div>
  <pre>
    {{ data }}
  </pre>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "data-fetching",
});

const { data } = await useFetch("https://api.chucknorris.io/jokes/random", {
  key: "shared-jokes",
  getCachedData: (key, nuxtApp) => {
    console.log("getCachedData", key);
    // Return from cache if exists and prevent additional load
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

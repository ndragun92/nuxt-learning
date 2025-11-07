<template>
  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "protected", // This will make sure that the user is authenticated before accessing this page
});

const { data } = await useAPI<{
  weather: any;
}>("/api/weather", {
  key: "weather", // We will use this key to store the data in nuxt payload so that we can access it anywhere with useNuxtData('todos')
});
</script>

<template>
  <section class="container mx-auto space-y-4">
    <h2 class="text-center font-bold">Prerender Rendering Mode</h2>
    <p class="mt-4">
      This page is rendered in prerender mode. It means that the page is
      pre-rendered at build time.
    </p>
    <NuxtLink class="text-pink-800 hover:underline" to="/rendering-modes"
      >Go Back</NuxtLink
    >
  </section>
</template>

<script lang="ts" setup>
defineRouteRules({
  prerender: true,
});

console.info("Prerender MODE");

onMounted(() => {
  console.info("onMounted: Prerender MODE");
});
</script>

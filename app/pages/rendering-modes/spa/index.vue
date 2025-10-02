<template>
  <section class="container mx-auto space-y-4">
    <h2 class="text-center font-bold">SPA Rendering Mode</h2>
    <p class="mt-4">
      This page is rendered in SPA mode. It means that the page is rendered
      entirely on the client side. You can verify this by disabling JavaScript
      in your browser and reloading the page. The page will be blank.
    </p>
    <p class="mt-4">
      You can change the rendering mode of a page by adding a
      <code>rendering</code> property to the page's metadata. For example, to
      set a page to SPA mode, you can add the following to the page's script
      setup:
    </p>
    <NuxtLink class="text-pink-800 hover:underline" to="/rendering-modes"
      >Go Back</NuxtLink
    >
  </section>
</template>

<script lang="ts" setup>
defineRouteRules({
  // It is available mode but atm there is open issue regarding types missmatch
  // https://github.com/nuxt/nuxt/issues/33288
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  ssr: false,
});

console.info("SPA MODE");

onMounted(() => {
  console.info("onMounted: SPA MODE");
});
</script>

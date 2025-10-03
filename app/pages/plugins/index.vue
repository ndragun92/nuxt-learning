<template>
  <section class="container mx-auto space-y-4">
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        Nuxt has a plugins system to use Vue plugins and more at the creation of
        your Vue application. <br />Nuxt automatically reads the files in the
        <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1">
          app/plugins/*</code
        >
        directory and loads them at the creation of the Vue application.
        <br />
        All plugins inside are auto-registered, you don't need to add them to
        your nuxt.config separately.
        <br />
        You can use
        <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1">.server</code>
        or
        <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1">.client</code>
        suffix in the file name to load a plugin only on the server or client
        side.
        <br />
        You can control the order in which plugins are registered by prefixing
        with 'alphabetical' numbering to the file names.
        <br />
        Example:
        <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1"
          >app/plugins/01.myPlugin.ts</code
        >
        &nbsp;
        <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1"
          >app/plugins/02.myOtherPlugin.ts</code
        >
      </template>
    </UiInfo>
    <UiDivider
      >Provide/Inject from
      <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1"
        >app/plugins/02.init.ts</code
      ></UiDivider
    >
    <UiCard class="flex items-center justify-between">
      <strong>nuxtApp?.$app_origin: </strong>{{ nuxtApp?.$app_origin }}
    </UiCard>
    <UiCard class="flex items-center justify-between">
      <strong>nuxtApp?.$app_hostname: </strong>{{ nuxtApp?.$app_hostname }}
    </UiCard>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Plugins",
  order: 50,
});

const nuxtApp = useNuxtApp();
</script>

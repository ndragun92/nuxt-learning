<template>
  <section class="container mx-auto space-y-4">
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        Nuxt provides built-in support for server-side API routes powered by
        Nitro. You can learn more about Nitro in the
        <a
          class="text-pink-800 hover:underline"
          target="_blank"
          href="https://nuxt.com/docs/4.x/guide/directory-structure/server"
          >documentation.</a
        >
      </template>
    </UiInfo>
    <UiDivider>Cached Response</UiDivider>
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        <strong>
          This is a cached response from the server. It is cached for 10
          seconds.
        </strong>
      </template>
    </UiInfo>
    <div>
      <pre>
        {{ cachedData }}
      </pre>
    </div>
    <UiDivider>Fresh Response</UiDivider>
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        <strong>
          This is a fresh response from the server. It is not cached.
        </strong>
      </template>
    </UiInfo>
    <div>
      <pre>
        {{ freshData }}
      </pre>
    </div>
    <UiButton @click="onRefreshPage">Refresh Page</UiButton>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Server API",
  order: 90,
});

const { data: cachedData } = await useFetch("/api/cached");
const { data: freshData } = await useFetch("/api/fresh");

const onRefreshPage = () => {
  window.location.reload();
};
</script>

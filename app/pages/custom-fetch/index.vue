<template>
  <section class="container mx-auto space-y-4">
    <ClientOnly>
      <ContentRenderer
        v-if="content"
        class="prose prose-neutral"
        :value="content"
      />
      <div v-else>Content not found</div>
    </ClientOnly>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Custom Fetch",
  order: 80,
});

const { data: content } = await useAsyncData(() =>
  queryCollection("content").path("/").first(),
);
</script>

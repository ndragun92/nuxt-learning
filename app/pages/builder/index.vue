<template>
  <ClientOnly>
    <div>
      <h1>Builder</h1>
      <div>
        <input v-model.trim="data.name" type="text" class="border p-3" />
      </div>
      <pre>
      {{ data }}
    </pre
      >
      <iframe
        src="/test"
        frameborder="0"
        class="w-full border"
        style="height: 100vh"
      />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "clean",
});

const { data } = useBuilder();
</script>

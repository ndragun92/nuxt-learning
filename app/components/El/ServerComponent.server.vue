<template>
  <div class="space-y-4">
    <div><strong>Current Date:</strong> {{ date }}</div>
    <UiCard class="flex items-center justify-between">
      <div><strong>Count: </strong>{{ count }}</div>
      <UiButton icon="mdi:add" @click="count++"> Increment </UiButton>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
const date = new Date();
const count = ref(0);

console.info("[ServerComponent.server.vue]", date);
onMounted(() => {
  console.log("[ServerComponent.server.vue](onMounted)", date);
});
</script>

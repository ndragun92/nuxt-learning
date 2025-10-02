<template>
  <div class="space-y-4">
    <div><strong>Current Date:</strong> {{ date }}</div>
    <!--    <div>-->
    <!--      <strong>Current Date:</strong>-->
    <!--      <NuxtTime-->
    <!--        :datetime="date"-->
    <!--        year="numeric"-->
    <!--        month="long"-->
    <!--        day="numeric"-->
    <!--        hour="2-digit"-->
    <!--        minute="2-digit"-->
    <!--        second="2-digit"-->
    <!--      />-->
    <!--    </div>-->
    <UiCard class="flex items-center justify-between">
      <div><strong>Count: </strong>{{ count }}</div>
      <UiButton icon="mdi:add" @click="count++"> Increment </UiButton>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
// This will cause hydration errors
const date = ref(new Date());
// useState is a Nuxt 3 SSR-friendly composable that will work on the server and client
// const date = useState("my-date", () => new Date());
const count = ref(0);

console.info("[ServerClientComponent.vue]", date.value);
onMounted(() => {
  console.log("[ServerClientComponent.vue](onMounted)", date.value);
});
</script>

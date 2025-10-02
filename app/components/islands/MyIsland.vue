<template>
  <div class="space-y-4">
    <div><strong>Current Date:</strong> {{ date }}</div>
    <UiCard class="flex items-center justify-between">
      <div><strong>Count: </strong>{{ count }}</div>
      <UiButton icon="mdi:add" @click="count++"> Increment </UiButton>
    </UiCard>
    <UiCard><strong>Name: </strong> {{ props.name }} </UiCard>
    <UiCard><strong>Custom Name: </strong> {{ myCustomName }} </UiCard>
    <hr />
    <pre class="whitespace-pre-wrap">
      {{ data }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  name?: string;
};

const props = defineProps<Props>();

const date = new Date();
const count = ref(0);

const myCustomName = computed(
  () => `My name is ${props.name || "Missing Prop"}`,
);

const { data } = useFetch("https://api.chucknorris.io/jokes/random");

console.info("[MyIsland.vue]", date);
onMounted(() => {
  console.log("[MyIsland.vue](onMounted)", date);
});
</script>

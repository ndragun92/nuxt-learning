<template>
  <div class="space-y-4">
    <div><strong>Current Date:</strong> {{ date }}</div>
    <UiCard class="flex items-center justify-between">
      <div><strong>Count: </strong>{{ count }}</div>
      <UiButton icon="mdi:add" @click="count++"> Increment </UiButton>
    </UiCard>
    <UiCard><strong>Name: </strong> {{ props.name }} </UiCard>
    <UiCard><strong>Custom Name: </strong> {{ myCustomName }} </UiCard>
    <UiDivider>Chuck Norris Joke</UiDivider>
    <div
      v-if="data"
      class="flex flex-1 flex-col p-8 bg-neutral-100 border border-neutral-200 rounded max-w-xs mx-auto text-center"
    >
      <img
        class="mx-auto size-12 shrink-0 bg-neutral-300 outline -outline-offset-1 outline-black/5"
        :src="data.icon_url"
        alt=""
      />
      <h3 class="mt-6 text-sm font-medium text-neutral-900">Chuck Norris</h3>
      <dl class="mt-1 flex grow flex-col justify-between">
        <dt class="sr-only">Jokes</dt>
        <dd class="mt-3">
          <span
            class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
            >Jokes
          </span>
        </dd>
        <dt class="sr-only">Jokes</dt>
        <dd class="mt-3">
          <p class="text-sm text-neutral-500">
            {{ data.value }}
          </p>
        </dd>
      </dl>
    </div>
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

const { data } = await useFetch<{
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}>("https://api.chucknorris.io/jokes/random");

console.info("[MyIsland.vue]", date);

// onMounted is not available in server components and therefore will not be executed
onMounted(() => {
  console.log("[MyIsland.vue](onMounted)", date);
});
</script>

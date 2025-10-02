<template>
  <button
    type="button"
    class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
  >
    <Icon
      v-if="props.icon"
      :name="props.icon"
      class="-ml-0.5 size-5"
      size="20"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>

<script lang="ts" setup>
type Props = {
  icon?: string;
};

const props = defineProps<Props>();
</script>

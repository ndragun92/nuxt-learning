<template>
  <div>
    <label
      v-if="props.label"
      :for="props.for"
      class="block text-sm/6 font-medium text-neutral-900"
    >
      {{ props.label }}
    </label>
    <div class="mt-2">
      <input
        :id="props.for"
        v-model="model"
        :type="props.type"
        :name="props.for"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-900 outline-1 -outline-offset-1 outline-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        :placeholder="props.placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  for?: string;
  label?: string;
  placeholder?: string;
  type?: string;
};

const props = withDefaults(defineProps<Props>(), {
  for: "",
  label: "",
  placeholder: "",
  type: "text",
});

const model = defineModel<string>();
</script>

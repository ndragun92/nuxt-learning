<template>
  <div>
    <UiDivider>Settings</UiDivider>
    <form class="space-y-4" @submit.prevent="onUpdateName">
      <UiInput
        v-model="name"
        placeholder="Enter your name"
        label="Name"
        :required="true"
      />
      <UiButton type="submit">Update name</UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
const name = ref(toRaw(useCookie("user").value || ""));

const onUpdateName = () => {
  useCookie("user").value = name.value;
};
</script>

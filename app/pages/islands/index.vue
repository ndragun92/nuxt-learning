<template>
  <section class="container mx-auto space-y-4">
    <div>
      <UiButton @click="showInfo = !showInfo"
        >{{ showInfo ? "Close" : "Reveal" }} Explanation</UiButton
      >
    </div>
    <UiInput
      v-model.trim="name"
      for="name"
      label="Name"
      type="text"
      placeholder="Enter your name"
    />
    <div class="flex gap-8">
      <div class="flex-1">
        <UiDivider>Without props</UiDivider>
        <NuxtIsland name="MyIsland" />
      </div>
      <div class="flex-1">
        <UiDivider>With props</UiDivider>
        <NuxtIsland name="MyIsland" :props="{ name }" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Islands",
  order: 20,
});

const showInfo = ref(false);

const name = ref("John Doe");
</script>

<template>
  <section class="container mx-auto space-y-4">
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        <strong>
          Do you how you can share data between pages/components?
        </strong>
        <ul>
          <li v-if="itemsToShow.includes(1)">1. Component Props</li>
          <li v-if="itemsToShow.includes(2)">2. Pinia</li>
          <li v-if="itemsToShow.includes(3)">3. Nuxt Data (useNuxtData())</li>
          <li v-if="itemsToShow.includes(4)">
            4. Composition API (composables)
          </li>
          <li v-if="itemsToShow.includes(5)">5. Provide/Inject</li>
        </ul>
      </template>
    </UiInfo>
    <UiDivider v-if="itemsToShow.includes(6)"> Live Demo </UiDivider>
    <UiButton
      v-if="!itemsToShow.includes(6)"
      @click="itemsToShow.push(itemsToShow.length + 1)"
    >
      Reveal
    </UiButton>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Data Sharing",
  order: 70,
});

const itemsToShow = ref<number[]>([]);
</script>

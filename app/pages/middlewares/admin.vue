<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "protected",
});
</script>

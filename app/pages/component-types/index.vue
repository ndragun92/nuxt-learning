<template>
  <h1>Component Types</h1>
  <hr />
  <ElServerComponent />
  <hr />
  <ElClientComponent />
  <hr />
  <ElServerClientComponent />
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Component Types",
  order: 10,
});
</script>

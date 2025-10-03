<template>
  <div>Child From Child First Component</div>
  <pre>
    {{ joke }}
  </pre>
</template>

<script lang="ts" setup>
const joke = useNuxtData("shared-jokes");
</script>

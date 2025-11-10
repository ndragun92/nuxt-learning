<template>
  <div>Test</div>
  <pre>
    {{ localData }}
  </pre>
</template>

<script lang="ts" setup>
const { localData } = useBuilder();
</script>

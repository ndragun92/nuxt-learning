<template>
  <div>
    Server/Client component - {{ date }}
    <hr>
    Count: {{ count }}
    <button @click="count++">Increment</button>
  </div>
</template>

<script lang="ts" setup>

const date = new Date();
const count = ref(0);

console.log("server/client date", date);
onMounted(() => {
  console.log('mounted server/client date', date)
})
</script>

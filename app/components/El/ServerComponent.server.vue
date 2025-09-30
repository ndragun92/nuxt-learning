<template>
  <div>
    Server component - {{ date }}
    <hr>
    Count: {{ count }}
    <button @click="count++">Increment</button>
  </div>
</template>

<script lang="ts" setup>

const date = new Date();
const count = ref(0);

console.log("server date", date);
onMounted(() => {
  console.log('mounted server date', date)
})
</script>

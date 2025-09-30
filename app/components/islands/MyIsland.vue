<template>
  <div>
    This is an island component - {{ date }}
    <hr>
    Name: {{ props.name }}
    <hr>
    Count: {{ count }}
    <button @click="count++">Increment</button>
  </div>
</template>

<script lang="ts" setup>

type Props = {
  name?: string;
}

const props = defineProps<Props>();

const date = new Date();
const count = ref(0);

console.log("island date", date);
onMounted(() => {
  console.log('mounted island date', date)
})
</script>

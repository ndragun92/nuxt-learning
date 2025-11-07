<template>
  <ElContainer>
    <ElTodoList />
  </ElContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "protected", // This will make sure that the user is authenticated before accessing this page
});

await useAPI<{
  todos: TTodo[] | [];
}>("/api/todos", {
  key: "todos", // We will use this key to store the data in nuxt payload so that we can access it anywhere with useNuxtData('todos')
  deep: true, // We have to make sure that the data is deep reactive so that we can do optimistic updated
});
</script>

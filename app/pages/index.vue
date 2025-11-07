<template>
  <div class="container max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <ElTodoList />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "protected",
});

await useAPI<{
  todos: TTodo[] | [];
}>("/api/todos", {
  key: "todos",
  deep: true, // We have to make sure that the data is deep reactive so that we can do optimistic updated
});
</script>

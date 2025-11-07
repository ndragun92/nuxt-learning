<template>
  <div class="py-5">
    <div
      class="-mt-4 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
    >
      <div class="mt-4 ml-4">
        <h3 class="text-base font-semibold text-gray-900">My Todos</h3>
        <p class="mt-1 text-sm text-gray-500">
          A list of all your tasks in progress and completed tasks.
        </p>
        <p class="mt-1 text-sm text-gray-400">
          Completed: {{ returnCompletedTasksCount }} of {{ todos.length }} tasks
        </p>
      </div>
      <div class="mt-4 ml-4 shrink-0">
        <ElDrawer button-text="Add new task">
          <template #action="slotProps">
            <button
              type="button"
              class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="slotProps.toggle()"
            >
              Add new task
            </button>
          </template>
        </ElDrawer>
      </div>
    </div>
  </div>
  <div class="overflow-hidden bg-gray-200 w-full">
    <div
      class="h-1 transition-width duration-300 ease-in-out"
      :style="{
        width: `${returnPercentageCount}%`,
      }"
      :class="{
        'bg-green-500': returnPercentageCount >= 100,
        'bg-yellow-500':
          returnPercentageCount < 100 && returnPercentageCount > 33,
        'bg-red-500': returnPercentageCount <= 33,
      }"
    ></div>
  </div>
  <ul role="list" class="divide-y divide-gray-100">
    <ElTodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<script setup lang="ts">
const todos = useNuxtData("todos")?.data?.value?.todos || [];

const returnCompletedTasksCount = computed(
  () => todos.filter((_task: TTodo) => _task.completed).length,
);

const returnPercentageCount = computed(() => {
  return (returnCompletedTasksCount.value / todos.length) * 100;
});

watch(returnPercentageCount, (_percentage) => {
  if (_percentage >= 100) {
    // TODO: Add confetti animation
  }
});
</script>

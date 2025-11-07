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
          Completed {{ returnCompletedTasksCount }} of {{ todos.length }}
          {{ pluralize("task", todos.length) }}
        </p>
      </div>
      <div class="mt-4 ml-4 shrink-0">
        <ElTodoManage />
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
  <LazyElModal v-model:open="showConfetti">
    <template #icon>
      <Icon
        name="noto:confetti-ball"
        class="size-12"
        size="48"
        aria-hidden="true"
      />
    </template>
    <template #title>Congratulations</template>
    <template #body>
      <p class="text-sm text-gray-500">
        You have successfully completed all your tasks!
      </p>
    </template>
  </LazyElModal>
</template>

<script setup lang="ts">
import { pluralize } from "~/utils/helper.utils";

const todos = computed(() => useNuxtData("todos")?.data?.value?.todos || []);

const returnCompletedTasksCount = computed(
  () => todos.value.filter((_task: TTodo) => _task.completed).length,
);

const returnPercentageCount = computed(() => {
  return (returnCompletedTasksCount.value / todos.value.length) * 100;
});

const showConfetti = ref(false);
watch(returnPercentageCount, (_percentage) => {
  if (_percentage >= 100) {
    showConfetti.value = true;
    // TODO: Add confetti animation
  }
});
</script>

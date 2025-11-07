<template>
  <li class="flex items-center justify-between gap-x-6 py-5 px-4 group">
    <div class="min-w-0">
      <div class="flex items-start gap-x-3">
        <p
          class="text-sm/6 font-semibold text-gray-900"
          :class="{
            'line-through': props.todo.completed,
          }"
        >
          {{ props.todo.title }}
        </p>
        <p
          v-if="props.todo.priority"
          class="text-red-700 inset-ring-red-600/20 bg-red-50 mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium inset-ring"
        >
          High priority
        </p>
        <p
          class="mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium inset-ring"
          :class="{
            'text-green-700 inset-ring-green-600/20 bg-green-50':
              props.todo.completed,
            'text-yellow-700 inset-ring-yellow-600/20 bg-yellow-50':
              !props.todo.completed,
          }"
        >
          {{ props.todo.completed ? "Completed" : "In progress" }}
        </p>
      </div>
      <div class="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
        <p class="whitespace-nowrap">
          Due on
          <NuxtTime
            :datetime="props.todo.dueDate"
            year="numeric"
            month="long"
            day="numeric"
          />
        </p>
      </div>
    </div>
    <div class="flex flex-none items-center gap-x-2">
      <button
        type="button"
        class="rounded-md text-white px-2.5 py-1.5 text-sm font-semibold shadow-xs inset-ring sm:block"
        :class="{
          'inset-ring-green-600 bg-green-500 hover:bg-green-700':
            !props.todo.completed,
          'inset-ring-yellow-100 bg-transparent text-yellow-500 hover:bg-yellow-50':
            props.todo.completed,
        }"
        @click="onToggleCompletedState(props.todo.id, props.todo)"
      >
        Mark as {{ props.todo.completed ? "in progress" : "completed" }}
      </button>
      <button
        type="button"
        class="hidden group-hover:flex inset-ring-red-600 bg-red-500 hover:bg-red-700 rounded-md text-white size-8 text-sm font-semibold shadow-xs inset-ring items-center justify-center gap-x-1"
        @click="onDeleteTodo(props.todo.id)"
      >
        <Icon name="mdi:delete" size="16" class="size-4" />
      </button>
      <button
        type="button"
        class="inset-ring-blue-600 bg-blue-500 hover:bg-blue-700 rounded-md text-white size-8 text-sm font-semibold shadow-xs inset-ring flex items-center justify-center gap-x-1"
        @click="onEditTodo(props.todo.id)"
      >
        <Icon name="mdi:edit" size="16" class="size-4" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { TTodo } from "~/composables/useTodo";

type Props = {
  todo: TTodo;
};

const props = defineProps<Props>();

const { onToggleCompletedState, onDeleteTodo } = useTodo();

const emit = defineEmits(["emitEditTodo"]);

const onEditTodo = (_id: TTodo["id"]) => {
  emit("emitEditTodo", _id);
};
</script>

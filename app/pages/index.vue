<template>
  <div class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200 py-5">
      <div
        class="-mt-4 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
      >
        <div class="mt-4 ml-4">
          <h3 class="text-base font-semibold text-gray-900">My Todos</h3>
          <p class="mt-1 text-sm text-gray-500">
            A list of all your tasks in progress and completed tasks.
          </p>
        </div>
        <div class="mt-4 ml-4 shrink-0">
          <button
            type="button"
            class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add new task
          </button>
        </div>
      </div>
    </div>
    <ul role="list" class="divide-y divide-gray-100">
      <li
        v-for="n in 10"
        :key="n"
        class="flex items-center justify-between gap-x-6 py-5"
      >
        <div class="min-w-0">
          <div class="flex items-start gap-x-3">
            <p class="text-sm/6 font-semibold text-gray-900">
              My example task {{ n }}.
            </p>
            <p
              class="mt-0.5 rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
            >
              Complete
            </p>
          </div>
          <div class="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
            <p class="whitespace-nowrap">
              Due on <time datetime="2023-03-17T00:00Z">March 17, 2023</time>
            </p>
            <svg viewBox="0 0 2 2" class="size-0.5 fill-current">
              <circle r="1" cx="1" cy="1" />
            </svg>
            <p class="truncate">Created by Nemanja Dragun</p>
          </div>
        </div>
        <div class="flex flex-none items-center gap-x-4">
          <a
            href="#"
            class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:block"
            >Mark as completed</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
definePageMeta({
  middleware: "protected",
});
</script>

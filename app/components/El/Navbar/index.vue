<template>
  <header class="bg-white">
    <nav
      aria-label="Global"
      class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
            class="h-8 w-auto"
          />
        </a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm/6 font-semibold text-gray-900">Stats</a>
        <a href="#" class="text-sm/6 font-semibold text-gray-900">Profile</a>
      </div>
      <div class="flex flex-1 items-center justify-end gap-x-6">
        <button
          type="button"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="onLogout"
        >
          Sign out
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { onLogout } = useAuth();
</script>

<template>
  <div>
    <nav
      class="space-x-4 bg-neutral-100 shadow-md px-4 h-16 flex items-center justify-between mb-12"
    >
      <ul class="flex items-center gap-x-4">
        <li>
          <NuxtLink
            class="text-pink-800 hover:underline"
            to="/data-fetching/page-one"
            active-class="underline"
            >Page one</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="text-pink-800 hover:underline"
            active-class="underline"
            to="/data-fetching/page-two"
            >Page two</NuxtLink
          >
        </li>
      </ul>
      <NuxtLink
        class="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded border border-neutral-700"
        to="/data-fetching"
        >Go back</NuxtLink
      >
    </nav>
    <slot />
  </div>
</template>
<script setup lang="ts"></script>

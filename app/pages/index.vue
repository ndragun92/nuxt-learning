<template>
  <section class="flex flex-col items-center mt-8">
    <h1 class="text-4xl font-bold text-pink-800 mb-4">
      Nuxt 3 Workshop Examples
    </h1>
    <p class="text-lg text-neutral-700 max-w-xl text-center mb-6">
      Welcome to the Nuxt 3 workshop! This project provides hands-on examples
      and patterns using Nuxt and Vue, helping you learn and experiment with
      modern web development. Discover features like routing, state management,
      API integration, and UI components—all styled with Tailwind CSS.
    </p>
    <section
      class="w-full max-w-2xl bg-neutral-50 rounded shadow shadow-neutral-100 p-6 mb-6 border-2 border-pink-800"
    >
      <h2 class="text-2xl font-semibold text-pink-800 mb-2">
        What You Will Learn
      </h2>
      <ul class="list-disc list-inside text-neutral-700 space-y-1">
        <li>Nuxt 3 fundamentals and project structure</li>
        <li>Vue 3 composition API and reactivity</li>
        <li>Routing and navigation patterns</li>
        <li>State management with composables</li>
        <li>API calls and data fetching</li>
        <li>Reusable UI components with Tailwind CSS</li>
      </ul>
    </section>
    <section
      class="w-full max-w-2xl bg-neutral-50 rounded shadow shadow-neutral-100 p-6 border-2 border-pink-800"
    >
      <h2 class="text-2xl font-semibold text-pink-800 mb-2">
        How to Use This Project
      </h2>
      <p class="text-neutral-700">
        Browse through the examples to see practical implementations. Each
        section is designed to be self-contained, making it easy to follow and
        adapt for your own projects. Feel free to experiment and modify the code
        to deepen your understanding.
      </p>
    </section>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Homepage",
  order: 0,
});
</script>

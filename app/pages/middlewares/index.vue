<template>
  <section class="container mx-auto space-y-4">
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        Middlewares are a powerful feature of Nuxt 3 that allow you to execute
        code before and after each request. They are useful for logging,
        authentication, and other tasks that need to run before or after each
        request. <br />In nuxt we can have global middlewares and page
        middlewares. <br />Global middlewares are executed before each request
        and page middlewares. <br />They are executed before the page component
        is rendered. In order to create global middleware we just have to create
        a file with extension
        <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1"
          >*.global.ts</code
        >
        inside
        <code class="bg-red-200 text-red-600 text-xs py-0.5 px-1"
          >/middleware</code
        >
        folder. <br /><br />
        To create page middleware we have to create a file without extension and
        then in order to use it we have to define it in the page meta using
        <pre>
          <code class="text-pink-800">
            definePageMeta({
              layout: "admin",
              middleware: "protected",
            });
          </code>
        </pre>
      </template>
    </UiInfo>
    <UiDivider>Live Example</UiDivider>
    <div class="space-x-4">
      <NuxtLink class="text-pink-800 hover:underline" to="/middlewares/login">
        Admin (Protected)
      </NuxtLink>
      <NuxtLink class="text-pink-800 hover:underline" to="/middlewares/login">
        Login (Not Protected)
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Middlewares",
  order: 40,
});
</script>

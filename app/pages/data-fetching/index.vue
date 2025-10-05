<template>
  <section class="container mx-auto space-y-4">
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        Data Fetching is a powerful feature of Nuxt 3 that allows you to fetch
        data from an API or other source and use it in your components. <br />
        Nuxt 3 provides several ways to fetch data, including:
        <ul class="list-disc list-inside">
          <li>
            <strong>useFetch:</strong> A composable that allows you to fetch
            data from an API or other source. It returns a reactive object that
            contains the data, error, and loading state. Wrapper around
            useAsyncData specialized for fetching HTTP data (via $fetch under
            the hood).
          </li>
          <li>
            <strong>useAsyncData:</strong> A composable that allows you to fetch
            data asynchronously. It returns a promise that resolves to the data.
            Similar to useFetch but offers more fine-grained control. Lets you
            wrap any async function (not just fetch).
          </li>
          <li>
            <strong>$fetch:</strong> A method that allows you to fetch data
          </li>
        </ul>
        <UiDivider>When to use which?</UiDivider>
        <p>
          Use <strong>useFetch</strong> if:
          <br />
          You are fetching API/HTTP data (REST endpoints, backend routes).
          <br />
          You want shorter syntax and auto-integration with Nuxt’s $fetch.
          <br /><br />
          Use <strong>useAsyncData</strong> if:
          <br />
          You need to run custom async logic (not just API calls).
          <br />
          You want to control how data is fetched (GraphQL clients, database
          queries, complex async workflows).
          <br />
          You want to reuse the same async key but with different non-HTTP
          logic.
        </p>
        In addition to these built-in methods, Nuxt 3 also supports using
        third-party libraries like Axios or Fetch API for data fetching. You can
        use these libraries in combination with the built-in methods to create
        powerful and flexible data fetching solutions for your applications.
      </template>
    </UiInfo>
    <UiDivider>
      <NuxtLink
        class="text-pink-800 hover:underline"
        to="/data-fetching/page-one"
        >Click here to navigate to example one</NuxtLink
      >
    </UiDivider>
    <UiDivider>
      <NuxtLink
        class="text-pink-800 hover:underline"
        to="/data-fetching/pagination"
        >Click here to navigate to pagination example</NuxtLink
      >
    </UiDivider>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Data Fetching",
  order: 60,
});
</script>

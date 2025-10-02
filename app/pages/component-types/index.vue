<template>
  <section class="container mx-auto space-y-4">
    <div>
      <UiButton @click="showInfo = !showInfo"
        >{{ showInfo ? "Close" : "Reveal" }} Explanation</UiButton
      >
    </div>
    <UiDivider>Server Component</UiDivider>
    <UiInfo v-if="showInfo">
      <template #title>Info</template>
      <template #description>
        This component is rendered on the server. It can use server-only APIs
        like database access, file system access, etc. It cannot use client-side
        APIs like browser APIs, DOM APIs, etc. Therefor JavaScript code inside
        this component will not be executed on the client.
      </template>
    </UiInfo>
    <ElServerComponent />
    <UiDivider>Client Component</UiDivider>
    <UiInfo v-if="showInfo">
      <template #title>Info</template>
      <template #description>
        This component is rendered on the client. It can use client-side APIs
        like browser APIs, DOM APIs, etc. Therefor JavaScript code inside this
        component will be executed on the client.</template
      >
    </UiInfo>
    <ElClientComponent />
    <UiDivider>Server/Client Component</UiDivider>
    <UiInfo v-if="showInfo">
      <template #title>Info</template>
      <template #description>
        This component is rendered on the server, but it can contain client-side
        interactivity. It can use server-only APIs like database access, file
        system access, etc. It cannot use client-side APIs like browser APIs,
        DOM APIs, etc. Therefor JavaScript code inside this component will not
        be executed on the client. However, it can include client components
        that will be hydrated on the client.
      </template>
    </UiInfo>
    <ElServerClientComponent />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Component Types",
  order: 10,
});

const showInfo = ref(false);
</script>

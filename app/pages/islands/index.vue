<template>
  <section class="container mx-auto space-y-4">
    <div>
      <UiButton @click="showInfo = !showInfo"
        >{{ showInfo ? "Close" : "Reveal" }} Explanation</UiButton
      >
    </div>
    <UiInput
      v-model.trim="name"
      for="name"
      label="Name"
      type="text"
      placeholder="Enter your name"
    />
    <div class="flex gap-8">
      <div class="flex-1 space-y-4">
        <UiDivider>Without props</UiDivider>
        <UiInfo v-if="showInfo">
          <template #title>Info</template>
          <template #description>
            This island does not receive any props. It will use default values
            for its props.
          </template>
        </UiInfo>
        <NuxtIsland name="MyIsland" />
      </div>
      <div class="flex-1 space-y-4">
        <UiDivider>With props</UiDivider>
        <UiInfo v-if="showInfo">
          <template #title>Info</template>
          <template #description>
            This island receives a prop called <code>name</code> with the value
            of the input field above. Every time the input field changes, the
            island will re-render with the new value completelly on server.
          </template>
        </UiInfo>
        <NuxtIsland name="MyIsland" :props="{ name }" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Islands",
  order: 20,
});

const showInfo = ref(false);

const name = ref("John Doe");
</script>

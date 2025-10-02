<template>
  <section class="container mx-auto space-y-4">
    <UiDivider>Login Form</UiDivider>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <UiInput
        v-model="name"
        type="text"
        placeholder="Enter your name"
        required
      />
      <UiButton type="submit">Login</UiButton>
    </form>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: () => {
    if (useCookie("user").value) {
      return navigateTo("/middlewares/admin");
    }
  },
});

const name = ref("");

const router = useRouter();

const onSubmit = async () => {
  useCookie("user", {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  }).value = name.value;
  await router.push("/middlewares/admin");
};
</script>

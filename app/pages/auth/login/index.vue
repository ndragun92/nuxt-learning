<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model.trim="form.email" type="email" placeholder="Email" />
      <input
        v-model.trim="form.password"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { TUser } from "~/composables/useUser";

definePageMeta({
  middleware: () => {
    if (useCookie("token").value) {
      return navigateTo("/");
    }
  },
});

const { setUser } = useUser();
const { handleError } = useErrorHandler();
const router = useRouter();

const form = ref({
  email: "john@doe.com",
  password: "12345678",
});

const onSubmit = async () => {
  const [error, data] = await catchError(
    $fetch<{ token: string; user: TUser }>("/api/auth/login", {
      method: "POST",
      body: toRaw(form.value),
    }),
  );

  if (error) {
    handleError(error._message);
    return;
  }

  const { token, user } = data;
  useCookie("token", {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  }).value = token;
  setUser(user);
  await router.push("/");
};
</script>

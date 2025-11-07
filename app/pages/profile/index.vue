<template>
  <ElContainer>
    <form @submit.prevent="onSubmit">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p class="mt-1 text-sm/6 text-gray-600">
            Update your first and last name.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block text-sm/6 font-medium text-gray-900"
                >First name</label
              >
              <div class="mt-2">
                <input
                  id="first-name"
                  v-model.trim="form.firstName"
                  type="text"
                  name="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block text-sm/6 font-medium text-gray-900"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  id="last-name"
                  v-model.trim="form.lastName"
                  type="text"
                  name="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  :value="user?.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full rounded-md bg-gray-200 cursor-not-allowed px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </ElContainer>
</template>

<script setup lang="ts">
import type { TUser } from "~/composables/useUser";
import { useToastStore } from "~/store/toastStore";

definePageMeta({
  middleware: "protected", // This will make sure that the user is authenticated before accessing this page
});

const { user } = useUser();

const form = ref({
  firstName: user.value?.firstName || "",
  lastName: user.value?.lastName || "",
});

const { setUser } = useUser();
const { handleError } = useErrorHandler();
const toastStore = useToastStore();
const { $api } = useNuxtApp();

const onSubmit = async () => {
  if (!user.value) return;
  const payload = toRaw(form.value);
  const [error] = await catchError(
    $api<{ token: string; user: TUser }>(`/api/users/${user.value.id}`, {
      method: "PATCH",
      body: payload,
    }),
  );

  if (error) {
    handleError(error._message);
    return;
  }

  setUser({
    ...toRaw(user.value),
    ...payload,
  });
  toastStore.success({
    text: "Successfully updated profile.",
  });
};
</script>

<template>
  <ElDrawer
    :open-state="props.editItemId ? !!props.editItemId : undefined"
    :button-text="returnEditItemId ? 'Edit task' : 'Add new task'"
    @emit-close="onEmitClose"
  >
    <template #action="slotProps">
      <button
        type="button"
        class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="slotProps.toggle()"
      >
        {{ returnEditItemId ? "Edit task" : "Add new task" }}
      </button>
    </template>
    <template #body="slotProps">
      <form
        class="relative flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
        @submit.prevent="onSubmit(slotProps.close)"
      >
        <div class="h-0 flex-1 overflow-y-auto">
          <div class="bg-indigo-700 px-4 py-6 sm:px-6">
            <div class="flex items-center justify-between">
              <DialogTitle class="text-base font-semibold text-white">{{
                returnEditItemId ? "Edit task" : "New task"
              }}</DialogTitle>
              <div class="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  class="relative rounded-md text-indigo-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  @click="slotProps.close()"
                >
                  <span class="absolute -inset-2.5"></span>
                  <span class="sr-only">Close panel</span>
                  <Icon
                    name="mdi:close"
                    size="24"
                    class="size-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div class="mt-1">
              <p class="text-sm text-indigo-300">
                {{
                  returnEditItemId
                    ? "Make changes to your task details below."
                    : "Fill out the details for your new task below."
                }}
              </p>
            </div>
          </div>
          <div class="flex flex-1 flex-col justify-between">
            <div class="divide-y divide-gray-200 px-4 sm:px-6">
              <div class="space-y-6 pt-6 pb-5">
                <div>
                  <div class="flex items-center justify-between gap-3">
                    <div
                      class="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2"
                    >
                      <span
                        class="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5"
                      />
                      <input
                        id="priority"
                        v-model="form.priority"
                        type="checkbox"
                        class="absolute inset-0 appearance-none focus:outline-hidden"
                        name="priority"
                        aria-labelledby="priority-label"
                        aria-describedby="priority-description"
                      />
                    </div>

                    <div class="text-sm">
                      <label
                        id="priority-label"
                        class="font-medium text-gray-900"
                        >Mark as</label
                      >
                      {{ " " }}
                      <span
                        id="annual-billing-description"
                        class="text-gray-500"
                        >(High priority)</span
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    for="title"
                    class="block text-sm/6 font-medium text-gray-900"
                    >Title</label
                  >
                  <div class="mt-2">
                    <input
                      id="title"
                      v-model.trim="form.title"
                      type="text"
                      name="title"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="description"
                    class="block text-sm/6 font-medium text-gray-900"
                    >Description</label
                  >
                  <div class="mt-2">
                    <textarea
                      id="description"
                      v-model="form.description"
                      rows="3"
                      name="description"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="dueDate"
                    class="block text-sm/6 font-medium text-gray-900"
                    >Due Date</label
                  >
                  <div class="mt-2">
                    <input
                      id="dueDate"
                      v-model.trim="form.dueDate"
                      type="date"
                      name="dueDate"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex shrink-0 justify-end px-4 py-4">
          <button
            type="button"
            class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50"
            @click="slotProps.close()"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ returnEditItemId ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </ElDrawer>
</template>

<script setup lang="ts">
import { DialogTitle } from "@headlessui/vue";

type Props = {
  editItemId?: TTodo["id"] | null;
};

const props = defineProps<Props>();
const emit = defineEmits(["emitClose"]);

const returnEditItemId = computed(() => props.editItemId);

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]?.toString() || "";
};

const defaultData = {
  title: "",
  description: "",
  dueDate: getTodayDate(),
  priority: false,
};

const form = ref(structuredClone(defaultData));

watch(returnEditItemId, async (_editItemId) => {
  if (_editItemId) {
    await onEditItem(_editItemId);
  }
});

const { onAddTodo, onEditTodo, onGetTodo } = useTodo();

const onEditItem = async (_id: TTodo["id"]) => {
  const todo = await onGetTodo(_id);
  form.value = {
    title: todo?.title || "",
    description: todo?.description || "",
    dueDate: todo?.dueDate || getTodayDate(),
    priority: !!todo?.priority,
  };
};

const onSubmit = async (_close: () => void) => {
  if (returnEditItemId.value) {
    await onEditTodo(returnEditItemId.value, toRaw(form.value));
  } else {
    await onAddTodo(toRaw(form.value));
  }
  form.value = structuredClone(defaultData);
  _close();
};

const onEmitClose = () => {
  emit("emitClose");
  form.value = structuredClone(defaultData);
};
</script>

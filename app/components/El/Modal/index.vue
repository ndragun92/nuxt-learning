<template>
  <div>
    <slot name="action" :open="open" :toggle="() => (open = !open)" />
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to=""
          leave="ease-in duration-200"
          leave-from=""
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to=" translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from=" translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
              >
                <div>
                  <div
                    v-if="$slots.icon"
                    class="mx-auto flex size-20 items-center justify-center rounded-full bg-gray-50 border border-gray-100"
                  >
                    <slot name="icon" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold text-gray-900"
                    >
                      <slot name="title"></slot>
                    </DialogTitle>
                    <div class="mt-2">
                      <slot name="body" />
                    </div>
                  </div>
                </div>
                <div v-if="$slots.actions" class="mt-5 sm:mt-6">
                  <slot name="actions" />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

type Model = boolean;

const open = defineModel<Model>("open", {
  default: false,
});
</script>

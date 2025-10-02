<template>
  <div class="rounded-md bg-blue-50 p-4">
    <div class="flex">
      <div class="shrink-0">
        <Icon name="mdi:info" class="size-5 text-blue-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-blue-800"><slot name="title" /></h3>
        <div class="mt-2 text-sm text-blue-700">
          <div>
            <slot name="description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

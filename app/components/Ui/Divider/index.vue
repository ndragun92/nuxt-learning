<template>
  <div class="flex items-center">
    <div class="w-full border-t border-neutral-300" aria-hidden="true" />
    <div class="relative flex justify-center">
      <span
        class="bg-white px-3 text-base font-semibold text-neutral-900 whitespace-nowrap"
      >
        <slot />
      </span>
    </div>
    <div class="w-full border-t border-neutral-300" aria-hidden="true" />
  </div>
</template>

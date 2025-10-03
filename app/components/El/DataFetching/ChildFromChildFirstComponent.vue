<template>
  <div class="border p-4 rounded space-y-4 container mx-auto">
    <h3 class="font-semibold">Child From Child First Component</h3>
    <div v-if="data" class="bg-white px-6 py-12">
      <figure>
        <blockquote
          class="text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9"
        >
          <p>“{{ data.value }}”</p>
        </blockquote>
        <figcaption class="mt-10 flex items-center gap-x-6">
          <img class="size-12 bg-gray-50" :src="data.icon_url" alt="" />
          <div class="text-sm/6">
            <div class="font-semibold text-gray-900">Chuck Norris</div>
            <div class="mt-0.5 text-gray-600">
              <NuxtTime
                :datetime="data.created_at"
                year="numeric"
                month="long"
                day="numeric"
                hour="2-digit"
                minute="2-digit"
                second="2-digit"
              />
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data } = useNuxtData<{
  created_at: string;
  icon_url: string;
  value: string;
}>("shared-jokes");
</script>

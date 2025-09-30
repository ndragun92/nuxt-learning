<template>
  <h1>Islands</h1>
  <hr>
  <h2>Without props</h2>
  <NuxtIsland name="MyIsland"/>
  <hr>
  <h2>With props</h2>
  <NuxtIsland name="MyIsland" :props="{ name }"/>
  <hr>
  <input v-model.trim="name" type="text">
</template>

<script lang="ts" setup>
const name = ref('My name')
</script>

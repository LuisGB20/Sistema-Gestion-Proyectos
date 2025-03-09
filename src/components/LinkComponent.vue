<template>
    <router-link
      :to="to"
      class="flex text-lg py-2 px-4 rounded-lg bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white hover:scale-105 duration-150 ease-in"
    >
      {{ texto }}
    </router-link>
  </template>
  
  <script setup lang="ts">
  
const props = defineProps<{
  to: string,
  texto: string
}>();

const { to, texto } = props
  </script>
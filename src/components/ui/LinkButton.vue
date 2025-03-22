<template>
  <router-link :to="to"
    class="flex justify-center items-center text-sm sm:text-lg px-3 sm:px-5 py-2 font-semibold rounded-lg border-2 border-DarkTeal bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white 
      transition-all duration-300 ease-in-out
      hover:bg-transparent hover:text-transparent hover:border-DarkTeal hover:bg-clip-text hover:from-DarkTeal hover:to-CharcoalBlue">
    {{ texto }}
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string,
  texto: string
}>();
</script>

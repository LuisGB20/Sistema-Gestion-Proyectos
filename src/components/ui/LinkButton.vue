<template>
  <router-link :to="to"
    class="flex text-lg py-2 font-semibold px-4 rounded-lg border-2 border-DarkTeal bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white transition duration-150 ease-in
      hover:bg-transparent hover:border-DarkTeal hover:text-transparent hover:bg-clip-text hover:from-DarkTeal hover:to-CharcoalBlue">
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

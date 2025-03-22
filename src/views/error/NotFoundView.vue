<script setup lang="ts">
import LinkButton from '@/components/ui/LinkButton.vue';
</script>

<template>
  <main>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#124E66] to-[#2E3944]">404
      </h1>
      <p class="text-2xl text-CharcoalBlue my-4">Página no encontrada</p>
      <LinkButton to="/" text="Volver al inicio" />
    </div>
  </main>
</template>
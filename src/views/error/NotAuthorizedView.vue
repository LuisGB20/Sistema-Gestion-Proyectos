<script setup lang="ts">
import LinkButton from '@/components/ui/LinkButton.vue';
</script>

<template>
    <main>
      <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#124E66] to-[#2E3944]">403</h1>
        <p class="text-2xl text-CharcoalBlue mt-4">Acceso no autorizado</p>
        <LinkButton to="/" text="Volver al inicio" />
      </div>
    </main>
  </template>
  
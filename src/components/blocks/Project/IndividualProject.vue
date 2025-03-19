<script setup lang="ts">
import type { Project } from '@/Interfaces/Project.ts'
import { useRouter } from 'vue-router'

defineProps<{ project: Project }>();
const router = useRouter();

</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <h2 class="text-3xl font-semibold text-CharcoalBlue">{{ project.name }}</h2>
      <i class="pi pi-pen-to-square text-CharcoalBlue"></i>
    </div>
    <router-link :to="{ name: 'proyectos-detalle', params: { id: project.id } }">
    <button class="px-4 py-3 bg-green-200 text-slate-900 text-sm rounded-2xl">
      See more...
    </button>
  </router-link>

  </div>

  <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>

  <p class="mt-2 text-sm text-CharcoalBlue">
    {{project.description}}
  </p>

  <div class="mt-8 text-xs text-red-500 flex items-center space-x-2">
    <i class="pi pi-hourglass" style="color: red"></i>
    <span>{{ project.date }}</span>
  </div>

  <div class="flex items-start space-x-2 mt-4 ml-60">
    <i class="pi pi-envelope text-CharcoalBlue"></i>
    <span class="text-xs text-CharcoalBlue">{{ project.messages }} mensajes</span>
  </div>
</template>

<style scoped>

</style>

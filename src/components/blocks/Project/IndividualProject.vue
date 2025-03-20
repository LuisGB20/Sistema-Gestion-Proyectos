<script setup lang="ts">
import type { Project } from '@/interfaces/Project.ts'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/formatDate.ts'
import Tag from 'primevue/tag'

defineProps<{ project: Project }>();

</script>

<template>


    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <h2 class="text-3xl font-semibold text-CharcoalBlue">{{ project.name }}</h2>
        <i class="pi pi-pen-to-square text-CharcoalBlue"></i>
      </div>
      <!--          <router-link :to="{ name: 'proyectos-detalle', params: { id: project.id } }">-->
      <!--            <button class="px-4 py-3 bg-green-200 text-slate-900 text-sm rounded-2xl">-->
      <!--              See more...-->
      <!--            </button>-->
      <!--          </router-link>-->
      <div class="px-4 py-3 bg-red-200 text-red-900 text-sm rounded-2xl">
        <Tag severity="danger" value="Danger"></Tag>
      </div>

    </div>
    <div class="mt-3 border-t-2 border-CharcoalBlue mb-6"></div>
    <p class="mt-2 text-sm text-CharcoalBlue">{{project.description}}</p>
    <div class="mt-8 text-xs text-red-500 flex items-center space-x-2">
      <i class="pi pi-hourglass" style="color: red"></i>
      <span>{{ formatDate(project.startDate) }}</span>
    </div>



</template>

<style scoped>

</style>

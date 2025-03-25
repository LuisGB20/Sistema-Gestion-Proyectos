<script setup lang="ts">
import IndividualProject from '@/components/blocks/project/IndividualProject.vue'
import type { BestProjectModel } from '@/interfaces/Projects/ProjectModel'

defineProps<{ projects: BestProjectModel[] }>();
</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-4 w-full">
    <div v-for="project in projects" :key="project.id" class="bg-gray-50 rounded-lg p-4 shadow-md">
      <IndividualProject :project="project" />
    </div>
  </div>
</template>


<style scoped></style>

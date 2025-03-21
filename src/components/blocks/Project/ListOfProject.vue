<script setup lang="ts">
import IndividualProject from '@/components/blocks/Project/IndividualProject.vue'
import type { ProjectModel } from '@/interfaces/Projects/ProjectModel';

defineProps<{ projects: ProjectModel[] }>();
</script>

<template>
  <div class="grid grid-cols-3 gap-4 w-full">
    <div v-for="project in projects" :key="project.id" class="bg-gray-50 rounded-lg p-4 shadow-md">
      <IndividualProject :project="project" />
    </div>
  </div>

</template>

<style scoped></style>

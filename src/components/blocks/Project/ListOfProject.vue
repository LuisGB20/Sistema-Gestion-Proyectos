<script setup lang="ts">
import type { Project } from '@/Interfaces/Project.ts'
import IndividualProject from '@/components/blocks/Project/IndividualProject.vue'

defineProps<{ projects: Project[] }>();
</script>

<template>
  <div v-for="project in projects" :key="project.id" class="bg-gray-50 rounded-lg p-4 shadow-md">
    <IndividualProject :project="project" />
  </div>
</template>

<style scoped></style>

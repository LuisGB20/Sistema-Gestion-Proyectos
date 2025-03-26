<script setup lang="ts">
import IndividualProject from '@/components/blocks/project/IndividualProject.vue'
import type { BestProjectModel } from '@/interfaces/Projects/ProjectModel'
import { computed } from 'vue';

const props = defineProps<{ projects: BestProjectModel[] }>();

const projects = computed(() => props.projects)
</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-4 w-full">
      <IndividualProject v-for="project in projects" :key="project.id" :project="project" />
  </div>
</template>


<style scoped></style>

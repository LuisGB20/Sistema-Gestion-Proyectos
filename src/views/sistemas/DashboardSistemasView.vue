<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { meses } from '@/data/meses';
import { Chart, registerables } from 'chart.js';
import { computed } from '@vue/reactivity';
import { GetDashboardDataResources } from '@/services/resources/recursosService';
import type { ResourceDashboardDataModel } from '@/interfaces/resources/ResourceDashboardDataModel';
import { Bar } from 'vue-chartjs';
Chart.register(...registerables);

const dashboardData = ref<ResourceDashboardDataModel>({
  totalResources: 0,
  assignedResources: 0,
  projectsWithResources: 0,
  mostUsedResource: '',
  resourcesByMonth: []
});

const resourcesQuantityMonth = ref<Number[]>([]);

onMounted(async () => {
  const response = await GetDashboardDataResources();

  dashboardData.value = {
    totalResources: response.data.totalResources,
    assignedResources: response.data.assignedResources,
    projectsWithResources: response.data.projectsWithResources,
    mostUsedResource: response.data.mostUsedResource,
    resourcesByMonth: response.data.resourcesByMonth
  }

  resourcesQuantityMonth.value = dashboardData.value.resourcesByMonth.map(resource => resource.resourceQuantityMonth);
  console.log(resourcesQuantityMonth.value)
});

const chartData = computed(() => ({
  labels: meses,
  datasets: [{
    label: 'Cantidad de proyectos',
    data: resourcesQuantityMonth.value,
    fill: false,
    backgroundColor: '#212A31',
    tension: 0.1
  }]
}));
</script>

<template>
  <main>
    <div class="flex flex-col gap-6">

      <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Recursos totales</h3>
          <p class="text-gainsboro text-4xl font-bold">{{ dashboardData.totalResources }}</p>
        </div>

        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Recursos asignados</h3>
          <p class="text-gainsboro text-4xl font-bold">{{ dashboardData.assignedResources }}</p>
        </div>

        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Proyectos con recursos</h3>
          <p class="text-gainsboro text-4xl font-bold">{{ dashboardData.projectsWithResources }}</p>
        </div>

        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Recurso más utilizado</h3>
          <p class="text-gainsboro text-2xl font-bold">{{ dashboardData.mostUsedResource }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <div class="flex-1">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <h2
              class="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue">
              Actividad mensual de recursos</h2>
            <div class="bg-white h-[300px] md:h-[500px] w-full rounded-lg flex flex-col justify-center items-center">
              <Bar id="grafica-proyectos" :data="chartData"
                :options="{ responsive: true, maintainAspectRatio: false }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

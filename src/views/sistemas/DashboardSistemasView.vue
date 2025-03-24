<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { GetDashboardDataResources } from '@/services/resources/recursosService';
import type { ResourceDashboardDataModel } from '@/interfaces/resources/ResourceDashboardDataModel';
import { useToast } from 'primevue';
import { meses } from '@/data/meses';
Chart.register(...registerables);

const toast = useToast();
const dashboardData = ref<ResourceDashboardDataModel>();

const resourcesQuantityMonth = ref<Number[]>([]);

onBeforeMount(async () => {
  try {
    const response = await GetDashboardDataResources();
    dashboardData.value = response.data;

    const resourcesByMonth = meses.map((month, index) => {
      const activity = dashboardData.value?.resourcesByMonth.find(item => item.month === (index + 1));
      return {
        year: activity?.year ?? new Date().getFullYear(),
        month: index + 1,
        resourceQuantityMonth: activity?.resourceQuantityMonth ?? 0
      };
    });

    dashboardData.value.resourcesByMonth = resourcesByMonth;
    resourcesQuantityMonth.value = dashboardData.value.resourcesByMonth.map(month => month.resourceQuantityMonth);
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información', life: 3000 });
  }
});

const chartData = computed(() => ({
  labels: meses,
  datasets: [{
    label: 'Cantidad de Recursos por Mes',
    data: resourcesQuantityMonth.value,
    backgroundColor: 'rgba(153, 102, 255, 0.2)',
    borderColor: '#9966FF',
    borderWidth: 2,
    borderRadius: 5,
    hoverBackgroundColor: '#9966FF',
  }]
}));
</script>

<template>
  <main class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <header class="text-center">
        <h1 class="text-3xl font-bold text-DarkTeal">Panel de Recursos</h1>
        <p class="text-gray-600 mt-2">Resumen del uso y asignación de recursos</p>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-sm md:text-lg font-semibold">Recursos Totales</h3>
          <p class="text-2xl md:text-4xl font-bold mt-2">{{ dashboardData?.totalResources }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-sm md:text-lg font-semibold">Recursos Asignados</h3>
          <p class="text-2xl md:text-4xl font-bold mt-2">{{ dashboardData?.assignedResources }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-sm md:text-lg font-semibold">Proyectos con Recursos</h3>
          <p class="text-2xl md:text-4xl font-bold mt-2">{{ dashboardData?.projectsWithResources }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-sm md:text-lg font-semibold">Recurso Más Utilizado</h3>
          <p class="text-xl md:text-2xl font-bold mt-2">{{ dashboardData?.mostUsedResource }}</p>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad Mensual de Recursos</h2>
          <div class="h-[300px] md:h-[400px] w-full rounded-lg bg-white flex justify-center items-center">
            <Bar id="grafica-recursos" :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

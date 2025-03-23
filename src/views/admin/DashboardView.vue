<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { Bar, Doughnut, Line, Pie } from 'vue-chartjs';
import { meses } from '@/data/meses';
import { Chart, registerables } from 'chart.js';
import { GetAdminDashboardData } from '@/services/admin/AdminService';
import type { AdminDashboardDataModel } from '@/interfaces/admin/AdminDashboardDataModel';

Chart.register(...registerables);

const dashboardData = ref<AdminDashboardDataModel>();

const logsByMonths = ref<number[]>([]);
const resourcesByMonths = ref<number[]>([]);
const projectsByMonths = ref<number[]>([]);

onBeforeMount(async () => {
  const response = await GetAdminDashboardData();
  dashboardData.value = response.data;

  const logsByMonth = meses.map((_, index) => {
    const log = dashboardData.value?.logsByMonths.find(item => item.month === (index + 1));
    return log?.dataQuantity ?? 0;
  });
  logsByMonths.value = logsByMonth;

  const resourcesByMonth = meses.map((_, index) => {
    const resource = dashboardData.value?.resourcesByMonths.find(item => item.month === (index + 1));
    return resource?.dataQuantity ?? 0;
  });
  resourcesByMonths.value = resourcesByMonth;

  const projectsByMonth = meses.map((_, index) => {
    const project = dashboardData.value?.projectsByMonths.find(item => item.month === (index + 1));
    return project?.dataQuantity ?? 0;
  });
  projectsByMonths.value = projectsByMonth;
});

// Paleta de colores para la gráfica de pastel
const pieChartColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
  '#E7E9ED', '#8C9EFF', '#00CC99', '#FF6B6B', '#4D80E6', '#FFD166'
];

const chartDataLogs = computed(() => ({
  labels: meses,
  datasets: [{
    label: 'Cantidad de logs',
    data: logsByMonths.value,
    fill: true,
    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo con transparencia
    borderColor: '#4BC0C0', // Color del borde
    borderWidth: 2,
    tension: 0.4,
    pointBackgroundColor: '#4BC0C0', // Color de los puntos
    pointBorderColor: '#fff', // Borde de los puntos
    pointHoverBackgroundColor: '#fff', // Color al pasar el mouse
    pointHoverBorderColor: '#4BC0C0' // Borde al pasar el mouse
  }]
}));

const chartDataResources = computed(() => ({
  labels: meses,
  datasets: [{
    label: 'Cantidad de recursos',
    data: resourcesByMonths.value,
    backgroundColor: 'rgba(153, 102, 255, 0.2)', // Color de fondo con transparencia
    borderColor: '#9966FF', // Color del borde
    borderWidth: 2,
    borderRadius: 5, // Bordes redondeados en las barras
    hoverBackgroundColor: '#9966FF', // Color al pasar el mouse
  }]
}));

const chartDataProjects = computed(() => ({
  labels: meses,
  datasets: [{
    label: 'Cantidad de proyectos',
    data: projectsByMonths.value,
    backgroundColor: pieChartColors, // Usar la paleta de colores
    borderColor: '#fff', // Borde blanco para los segmentos
    borderWidth: 2,
    hoverOffset: 10, // Efecto de separación al pasar el mouse
  }]
}));
</script>

<template>
  <main class="flex flex-col gap-6">
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h3 class="text-gainsboro text-xl font-semibold mb-2">Usuarios Activos</h3>
        <p class="text-gainsboro text-4xl font-bold">{{ dashboardData?.activeusers ?? 0 }}</p>
      </div>
      <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h3 class="text-gainsboro text-xl font-semibold mb-2">Proyectos Totales</h3>
        <p class="text-gainsboro text-4xl font-bold">{{ dashboardData?.totalProjects ?? 0 }}</p>
      </div>
      <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h3 class="text-gainsboro text-xl font-semibold mb-2">Recursos Totales</h3>
        <p class="text-gainsboro text-4xl font-bold">{{ dashboardData?.totalResources ?? 0 }}</p>
      </div>
      <div class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h3 class="text-gainsboro text-xl font-semibold mb-2">Logs Diarios</h3>
        <p class="text-gainsboro text-4xl font-bold">{{ dashboardData?.totalLogsByDay ?? 0 }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad mensual de recursos</h2>
        <div class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
          <Bar :data="chartDataResources" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad mensual de proyectos</h2>
        <div class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
          <Pie :data="chartDataProjects" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-xl col-span-2">
        <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad mensual de logs</h2>
        <div class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
          <Line :data="chartDataLogs" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>
    </div>
  </main>
</template>
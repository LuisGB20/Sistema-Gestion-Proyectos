<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { computed } from '@vue/reactivity';
import type { EmployeeDashboardDataModel } from '@/interfaces/employees/EmployeeDashboardDataModel';
import { GetEmployeeDataDashboard } from '@/services/employees/EmployeeService';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'primevue';
import { meses } from '@/data/meses';
import { formatDate } from '@/utils/formatDate';
Chart.register(...registerables);

const authStore = useAuthStore();
const toast = useToast();
const dashboardData = ref<EmployeeDashboardDataModel>();

const activityByMonthQuantity = ref<Number[]>([]);

onBeforeMount(async () => {
  const { id } = authStore.employee || {};
  if (!id) {
    toast.add({ severity: 'error', summary: 'Algo salió mal', detail: 'Intentalo de nuevo más tarde', life: 3000 });
    return;
  }

  const response = await GetEmployeeDataDashboard(id);
  console.log(response)

  dashboardData.value = response.data;

  const activitiesByMonth = meses.map((month, index) => {
    const activity = dashboardData.value?.activitiesByMonths.find(item => item.month === (index + 1));
    return {
      year: activity?.year ?? (new Date().getFullYear()),
      month: (index + 1),
      activityCount: activity?.activityCount ?? 0 
    };
  });

  dashboardData.value.activitiesByMonths = activitiesByMonth;
  activityByMonthQuantity.value = dashboardData.value.activitiesByMonths.map(month => month.activityCount);
});

const chartData = computed(() => ({
  labels: meses,
  datasets: [{
    label: 'Tareas por Mes',
    data: activityByMonthQuantity.value,
    fill: false,
    borderColor: '#1A1A19',
    backgroundColor: '#929AAB',
    tension: 0.1
  }]
}));
</script>

<template>
  <main class=" min-h-screen">
    <div class="max-w-7xl mx-auto space-y-8">

      <!-- Header Section -->
      <header class="text-center">
        <h1 class="text-3xl font-bold text-DarkTeal">Panel de Actividades</h1>
        <p class="text-gray-600 mt-2">Resumen de tus tareas y actividades recientes</p>
      </header>

      <!-- Stats Grid -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-lg font-semibold">Tareas A Las Que Perteneces</h3>
          <p class="text-4xl font-bold mt-2">{{ dashboardData?.tasksAssignedToEmployee }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-lg font-semibold">Actividades Pendientes</h3>
          <p class="text-4xl font-bold mt-2">{{ dashboardData?.pendingTasks }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-lg font-semibold">Actividades Completadas</h3>
          <p class="text-4xl font-bold mt-2">{{ dashboardData?.completedTasks }}</p>
        </div>
      </section>

      <!-- Main Content Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Monthly Activity Chart -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold text-DarkTeal mb-4">Actividad Mensual de Tareas</h2>
          <div class="h-[300px] md:h-[400px] w-full rounded-lg bg-white flex justify-center items-center">
            <Line id="grafica-tareas" :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
          </div>
        </div>

        <!-- Latest Assigned Tasks -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold text-DarkTeal mb-4">Últimas Tareas Asignadas</h2>
          <ul class="space-y-4">
            <li v-for="activity in dashboardData?.lastActivities" :key="activity.id" class="flex flex-col space-y-2 p-4 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <span class="font-semibold text-lg text-DarkTeal">{{ activity.name }}</span>
              <span class="text-sm text-gray-600">{{ activity.description }}</span>
              <span class="text-sm text-gray-500">- {{ formatDate(activity.createdAt) }}</span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  </main>
</template>

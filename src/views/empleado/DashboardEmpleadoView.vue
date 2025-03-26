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
import { translateStatusActivity } from '@/utils/statusActivity';
import { RouterLink } from 'vue-router';
import { ArrowRightIcon } from '@heroicons/vue/16/solid';
Chart.register(...registerables);

const authStore = useAuthStore();
const toast = useToast();
const dashboardData = ref<EmployeeDashboardDataModel>();

const activityByMonthQuantity = ref<number[]>([]);

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
    borderColor: '#6A0DAD',
    backgroundColor: '#B19CD9',
    tension: 0.1
  }]
}));
</script>

<template>
  <main class=" min-h-screen max-w-7xl mx-auto">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-semibold text-DarkTeal flex justify-center items-center gap-4">
        Panel de Actividades
      </h1>
      <p class="text-lg text-gray-500 mt-3">Resumen de tus tareas y actividades recientes</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
        <h3 class="text-sm md:text-lg font-semibold">Tareas A Las Que Perteneces</h3>
        <p class="text-2xl md:text-4xl font-bold mt-2">{{ dashboardData?.tasksAssignedToEmployee }}</p>
      </div>
      <div
        class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
        <h3 class="text-sm md:text-lg font-semibold">Actividades Pendientes</h3>
        <p class="text-2xl md:text-4xl font-bold mt-2">{{ dashboardData?.pendingTasks }}</p>
      </div>
      <div
        class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
        <h3 class="text-sm md:text-lg font-semibold">Actividades Completadas</h3>
        <p class="text-2xl md:text-4xl font-bold mt-2">{{ dashboardData?.completedTasks }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 py-5">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad Mensual de Tareas</h2>
        <div class="h-[300px] md:h-[400px] w-full rounded-lg bg-white flex justify-center items-center">
          <Line id="grafica-tareas" :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>
      <div class="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-100">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <h2 class="text-xl text-center md:text-start md:text-2xl font-bold text-DarkTeal">Últimas Tareas Asignadas
          </h2>
          <RouterLink :to="{ name: 'empleado-tareas' }"
            class="flex items-center text-sm md:text-base font-medium text-DarkTeal hover:text-CharcoalBlue transition-colors mt-2 md:mt-0">
            Ver todas
            <ArrowRightIcon class="size-5 md:size-6 ml-1" />
          </RouterLink>
        </div>

        <ul class="space-y-3">
          <li v-for="activity in dashboardData?.lastActivities" :key="activity.id"
            class="group flex flex-col p-3 md:p-4 hover:bg-teal-50 rounded-lg transition-colors duration-200 border-l-4 border-transparent hover:border-DarkTeal">
            <div class="flex justify-between items-start">
              <span
                class="font-semibold text-base md:text-lg text-gray-800 group-hover:text-DarkTeal transition-colors">
                {{ activity.name }}
              </span>
            </div>

            <p class="text-sm md:text-base text-gray-600 my-1 md:my-2 line-clamp-2">
              {{ activity.description }}
            </p>

            <div
              class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-1 text-xs md:text-sm text-gray-500">
              <span>
                <i class="far fa-calendar-alt mr-1"></i>
                {{ formatDate(activity.createdAt) }}
              </span>
              <span v-if="activity.status" class="mt-1 sm:mt-0 text-right">
                {{ translateStatusActivity(activity.status) }}
              </span>
            </div>
          </li>

          <li v-if="!dashboardData?.lastActivities?.length" class="text-center py-4 md:py-6 text-gray-500">
            No hay tareas asignadas recientemente
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Bar, Doughnut, Line, Pie } from 'vue-chartjs'
import { meses } from '@/data/meses';
import { Chart, registerables } from 'chart.js';
import { computed } from '@vue/reactivity';
Chart.register(...registerables);

const dashboardData = ref({
  cantidadUsuarios: 0,
  cantidadProyectos: 0,
  cantidadEquipos: 0,
  cantidadLogs: 0,
  proyectosPorMes: []
});

const cantProyectosMes = ref<Number[]>([]);


onBeforeMount(async () => {
  // Simulación de datos falsos para el dashboard
  dashboardData.value = {
    cantidadUsuarios: 150,
    cantidadProyectos: 120,
    cantidadEquipos: 15,
    cantidadLogs: 3500,
    proyectosPorMes: [
      { mes: 'Enero', cantidad: 10 },
      { mes: 'Febrero', cantidad: 12 },
      { mes: 'Marzo', cantidad: 15 },
      { mes: 'Abril', cantidad: 18 },
      { mes: 'Mayo', cantidad: 22 },
      { mes: 'Junio', cantidad: 25 },
      { mes: 'Julio', cantidad: 28 },
      { mes: 'Agosto', cantidad: 30 },
      { mes: 'Septiembre', cantidad: 32 },
      { mes: 'Octubre', cantidad: 35 },
      { mes: 'Noviembre', cantidad: 40 },
      { mes: 'Diciembre', cantidad: 45 },
    ]
  };
  cantProyectosMes.value = dashboardData.value.proyectosPorMes.map(mes => mes.cantidad);
});

const chartData = computed(() => ({
  labels: meses,
  datasets: [{
    label: 'Cantidad de proyectos',
    data: cantProyectosMes.value,
    fill: false,
    borderColor: '#1A1A19',
    backgroundColor: '#929AAB',
    tension: 0.1
  }]
}));
</script>

<template>
  <main>
    <div class="flex flex-col gap-6">

      <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Usuarios totales -->
        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Usuarios Totales</h3>
          <p class="text-gainsboro text-4xl font-bold">{{ dashboardData.cantidadUsuarios }}</p>
        </div>

        <!-- Proyecto Total -->
        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Proyectos Totales</h3>
          <p class="text-gainsboro text-4xl font-bold">{{ dashboardData.cantidadProyectos }}</p>
        </div>

        <!-- Equipos Totales -->
        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Equipos Registrados</h3>
          <p class="text-gainsboro text-4xl font-bold">{{ dashboardData.cantidadEquipos }}</p>
        </div>

        <!-- Logs generados -->
        <div
          class="bg-linear-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 class="text-gainsboro text-xl font-semibold mb-2">Logs Generados</h3>
          <p class="text-gainsboro text-4xl font-bold">{{ dashboardData.cantidadLogs }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="flex-1">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad mensual de usuarios</h2>
            <div class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
              <Line id="grafica-proyectos" :data="chartData"
                :options="{ responsive: true, maintainAspectRatio: false }" />
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad mensual de proyectos</h2>
            <div class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
              <Pie id="grafica-proyectos" :data="chartData"
                :options="{ responsive: true, maintainAspectRatio: false }" />
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad mensual de equipos</h2>
            <div class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
              <Bar id="grafica-proyectos" :data="chartData"
                :options="{ responsive: true, maintainAspectRatio: false }" />
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad mensual de logs</h2>
            <div class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
              <Doughnut id="grafica-proyectos" :data="chartData"
                :options="{ responsive: true, maintainAspectRatio: false }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

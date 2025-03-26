<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const empleadosTotales = ref(280);
const empleadosActivos = ref(230);
const empleadosEnProyectos = ref(75);
const desempenoGeneral = ref(89);

// Simulación de actividad mensual
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const actividadMensual = ref(meses.map(() => Math.floor(Math.random() * 50) + 10));

const chartData = computed(() => ({
  labels: meses,
  datasets: [
    {
      label: 'Empleados activos por mes',
      data: actividadMensual.value,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: '#36A2EB',
      borderWidth: 2,
      borderRadius: 5,
      hoverBackgroundColor: '#36A2EB',
    },
  ],
}));
</script>

<template>
  <main class="min-h-screen">
    <div class="max-w-7xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-DarkTeal">Panel de Recursos Humanos</h1>
        <p class="text-gray-600 mt-2">Gestión de Empleados y Actividades</p>
      </header>

      <!-- Resumen de empleados -->
      <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-semibold">Empleados Totales</h3>
          <p class="text-4xl font-bold mt-2">{{ empleadosTotales }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-semibold">Empleados Activos</h3>
          <p class="text-4xl font-bold mt-2">{{ empleadosActivos }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-semibold">Empleados en Proyectos</h3>
          <p class="text-4xl font-bold mt-2">{{ empleadosEnProyectos }}</p>
        </div>

        <div class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-semibold">Desempeño General</h3>
          <p class="text-2xl font-bold mt-2">{{ desempenoGeneral }}%</p>
        </div>
      </section>

      <section class="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad Mensual de Empleados</h2>
        <div class="w-full h-[300px] md:h-[500px]">
          <Bar :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </section>
    </div>
  </main>
</template>

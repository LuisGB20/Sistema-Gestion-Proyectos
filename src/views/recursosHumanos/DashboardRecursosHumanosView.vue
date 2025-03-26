<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { GetRecursosHumanosDataDashboard } from '@/services/rh/rhService';
import { meses } from '@/data/meses';

Chart.register(...registerables);

const activeEmployees = ref(0);
const employeesWithoutProject = ref(0);
const employeeMostNeedit = ref<any>(null);
const lastEmployeeAdded = ref<any>(null);
const employeesByMonths = ref<{ month: number; year: number; dataQuantity: number }[]>([]);

const fetchData = async () => {
  try {
    const response = await GetRecursosHumanosDataDashboard();
    const data = response.data;

    activeEmployees.value = data.activeEmployees;
    employeesWithoutProject.value = data.employeesWithoutProject;
    employeeMostNeedit.value = data.employeeMostNeedit;
    lastEmployeeAdded.value = data.lastEmployeeAdded;
    employeesByMonths.value = data.employeesByMonths;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

onBeforeMount(() => {
  fetchData()
});

const chartData = computed(() => ({
  labels: meses,
  datasets: [
    {
      label: 'Empleados ingresados por mes',
      data: employeesByMonths.value.map(e => e.dataQuantity),
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
  <main class="min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-6">
        <h1 class="text-4xl font-semibold text-DarkTeal flex justify-center items-center gap-4">
          Panel de Recursos Humanos
        </h1>
        <p class="text-lg text-gray-500 mt-3">Gestión de Empleados y Actividades</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-sm md:text-lg font-semibold">Empleados Activos</h3>
          <p class="text-2xl md:text-4xl font-bold mt-2">{{ activeEmployees }}</p>
        </div>

        <div
          class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-sm md:text-lg font-semibold">Empleados sin Proyecto</h3>
          <p class="text-2xl md:text-4xl font-bold mt-2">{{ employeesWithoutProject }}</p>
        </div>

        <div
          class="bg-gradient-to-r from-DarkTeal to-CharcoalBlue text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <h3 class="text-sm md:text-lg font-semibold">Última Contratación</h3>
          <p class="text-2xl md:text-4xl font-bold mt-2">{{ lastEmployeeAdded?.name }}</p>
        </div>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-DarkTeal">Empleado Más Necesitado</h2>
          <p><strong>Nombre:</strong> {{ employeeMostNeedit?.name }} {{ employeeMostNeedit?.lastName }}</p>
          <p><strong>Edad:</strong> {{ employeeMostNeedit?.age }}</p>
          <p><strong>CURP:</strong> {{ employeeMostNeedit?.curp }}</p>
          <p><strong>RFC:</strong> {{ employeeMostNeedit?.rfc }}</p>
          <p><strong>Salario:</strong> ${{ employeeMostNeedit?.salary }}</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-DarkTeal">Último Empleado Agregado</h2>
          <p><strong>Nombre:</strong> {{ lastEmployeeAdded?.name }} {{ lastEmployeeAdded?.lastName }}</p>
          <p><strong>Edad:</strong> {{ lastEmployeeAdded?.age }}</p>
          <p><strong>CURP:</strong> {{ lastEmployeeAdded?.curp }}</p>
          <p><strong>RFC:</strong> {{ lastEmployeeAdded?.rfc }}</p>
          <p><strong>Salario:</strong> ${{ lastEmployeeAdded?.salary }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Actividad Mensual de Empleados</h2>
        <div class="w-full h-[300px] md:h-[500px]">
          <Bar :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>
    </div>
  </main>
</template>
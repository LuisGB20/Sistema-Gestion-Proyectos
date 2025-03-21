<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Bar, Doughnut, Line, Pie } from 'vue-chartjs'
import { meses } from '@/data/meses';
import { Chart, registerables } from 'chart.js';
import { computed } from '@vue/reactivity';
Chart.register(...registerables);

const statusData = ref({
    logsPorMes: []
});

const cantLogsMes = ref<Number[]>([]);


onBeforeMount(async () => {
    // Simulación de datos falsos para los logs?
    statusData.value = {
        logsPorMes: [
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
    cantLogsMes.value = statusData.value.logsPorMes.map(mes => mes.cantidad);
});

const chartData = computed(() => ({
    labels: meses,
    datasets: [{
        label: 'Cantidad de logs',
        data: cantLogsMes.value,
        fill: false,
        borderColor: '#1A1A19',
        backgroundColor: '#929AAB',
        tension: 0.1
    }]
}));
</script>

<template>
    <main>
        <h1 class="font-semibold uppercase py-4">Sistema metrico</h1>
        <div class="flex flex-col gap-6">
            <div class="bg-white p-6 rounded-lg shadow-xl w-full">
                <h2 class="text-2xl font-semibold mb-4 text-DarkTeal">Tiempo de respuesta API</h2>
                <div
                    class="bg-white h-[300px] md:h-[400px] w-full rounded-lg flex flex-col justify-center items-center">
                    <Line id="grafica-logs" :data="chartData"
                        :options="{ responsive: true, maintainAspectRatio: false }" />
                </div>
            </div>
        </div>
    </main>
</template>

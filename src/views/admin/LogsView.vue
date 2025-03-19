<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { meses } from '@/Data/Meses';
import { Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const logs = ref();
const loading = ref(true);
const statuses = ref(['Éxito', 'Error', 'Advertencia']);

const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

onMounted(() => {
    logs.value = [
        {
            descripcion: 'El usuario ha iniciado sesión correctamente.',
            fecha: '2025-03-08 08:30:00',
            estado: 'Éxito'
        },
        {
            descripcion: 'Se produjo un error al intentar cargar los datos del servidor.',
            fecha: '2025-03-08 08:35:00',
            estado: 'Error'
        },
        {
            descripcion: 'El archivo fue cargado correctamente.',
            fecha: '2025-03-08 08:40:00',
            estado: 'Éxito'
        },
        {
            descripcion: 'Advertencia: El usuario intentó acceder a una página sin permisos.',
            fecha: '2025-03-08 08:45:00',
            estado: 'Advertencia'
        },
        {
            descripcion: 'Se registraron 50 nuevos autos en el sistema.',
            fecha: '2025-03-08 09:00:00',
            estado: 'Éxito'
        },
        {
            descripcion: 'Se produjo un error al intentar actualizar el perfil del usuario.',
            fecha: '2025-03-08 09:10:00',
            estado: 'Error'
        },
        {
            descripcion: 'El usuario ha cerrado sesión correctamente.',
            fecha: '2025-03-08 09:15:00',
            estado: 'Éxito'
        },
        {
            descripcion: 'Advertencia: La base de datos no respondió en el tiempo esperado.',
            fecha: '2025-03-08 09:20:00',
            estado: 'Advertencia'
        },
        {
            descripcion: 'La nueva versión de la aplicación fue desplegada con éxito.',
            fecha: '2025-03-08 09:30:00',
            estado: 'Éxito'
        },
        {
            descripcion: 'error al intentar procesar el pago del usuario.',
            fecha: '2025-03-08 09:40:00',
            estado: 'Error'
        }
    ]

    loading.value = false;
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: null, matchMode: FilterMatchMode.EQUALS },
    descripcion: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const cantLogsMes = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const chartData = computed(() => ({
    labels: meses,
    datasets: [{
        label: 'Cantidad de usuarios',
        data: cantLogsMes.value,
        fill: false,
        borderColor: '#124E66',
        backgroundColor: '#D3D9D4',
        tension: 0.1
    }]
}));
</script>

<template>
    <main>
        <h1 class="text-2xl font-bold mb-4">Dashboard de Logs</h1>

        <!-- Tarjetas de Resumen -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-white">
            <div class="p-4 bg-linear-to-r from-DarkTeal to-CharcoalBlue shadow rounded-lg">
                <h2 class="text-lg font-semibold">Total Logs</h2>
                <p class="text-3xl font-bold">{{ logs ? logs.length : 0 }}</p>
            </div>
            <div class="p-4 bg-green-100 text-green-700 shadow rounded-lg">
                <h2 class="text-lg font-semibold">Éxitos</h2>
                <p class="text-3xl font-bold">17</p>
            </div>
            <div class="p-4 bg-yellow-100 text-yellow-700 shadow rounded-lg">
                <h2 class="text-lg font-semibold">Advertencia</h2>
                <p class="text-3xl font-bold">3</p>
            </div>
            <div class="p-4 bg-red-100 text-red-700 shadow rounded-lg">
                <h2 class="text-lg font-semibold">Fallidos</h2>
                <p class="text-3xl font-bold">3</p>
            </div>
        </div>

        <!-- Tabla -->
        <div class="card">
            <DataTable v-model:filters="filters" :value="logs" removableSort ref="dt" paginator :rows="5"
                :rowsPerPageOptions="[5, 10, 20]" :loading="loading"
                :globalFilterFields="['fecha', 'estado', 'descripcion']" filterDisplay="row" class="rounded-lg">
                <template #header>
                    <div class="flex justify-between">
                        <div class="flex flex-wrap items-center justify-start gap-2">
                            <span class="text-xl font-bold">Logs</span>
                        </div>
                        <div class="flex">
                            <div class="text-end mr-4 ">
                                <Button icon="pi pi-external-link" label="Exportar" @click="exportCSV" />
                            </div>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Buscar" />
                            </IconField>
                        </div>
                    </div>
                </template>
                <template #empty> No se encontrarón logs. </template>
                <template #loading> Cargando logs, por favor espere. </template>
                <Column field="fecha" header="Fecha" sortable></Column>
                <Column field="estado" header="Estado" :showFilterMenu="false" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.estado }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">

                        <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses"
                            placeholder="Selecciona uno" style="min-width: 12rem" :showClear="true">
                            <template #option="slotProps">
                                {{ slotProps.option }}
                            </template>
                        </Select>
                    </template>
                </Column>
                <Column field="descripcion" header="Descripción" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.descripcion }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            placeholder="Buscar por descripción" />
                    </template>
                </Column>

                <template #footer> En total son: {{ logs ? logs.length : 0 }} logs. </template>
            </DataTable>
        </div>


        <div class="flex-1 mt-5">
            <div class="bg-white p-6 rounded-lg shadow-xl">
                <h2 class="text-2xl font-semibold mb-4 text-gun-metal">Logs mensuales</h2>
                <div
                    class="bg-white h-[300px] md:h-[500px] w-full rounded-lg flex flex-col justify-center items-center">
                    <Line id="grafica-usuarios" :data="chartData"
                        :options="{ responsive: true, maintainAspectRatio: false }" />
                </div>
            </div>
        </div>

    </main>
</template>

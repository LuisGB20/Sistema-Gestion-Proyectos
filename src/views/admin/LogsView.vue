<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import Button from 'primevue/button'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { Doughnut, Bar, Pie } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { useLogsWebSocket } from '@/composables/useLogsWebsocket'
import type { CountLogsTypes } from '@/interfaces/logs/CountLogsParams'
import type { ResponseHelper } from '@/interfaces/helpers/ResponseHelper'
import type { LogModelWithUserEmail } from '@/interfaces/logs/LogModel'
import type { ResponseHelperArray } from '@/interfaces/helpers/ResponseHelperArray'
import { useLogsDataWebSocket } from '@/composables/useLogsDataWebsocket'

const logs = ref<LogModelWithUserEmail[]>([])
const loading = ref(true)
const totalLogs = ref(0)

const infoLogs = ref(0)
const successLogs = ref(0)
const warningLogs = ref(0)
const errorLogs = ref(0)

const timeSeriesData = ref<number[]>(Array(15).fill(0))
let timeIndex = 0

const httpMethodsCount = computed(() => {
  const counts: Record<string, number> = { GET: 0, POST: 0, PUT: 0, DELETE: 0, PATCH: 0 }
  logs.value.forEach((log) => {

    const method = mapHttpMethod(log.httpMethod)
    counts[method] = (counts[method] || 0) + 1
  })
  return counts
})

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}

const { setupLogsListeners, cleanupLogsListeners, close: closeLogsWebSocket } = useLogsWebSocket()

const {
  setupLogsDataListeners,
  cleanupLogsDataListeners,
  close: closeDataWebSocket,
} = useLogsDataWebSocket()

const handleWebSocketMessage = (response: ResponseHelper<CountLogsTypes>) => {
  successLogs.value = response.data.successCount
  warningLogs.value = response.data.warningCount
  errorLogs.value = response.data.errorCount
  infoLogs.value = response.data.informationCount
  totalLogs.value =
    response.data.successCount +
    response.data.warningCount +
    response.data.errorCount +
    response.data.informationCount
}

const handleLogsData = (response: ResponseHelperArray<LogModelWithUserEmail>) => {
  if (response.success) {
    logs.value = response.data
    loading.value = false

    timeSeriesData.value[timeIndex] = response.data.length
    timeIndex = (timeIndex + 1) % 15
  }
}

const handleWebSocketError = (error: unknown) => {
  console.error('WebSocket error:', error)
}

onMounted(() => {
  setupLogsListeners({
    onUpdate: handleWebSocketMessage,
    onError: handleWebSocketError,
  })

  setupLogsDataListeners({
    onDataUpdate: handleLogsData,
    onError: handleWebSocketError,
  })
})

onBeforeUnmount(() => {
  cleanupLogsListeners({
    onUpdate: handleWebSocketMessage,
    onError: handleWebSocketError,
  })

  cleanupLogsDataListeners({
    onDataUpdate: handleLogsData,
    onError: handleWebSocketError,
  })

  closeDataWebSocket()
  closeLogsWebSocket()
})

const getLevelColor = (level: number) => {
  const colors: Record<number, string> = {
    0: 'bg-blue-100 text-blue-800',
    1: 'bg-yellow-100 text-yellow-800',
    2: 'bg-red-100 text-red-800',
    3: 'bg-green-100 text-green-800',
  }
  return colors[level] || 'bg-gray-100 text-gray-800'
}

const getMethodColor = (method: number) => {
  const colors: Record<string, string> = {
    0: 'bg-green-100 text-green-800',
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-red-100 text-red-800',
    4: 'bg-purple-100 text-purple-800',
  }
  return colors[method] || 'bg-gray-100 text-gray-800'
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  level: { value: null, matchMode: FilterMatchMode.EQUALS },
  message: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  httpMethod: { value: null, matchMode: FilterMatchMode.EQUALS },
  endpoint: { value: null, matchMode: FilterMatchMode.CONTAINS },
  userEmail: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const mapLevel = (level: number) => {
  const levelsMap: Record<number, string> = {
    0: 'Información',
    1: 'Advertencia',
    2: 'Error',
    3: 'Éxito',
  }
  return levelsMap[level] || level
}

const levelOptions = ref([
  { value: 0, label: 'Información' },
  { value: 1, label: 'Advertencia' },
  { value: 2, label: 'Error' },
  { value: 3, label: 'Éxito' },
])

const mapHttpMethod = (method: number) => {
  const methodsMap: Record<string, string> = {
    0: 'GET',
    1: 'POST',
    2: 'PUT',
    3: 'DELETE',
    4: 'PATCH',
  }
  return methodsMap[method] || method
}

const httpOptions = ref([
  { value: 0, label: 'GET' },
  { value: 1, label: 'POST' },
  { value: 2, label: 'PUT' },
  { value: 3, label: 'DELETE' },
  { value: 4, label: 'PATCH' },
])

// Graficas
const levelsChartData = computed(() => ({
  labels: ['Información', 'Éxito', 'Advertencia', 'Error'],
  datasets: [
    {
      data: [infoLogs.value, successLogs.value, warningLogs.value, errorLogs.value],
      backgroundColor: ['#93C5FD', '#6EE7B7', '#FDE047', '#FCA5A5'],
      borderColor: '#fff',
    },
  ],
}))

const timeChartData = computed(() => ({
  labels: Array.from({ length: 15 }, (_, i) => `${i * 5} min`),
  datasets: [
    {
      label: 'Logs por intervalo',
      data: timeSeriesData.value,
      borderColor: '#3B82F6',
      tension: 0.1,
    },
  ],
}))

const httpChartData = computed(() => ({
  labels: Object.keys(httpMethodsCount.value),
  datasets: [
    {
      label: 'Métodos HTTP',
      data: Object.values(httpMethodsCount.value),
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'],
    },
  ],
}))

const endpointsCount = computed(() => {
  const counts: Record<string, number> = {}
  logs.value.forEach((log) => {
    counts[log.endpoint] = (counts[log.endpoint] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
})

const endpointsChartData = computed(() => ({
  labels: endpointsCount.value.map((e) => e[0]),
  datasets: [
    {
      label: 'Accesos',
      data: endpointsCount.value.map((e) => e[1]),
      backgroundColor: '#60A5FA',
    },
  ],
}))

const usersActivity = computed(() => {
  const counts: Record<string, number> = {}
  logs.value.forEach((log) => {
    const user = log.userEmail || 'Sistema'
    counts[user] = (counts[user] || 0) + 1
  })
  return Object.entries(counts)
})

const usersChartData = computed(() => ({
  labels: usersActivity.value.map((u) => u[0]),
  datasets: [
    {
      data: usersActivity.value.map((u) => u[1]),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    },
  ],
}))

const successPercentage = computed(() => {
  const total = successLogs.value + errorLogs.value + warningLogs.value;
  return total > 0 ? Math.round((successLogs.value / total) * 100) : 0;
});

const gaugeData = computed(() => ({
  datasets: [{
    data: [successPercentage.value],
    backgroundColor: ['#10B981'],
    borderWidth: 0,
    circumference: 270,
    rotation: 225,
    needleValue: successPercentage.value,
    borderRadius: 5
  }]
}));

const gaugeOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  circumference: 270,
  rotation: 225,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          xMin: 0.5,
          xMax: 0.5,
          yMin: 0,
          yMax: 85,
          borderColor: '#6B7280',
          borderWidth: 2
        }
      }
    }
  }
}));
</script>

<template>
  <main>
    <h1 class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-start text-3xl font-bold mb-3">
      Dashboard de Logs
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-white">
      <div class="p-4 bg-blue-100 text-blue-800 shadow rounded-lg">
        <h2 class="text-lg font-semibold">Informativos</h2>
        <p class="text-3xl font-bold">{{ infoLogs }}</p>
      </div>

      <div class="p-4 bg-green-100 text-green-700 shadow rounded-lg">
        <h2 class="text-lg font-semibold">Éxitos</h2>
        <p class="text-3xl font-bold">{{ successLogs }}</p>
      </div>
      <div class="p-4 bg-yellow-100 text-yellow-700 shadow rounded-lg">
        <h2 class="text-lg font-semibold">Advertencia</h2>
        <p class="text-3xl font-bold">{{ warningLogs }}</p>
      </div>
      <div class="p-4 bg-red-100 text-red-700 shadow rounded-lg">
        <h2 class="text-lg font-semibold">Fallidos</h2>
        <p class="text-3xl font-bold">{{ errorLogs }}</p>
      </div>
    </div>

    <div class="card">
      <DataTable v-model:filters="filters" :value="logs" removableSort ref="dt" paginator :rows="7"
        :rowsPerPageOptions="[5, 10, 20]" :loading="loading" :globalFilterFields="[
          'timeStamp',
          'level',
          'message',
          'httpMethod',
          'endpoint',
          'userEmail',
        ]" filterDisplay="row" class="rounded-lg">
        <template #header>
          <div class="flex justify-between">
            <div class="flex flex-wrap items-center justify-start gap-2">
              <span class="text-xl font-bold">Logs</span>
            </div>
            <div class="flex">
              <div class="text-end mr-4">
                <Button class="btn-export" icon="pi pi-external-link" label="Exportar" @click="exportCSV" />
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

        <template #empty> No se encontraron logs. </template>
        <template #loading> Cargando logs, por favor espere. </template>

        <Column field="level" header="Nivel" :showFilterMenu="false" style="min-width: 12rem">
          <template #body="{ data }">
            <span class="text-sm font-medium me-2 px-2.5 py-0.5 rounded-full" :class="getLevelColor(data.level)">
              {{ mapLevel(data.level) }}
            </span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" @change="filterCallback()" :options="levelOptions" optionLabel="label"
              optionValue="value" placeholder="Selecciona nivel" style="min-width: 12rem" :showClear="true">
              <template #option="slotProps">
                <span class="text-sm font-medium px-2 py-1 rounded-full" :class="getLevelColor(slotProps.option.value)">
                  {{ slotProps.option.label }}
                </span>
              </template>
            </Select>
          </template>
        </Column>

        <Column field="message" header="Mensaje" style="min-width: 20rem">
          <template #body="{ data }">
            {{ data.message }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
              placeholder="Buscar por mensaje" />
          </template>
        </Column>

        <Column field="httpMethod" header="Método HTTP" sortable style="min-width: 10rem">
          <template #body="{ data }">
            <span class="text-sm font-medium me-2 px-2.5 py-0.5 rounded-full" :class="getMethodColor(data.httpMethod)">
              {{ mapHttpMethod(data.httpMethod) }}
            </span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" @change="filterCallback()" :options="httpOptions" optionLabel="label"
              optionValue="value" placeholder="Selecciona método" style="min-width: 12rem" :showClear="true">
              <template #option="slotProps">
                <span class="text-sm font-medium px-2 py-1 rounded-full"
                  :class="getMethodColor(slotProps.option.value)">
                  {{ slotProps.option.label }}
                </span>
              </template>
            </Select>
          </template>
        </Column>

        <Column field="endpoint" header="Endpoint" sortable style="min-width: 15rem">
          <template #body="{ data }">
            {{ data.endpoint }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
              placeholder="Buscar por endpoint" />
          </template>
        </Column>

        <Column field="userEmail" header="Usuario" sortable style="min-width: 15rem">
          <template #body="{ data }">
            {{ data.userEmail || 'Sistema' }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
              placeholder="Buscar por usuario" />
          </template>
        </Column>

        <Column field="timeStamp" header="Fecha" sortable>
          <template #body="{ data }">
            {{ new Date(data.timeStamp).toLocaleString() }}
          </template>
        </Column>

        <template #footer> En total son: {{ logs.length }} logs. </template>
      </DataTable>
    </div>

    <div class="grid-2-col">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-gun-metal">
          Distribución de niveles de registro
        </h2>
        <div class="bg-white h-[300px] md:h-[500px] w-full rounded-lg flex flex-col justify-center items-center">
          <Doughnut :data="levelsChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-gun-metal">Frecuencia de logs</h2>
        <div class="bg-white h-[300px] md:h-[500px] w-full rounded-lg flex flex-col justify-center items-center">
          <Line :data="timeChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-gun-metal">Métodos HTTP más utilizados</h2>
        <div class="bg-white h-[300px] md:h-[500px] w-full rounded-lg flex flex-col justify-center items-center">
          <Bar :data="httpChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-gun-metal">Endpoints más utilizados</h2>
        <div class="bg-white h-[300px] md:h-[500px] w-full rounded-lg flex flex-col justify-center items-center">
          <Bar :data="endpointsChartData" :options="{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
          }" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-gun-metal">Actividad por usuario</h2>
        <div class="bg-white h-[300px] md:h-[500px] w-full rounded-lg flex flex-col justify-center items-center">
          <Pie :data="usersChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-semibold mb-4 text-gun-metal">Tasa de Éxito</h2>
        <div class="h-48 relative">
          <Doughnut :data="gaugeData" :options="gaugeOptions" />
          <div class="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <span class="text-4xl font-bold text-gray-700">{{ successPercentage }}%</span>
          </div>
        </div>
        <div class="flex justify-between mt-4 text-sm text-gray-600">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.grid-2-col {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
}
</style>

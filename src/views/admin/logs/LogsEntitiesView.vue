<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { useLogsEntitiesWebsocket } from '@/composables/useLogsEntitiesWebsocket'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import type { ResponseHelperArray } from '@/interfaces/helpers/ResponseHelperArray'
import type { AuditEntitiesModel } from '@/interfaces/logs/AuditEntitiesModel'
import { FilterMatchMode } from '@primevue/core'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import Select from 'primevue/select'
import { Doughnut, Bar, Pie } from 'vue-chartjs'
import { Line } from 'vue-chartjs'

const logs = ref<AuditEntitiesModel[]>([])
const loading = ref(true)

const timeSeriesData = ref<number[]>(Array(15).fill(0))
let timeIndex = 0

const { setupLogsDataListeners, cleanupLogsDataListeners, close: closeLogsWebSocket } = useLogsEntitiesWebsocket()

const handleLogsData = (response: ResponseHelperArray<AuditEntitiesModel>) => {
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

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  action: { value: null, matchMode: FilterMatchMode.EQUALS },
  tableName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  user: { value: null, matchMode: FilterMatchMode.CONTAINS },
  role: { value: null, matchMode: FilterMatchMode.CONTAINS },
  ipAddress: { value: null, matchMode: FilterMatchMode.CONTAINS },
  userEmail: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const selectedLog = ref<AuditEntitiesModel | null>(null);
const displayModal = ref(false);

const formatJSON = (jsonString: string) => {
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, 2);
  } catch {
    return jsonString;
  }
};

const actionSeverity = (action: number) => {
  const colors: Record<string, string> = {
    'INSERT': 'bg-green-100 text-green-800',
    'UPDATE': 'bg-blue-100 text-blue-800',
    'DELETE': 'bg-red-100 text-red-800',
    'ALTER': 'bg-indigo-100 text-indigo-800'
  }
  return colors[action] || 'bg-gray-100 text-gray-800'
}

const actionOptions = ref([
  { label: 'INSERT', value: 'INSERT' },
  { label: 'UPDATE', value: 'UPDATE' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'ALTER', value: 'ALTER' }
]);

const getRoleColor = (role: string) => {
  const normalizedRole = role.toLowerCase().trim();

  const roleColors: { [key: string]: string } = {
    'admin': '#529de9',
    'sistemas': '#9333ea',
    'gerente': '#2563eb',
    'recursos humanos': '#16a34a',
    'supervisor': '#ea580c',
    'empleado': '#4b5563'
  };

  return roleColors[normalizedRole] || '#858699';
};


onMounted(() => {

  setupLogsDataListeners({
    onDataUpdate: handleLogsData,
    onError: handleWebSocketError,
  })
})

onBeforeUnmount(() => {

  cleanupLogsDataListeners({
    onDataUpdate: handleLogsData,
    onError: handleWebSocketError,
  })

  closeLogsWebSocket()
})

// Gráficas

/* ==================== */
/* Computed para gráficas */
/* ==================== */

// 1. Distribución de acciones (INSERT, UPDATE, DELETE, ALTER)
const actionsCount = computed(() => {
  const counts: Record<string, number> = { INSERT: 0, UPDATE: 0, DELETE: 0, ALTER: 0 }
  logs.value.forEach(log => {
    counts[log.action] = (counts[log.action] || 0) + 1
  })
  return counts
})

const actionsChartData = computed(() => ({
  labels: Object.keys(actionsCount.value),
  datasets: [
    {
      label: 'Operaciones',
      data: Object.values(actionsCount.value),
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
    }
  ]
}))

// 2. Top 5 Tablas afectadas
const tablesCount = computed(() => {
  const counts: Record<string, number> = {}
  logs.value.forEach(log => {
    counts[log.tableName] = (counts[log.tableName] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
})

const tablesChartData = computed(() => ({
  labels: tablesCount.value.map(([table]) => table),
  datasets: [
    {
      label: 'Operaciones por Tabla',
      data: tablesCount.value.map(([_, count]) => count),
      backgroundColor: '#60A5FA'
    }
  ]
}))

// 3. Distribución de roles
const rolesCount = computed(() => {
  const counts: Record<string, number> = {}
  logs.value.forEach(log => {
    counts[log.role] = (counts[log.role] || 0) + 1
  })
  return counts
})

const rolesChartData = computed(() => ({
  labels: Object.keys(rolesCount.value),
  datasets: [
    {
      label: 'Distribución de Roles',
      data: Object.values(rolesCount.value),
      backgroundColor: Object.keys(rolesCount.value).map(role => getRoleColor(role))
    }
  ]
}))

// 4. Serie temporal de registros
const timeChartData = computed(() => ({
  labels: Array.from({ length: 15 }, (_, i) => `${i * 5} min`),
  datasets: [
    {
      label: 'Registros en el tiempo',
      data: timeSeriesData.value,
      borderColor: '#3B82F6',
      tension: 0.1
    }
  ]
}))

// 5. Actividad por usuario
const usersActivity = computed(() => {
  const counts: Record<string, number> = {}
  logs.value.forEach(log => {
    const usuario = log.user || 'Sistema'
    counts[usuario] = (counts[usuario] || 0) + 1
  })
  return counts
})

const usersChartData = computed(() => ({
  labels: Object.keys(usersActivity.value),
  datasets: [
    {
      label: 'Actividad por Usuario',
      data: Object.values(usersActivity.value),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
    }
  ]
}))

// 6. Frecuencia de IPs (Top 5)
const ipsCount = computed(() => {
  const counts: Record<string, number> = {}
  logs.value.forEach(log => {
    const ip = log.ipAddress || 'Sin IP'
    counts[ip] = (counts[ip] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
})

const ipsChartData = computed(() => ({
  labels: ipsCount.value.map(([ip]) => ip),
  datasets: [
    {
      label: 'Frecuencia de IPs',
      data: ipsCount.value.map(([_, count]) => count),
      backgroundColor: '#FCA5A5'
    }
  ]
}))

</script>

<template>
  <main>
    <h1 class="text-2xl font-bold mb-4">Registros de operaciones en las entidades</h1>
    <div class="card">
      <DataTable :value="logs" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]" v-model:filters="filters"
        filterDisplay="row" :loading="loading" dataKey="idEntity">

        <Column field="action" header="Acción" :style="{ width: '15%' }">
          <template #body="{ data }">
            <span class="text-sm font-medium px-2 py-1 rounded-full" :class="actionSeverity(data.action)">
              {{ data.action }}
            </span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" @change="filterCallback()" :options="actionOptions" optionLabel="label"
              optionValue="value" placeholder="Selecciona una acción" style="min-width: 12rem" :showClear="true">
              <template #option="slotProps">
                <span class="text-sm font-medium px-2 py-1 rounded-full"
                  :class="actionSeverity(slotProps.option.value)">
                  {{ slotProps.option.label }}
                </span>
              </template>
            </Select>
          </template>
        </Column>

        <Column field="tableName" header="Tabla" :style="{ width: '15%' }">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
              placeholder="Buscar por tabla" />
          </template>
        </Column>

        <Column field="userEmail" header="Usuario" :style="{ width: '20%' }">
          <template #body="{ data }">
            <span v-if="data.userEmail" class="text-600">
              <i class="pi pi-user mr-2"></i>
              {{ data.userEmail || 'Sin correo' }}
            </span>
            <Tag v-else severity="secondary" value="Sin correo" />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
              placeholder="Buscar email" />
          </template>
        </Column>

        <Column field="role" header="Rol" :style="{ width: '15%' }">
          <template #body="{ data }">
            <Tag :value="data.role || 'Sin rol'" :style="{
              backgroundColor: getRoleColor(data.role || 'Sin rol'),
              color: 'white',
              border: 'none'
            }" rounded />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Buscar por rol" />
          </template>
        </Column>

        <Column field="ipAddress" header="Dirección IP" :style="{ width: '15%' }">
          <template #body="{ data }">
            <div class="flex align-items-center gap-2">
              <i class="pi pi-globe"></i>
              {{ data.ipAddress || 'Sin IP' }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
              placeholder="Buscar IP" />
          </template>
        </Column>

        <Column field="newValue" header="Valor del registro" :style="{ width: '10%' }">
          <template #body="{ data }">
            <Button v-if="data.newValue" icon="pi pi-eye" class="button-view"
              @click="selectedLog = data; displayModal = true" />
          </template>
        </Column>


      </DataTable>


      <Dialog v-model:visible="displayModal" header="Detalles técnicos" :style="{ width: '60vw', maxWidth: '800px' }"
        :modal="true">
        <div class="json-viewer">
          <pre><code>{{ selectedLog?.newValue ? formatJSON(selectedLog.newValue) : 'Sin datos' }}</code></pre>
        </div>
        <template #footer>
          <Button label="Cerrar" icon="pi pi-times" @click="displayModal = false" class="p-button-text" />
        </template>
      </Dialog>
    </div>

    <!-- Gráficas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 1. Distribución de Acciones -->
      <div class="card p-4">
        <h2 class="text-xl font-semibold mb-2">Distribución de Acciones</h2>
        <Doughnut :data="actionsChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
      </div>

      <!-- 2. Top 5 Tablas Afectadas -->
      <div class="card p-4">
        <h2 class="text-xl font-semibold mb-2">Top 5 Tablas Afectadas</h2>
        <Bar :data="tablesChartData" :options="{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' }" />
      </div>

      <!-- 3. Distribución de Roles -->
      <div class="card p-4">
        <h2 class="text-xl font-semibold mb-2">Distribución de Roles</h2>
        <Pie :data="rolesChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
      </div>

      <!-- 4. Serie Temporal -->
      <div class="card p-4">
        <h2 class="text-xl font-semibold mb-2">Serie Temporal de Registros</h2>
        <Line :data="timeChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
      </div>

      <!-- 5. Actividad por Usuario -->
      <div class="card p-4">
        <h2 class="text-xl font-semibold mb-2">Actividad por Usuario</h2>
        <Pie :data="usersChartData" :options="{ responsive: true, maintainAspectRatio: false }" />
      </div>

      <!-- 6. Frecuencia de IPs -->
      <div class="card p-4">
        <h2 class="text-xl font-semibold mb-2">Top 5 IPs</h2>
        <Bar :data="ipsChartData" :options="{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' }" />
      </div>
    </div>

  </main>
</template>

<style scoped>
.json-viewer {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 1rem;
  position: relative;
}

.json-viewer pre {
  color: #d4d4d4;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.json-viewer code {
  display: block;
  padding: 0.5rem;
}

.json-viewer string {
  color: #ce9178;
}

.json-viewer number {
  color: #b5cea8;
}

.json-viewer boolean {
  color: #569cd6;
}

.json-viewer null {
  color: #569cd6;
}

.json-viewer key {
  color: #9cdcfe;
}

.p-tag {
  font-weight: 600;
  text-transform: capitalize;
  min-width: 120px;
  justify-content: center;
  transition: transform 0.2s ease;
}

.p-tag:hover {
  transform: scale(1.05);
  cursor: default;
}

.button-view {
  background-color: #3073b6;
  border: 1px solid #3073b6;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.button-view:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.p-column-filter .p-dropdown {
  width: 100%;
}

.p-column-filter .p-dropdown-trigger {
  color: var(--tag-color);
}

.p-column-filter .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  padding: 0.5rem;
}
</style>

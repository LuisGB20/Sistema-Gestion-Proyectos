<script setup lang="ts">
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, watch } from 'vue';
import { DataTable } from 'primevue';

const props = defineProps<{
    columns: Array<string>
    columnsEs: Array<string>
    data: Array<object>
}>();

const data = ref(props.data);
const exportButtonDisabled = ref(false);  // Estado para deshabilitar el botón de exportar

watch(
  () => props.data,
  (newData) => {
    data.value = newData;
  },
  { immediate: true }
);

const dt = ref();
const exportCSV = () => {
    if (exportButtonDisabled.value) return;
    dt.value.exportCSV();

    exportButtonDisabled.value = true;
    setTimeout(() => {
        exportButtonDisabled.value = false;
    }, 10000);  
};

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <div class="card shadow-lg bg-white rounded-lg">
        <DataTable v-model:filters="filters" :value="data" removableSort ref="dt" paginator :rows="5"
            :rowsPerPageOptions="[5, 10]" :globalFilterFields="props.columns" class="rounded-lg">
            
            <template #header>
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-0">
                    <div class="flex mb-4 sm:mb-0 items-center gap-2">
                        <IconField class="flex-1">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar"
                                class="w-full sm:w-auto text-sm sm:text-base p-2" />
                        </IconField>
                    </div>
                    <div class="flex flex-wrap items-center justify-start gap-2">
                        <!-- Deshabilitar el botón de exportar cuando 'exportButtonDisabled' sea verdadero -->
                        <Button class="btn-export mx-auto md:m-0" icon="pi pi-external-link" label="Exportar" @click="exportCSV" :disabled="exportButtonDisabled" />
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center text-sm sm:text-base">No se encontraron elementos.</div>
            </template>
            <template #loading>
                <div class="text-center text-sm sm:text-base">Cargando elementos, por favor espere.</div>
            </template>

            <template v-for="(column, index) in props.columns" :key="column">
                <Column :field="column" :header="columnsEs[index]" sortable class="text-sm sm:text-base" />
            </template>

            <!-- Acciones -->
            <Column header="Acciones" :exportable="false">
                <template #body="slotProps">
                    <div class="flex justify-center items-center gap-2">
                        <Button class="btn-detail" icon="pi pi-eye" outlined rounded 
                            @click="$emit('showElement', slotProps.data)" />
                        <Button class="btn-edit" icon="pi pi-pencil" outlined rounded 
                            @click="$emit('editElement', slotProps.data)" />
                        <Button class="btn-delete" icon="pi pi-trash" outlined rounded severity="danger"
                            @click="$emit('confirmDelete', slotProps.data)" />
                    </div>
                </template>
            </Column>

            <template #footer>
                <div class="text-sm sm:text-base text-right">En total son: {{ data ? data.length : 0 }} elementos.</div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-export, .btn-detail, .btn-edit, .btn-delete {
    min-width: 2rem;
    font-size: 0.875rem;
}

.text-sm {
    font-size: 0.875rem;
}

.sm\:text-base {
    font-size: 1rem;
}

.pi {
    font-size: 1.25rem;
}

.table thead th {
    background-color: #f9fafb;
}

.table tbody tr:nth-child(even) {
    background-color: #f3f4f6;
}

@media (max-width: 640px) {
    .sm\:text-base {
        font-size: 0.875rem;
    }

    .sm\:w-auto {
        width: 100%;
    }
}
</style>

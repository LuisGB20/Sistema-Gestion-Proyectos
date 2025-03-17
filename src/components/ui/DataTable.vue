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

console.log(data)

watch(
  () => props.data,
  (newData) => {
    data.value = newData; 
  },
  { immediate: true }
);

const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});


</script>

<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="data" removableSort ref="dt" paginator :rows="5"
            :rowsPerPageOptions="[5, 10]"  :globalFilterFields="props.columns" class="rounded-lg">
            <template #header>
                <div class="flex justify-between">
                    <div class="flex">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar" />
                        </IconField>
                    </div>
                    <div class="flex flex-wrap items-center justify-start gap-2">
                        <Button class="btn-export" icon="pi pi-external-link" label="Exportar" @click="exportCSV" />
                    </div>
                </div>
            </template>
            <template #empty> No se encontraron elementos. </template>
            <template #loading> Cargando elementos, por favor espere. </template>


            <template v-for="(column, index) in props.columns" :key="column">
                <Column :field="column" :header="columnsEs[index]" sortable />
            </template>

            <Column header="Acciones" :exportable="false">
                <template #body="slotProps">
                    <Button class="btn-detail mr-2" icon="pi pi-eye" outlined rounded
                        @click="$emit('showElement', (slotProps.data))" />
                    <Button class="btn-edit mr-2" icon="pi pi-pencil" outlined rounded
                        @click="$emit('editElement', (slotProps.data))" />
                    <Button class="btn-delete" icon="pi pi-trash" outlined rounded severity="danger"
                        @click="$emit('confirmDelete', (slotProps.data))" />
                </template>
            </Column>

            <template #footer> En total son: {{ data ? data.length : 0 }} recursos. </template>
        </DataTable>
    </div>
</template>
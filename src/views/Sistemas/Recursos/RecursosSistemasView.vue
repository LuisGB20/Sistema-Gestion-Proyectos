<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import LinkComponent from '@/components/ui/LinkButton.vue';
import { getResources } from '@/services/recursosService';
import router from '@/router';

const resources = ref();
const loading = ref(true);
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

onMounted(async () => {
    const response = await getResources();
    resources.value = response.data;
    console.log(resources.value);
    loading.value = false;
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const showResource = (data: any) => {
    router.push(`/sistemas/recursos/${data.id}`);
};

const editResource = (data: any) => {
    console.log("Editar recurso", data);
};

const confirmDeleteResource = (data: any) => {
    console.log("Eliminar recurso", data);
};
</script>

<template>
    <main>
        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-bold">Recursos</h1>
            <LinkComponent to="/sistemas/recursos/agregar" texto="Crear" />
        </div>

        <!-- Tabla -->
        <div class="card">
            <DataTable v-model:filters="filters" :value="resources" removableSort ref="dt" paginator :rows="5"
                :rowsPerPageOptions="[5, 10, 20]" :loading="loading"
                :globalFilterFields="['name', 'description']"  class="rounded-lg">
                <template #header>
                    <div class="flex justify-between">
                        <div class="flex flex-wrap items-center justify-start gap-2">
                            <span class="text-xl font-bold">Recursos</span>
                        </div>
                        <div class="flex">
                            <div class="text-end mr-4">
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
                <template #empty> No se encontraron recursos. </template>
                <template #loading> Cargando recursos, por favor espere. </template>
                <Column field="name" header="Nombre" sortable></Column>
                <Column field="description" header="Descripción" sortable></Column>
                <Column field="quantity" header="Cantidad" sortable></Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2" @click="showResource(slotProps.data)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editResource(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteResource(slotProps.data)" />
                    </template>
                </Column>

                <template #footer> En total son: {{ resources ? resources.length : 0 }} recursos. </template>
            </DataTable>
        </div>
    </main>
</template>

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
import { deleteResource, getResources } from '@/services/recursosService';
import router from '@/router';
import { ConfirmDialog, Toast } from 'primevue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useNotificationStore } from '@/stores/notificationsStore';
import type { ResourceModel } from '@/interfaces/resources/ResourceModel';

const resources = ref<ResourceModel[]>([]);
const loading = ref(true);
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

const notificationsStore = useNotificationStore();

onMounted(async () => {
    const response = await getResources();
    resources.value = response.data;
    loading.value = false;

    notificationsStore.showAlert();
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const showResource = (data: ResourceModel) => {
    router.push(`/sistemas/recursos/${data.id}`);
};

const editResource = (data: ResourceModel) => {
    router.push(`/sistemas/recursos/editar/${data.id}`);
};

const confirm = useConfirm();
const toast = useToast();

const confirmDelete = (data: ResourceModel) => {
    confirm.require({
        message: '¿Quieres eliminar este registro?',
        header: `${data.name}`,
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: false
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: () => {
            confirmDeleteResource(data.id)
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Haz cancelado la operación', life: 3000 });
        }
    });
};

const confirmDeleteResource = async (id: string) => {
    console.log("Eliminar recurso", id);
    const response = await deleteResource(id);
    if(response.success){
        toast.add({ severity: 'success', summary: 'Eliminado', detail: 'Recurso eliminado', life: 3000 });
        const indexResource = resources.value.findIndex(r => r.id == id);
        resources.value.splice(indexResource, 1);
    } else {
        toast.add({ severity: 'error', summary: '¡Algo ha salido mal!', detail: `${response.message}`, life: 3000 });
    }
};
</script>

<template>
    <main>
        <div class="flex justify-between mb-4">
            <h1 class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-start text-3xl font-bold">
                Recursos
            </h1>
            <LinkComponent to="/sistemas/recursos/agregar" texto="Crear" />
        </div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="card">
            <DataTable v-model:filters="filters" :value="resources" removableSort ref="dt" paginator :rows="5"
                :rowsPerPageOptions="[5, 10, 20]" :loading="loading" :globalFilterFields="['name', 'description']"
                class="rounded-lg">
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
                            <Button icon="pi pi-external-link" label="Exportar" @click="exportCSV" />
                        </div>
                    </div>
                </template>
                <template #empty> No se encontraron recursos. </template>
                <template #loading> Cargando recursos, por favor espere. </template>
                <Column field="name" header="Nombre" sortable></Column>
                <Column field="description" header="Descripción" sortable></Column>
                <Column field="quantity" header="Cantidad" sortable></Column>
                <Column header="Acciones" :exportable="false">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2" @click="showResource(slotProps.data)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editResource(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDelete(slotProps.data)" />
                    </template>
                </Column>

                <template #footer> En total son: {{ resources ? resources.length : 0 }} recursos. </template>
            </DataTable>
        </div>
    </main>
</template>

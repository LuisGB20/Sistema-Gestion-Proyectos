<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import LinkComponent from '@/components/ui/LinkButton.vue';

const usuarios = ref();
const loading = ref(true);
const statuses = ref(['Activo', 'Inactivo', 'Pendiente']);
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

onMounted(() => {

    usuarios.value = [
        {
            nombre: 'Juan Pérez',
            correo: 'juan.perez@email.com',
            estado: 'Activo',
            fechaRegistro: '2025-03-01 08:00:00',
            rol: 'Administrador'
        },
        {
            nombre: 'Ana López',
            correo: 'ana.lopez@email.com',
            estado: 'Inactivo',
            fechaRegistro: '2025-02-25 10:15:00',
            rol: 'Escritor'
        },
        {
            nombre: 'Carlos García',
            correo: 'carlos.garcia@email.com',
            estado: 'Pendiente',
            fechaRegistro: '2025-03-05 12:00:00',
            rol: 'Lector'
        },
        {
            nombre: 'María Fernández',
            correo: 'maria.fernandez@email.com',
            estado: 'Activo',
            fechaRegistro: '2025-01-10 09:30:00',
            rol: 'Administrador'
        },
        {
            nombre: 'Luis Gómez',
            correo: 'luis.gomez@email.com',
            estado: 'Inactivo',
            fechaRegistro: '2025-03-02 14:20:00',
            rol: 'Lector'
        }
    ];

    loading.value = false;
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: null, matchMode: FilterMatchMode.EQUALS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    correo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const showUser = (data: any) => {

}

const editUser = (data: any) => {
    console.log("Hola")
    console.log(data)
}

const confirmDeleteUser = (data: any) => {

}
</script>

<template>
    <main>
        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-bold">Usuarios</h1>
            <LinkComponent to="" texto="Crear" />
        </div>

        <!-- Tabla -->
        <div class="card">
            <DataTable v-model:filters="filters" :value="usuarios" removableSort ref="dt" paginator :rows="5"
                :rowsPerPageOptions="[5, 10, 20]" :loading="loading"
                :globalFilterFields="['nombre', 'correo', 'estado']" filterDisplay="row" class="rounded-lg">
                <template #header>
                    <div class="flex justify-between">
                        <div class="flex flex-wrap items-center justify-start gap-2">
                            <span class="text-xl font-bold">Usuarios</span>
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
                <template #empty> No se encontraron usuarios. </template>
                <template #loading> Cargando usuarios, por favor espere. </template>
                <Column field="nombre" header="Nombre" sortable></Column>
                <Column field="correo" header="Correo" sortable></Column>
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
                <Column field="fechaRegistro" header="Fecha de Registro" sortable></Column>
                <Column field="rol" header="Rol" sortable></Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2" @click="showUser(slotProps.data)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUser(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteUser(slotProps.data)" />
                    </template>
                </Column>

                <template #footer> En total son: {{ usuarios ? usuarios.length : 0 }} usuarios. </template>
            </DataTable>
        </div>
    </main>
</template>

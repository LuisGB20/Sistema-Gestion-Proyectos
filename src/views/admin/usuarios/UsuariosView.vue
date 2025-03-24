<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import LinkComponent from '@/components/ui/LinkButton.vue';
import DataTable from '@/components/ui/DataTable.vue';

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
  <main class="p-4">

      <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Usuarios</h1>
          <LinkComponent to="" text="Crear" class="mt-2 sm:mt-0" />
      </div>

      <div class="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <DataTable
                class="min-w-[500px] sm:min-w-0 w-full table-auto"
                :columns="['nombre', 'correo', 'estado', 'fechaRegistro', 'rol']"
                :columnsEs="['Nombre', 'Correo', 'Estado', 'Fecha de registro', 'Rol']"
                :data="usuarios"
                @show-element="data => showUser(data)"
                @edit-element="data => editUser(data)"
                @confirm-delete="data => confirmDeleteUser(data)"
            />
        </div>

  </main>
</template>

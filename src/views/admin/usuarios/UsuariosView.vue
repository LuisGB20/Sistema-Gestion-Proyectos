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
import { GetEmployeeData } from '@/services/employees/EmployeeService.ts'
import DataTable from '@/components/ui/DataTable.vue';

const usuarios = ref();
const loading = ref(true);
const statuses = ref(['Activo', 'Inactivo', 'Pendiente']);
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

onMounted(async () => {

    await GetEmployeeData().then((res) => {
        usuarios.value = res.data;
    }).catch((error) => {
        console.error("Error en onMounted:", error);
    });

    console.log(usuarios.value)

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

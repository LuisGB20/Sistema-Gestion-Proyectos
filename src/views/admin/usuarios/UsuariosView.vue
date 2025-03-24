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
import { GetEmployeeData } from '@/services/employees/EmployeeService.ts'

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


      <div class="card bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <DataTable
              v-model:filters="filters"
              :value="usuarios"
              removableSort ref="dt" paginator :rows="5"
              :rowsPerPageOptions="[5, 10, 20]"
              :loading="loading"
              :globalFilterFields="['nombre', 'correo', 'estado']"
              filterDisplay="row"
              class="min-w-full">

              <template #header>
          <div class="flex justify-between">
            <div class="flex flex-wrap items-center justify-start gap-2">
              <span class="text-xl font-bold">Usuarios</span>
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

              <template #empty> No se encontraron usuarios. </template>
              <template #loading> Cargando usuarios, por favor espere. </template>

              <Column field="nombre" header="Nombre" sortable class="text-sm"></Column>
              <Column field="correo" header="Correo" sortable class="text-sm"></Column>

              <Column field="estado" header="Estado" :showFilterMenu="false" style="min-width: 12rem">
                  <template #body="{ data }"> {{ data.estado }} </template>
                  <template #filter="{ filterModel, filterCallback }">
                      <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses"
                          placeholder="Selecciona uno" style="min-width: 12rem" :showClear="true">
                          <template #option="slotProps"> {{ slotProps.option }} </template>
                      </Select>
                  </template>
              </Column>

              <Column field="fechaRegistro" header="Fecha de Registro" sortable class="text-sm"></Column>
              <Column field="rol" header="Rol" sortable class="text-sm"></Column>

              <Column :exportable="false" style="min-width: 12rem">
                  <template #body="slotProps">
                      <div class="flex gap-2">
                          <Button icon="pi pi-eye" outlined rounded class="" @click="showUser(slotProps.data)" />
                          <Button icon="pi pi-pencil" outlined rounded class="" @click="editUser(slotProps.data)" />
                          <Button icon="pi pi-trash" outlined rounded class="" @click="confirmDeleteUser(slotProps.data)" />
                      </div>
                  </template>
              </Column>

              <template #footer> En total son: {{ usuarios ? usuarios.length : 0 }} usuarios. </template>
          </DataTable>
      </div>
  </main>
</template>

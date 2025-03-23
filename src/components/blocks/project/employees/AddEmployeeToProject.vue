<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { ref, watch } from 'vue'
import FormModal from '@/components/forms/CreateForm.vue';
import * as yup from 'yup';
import {
  asignProjectToEmployee,
  getEmployeesWithoutProject
} from '@/services/employees/EmployeeService.ts'
import { useRoute } from 'vue-router'

const isOpen = ref(false);
const modalStore = useModalStore();
const route = useRoute();
const id : string = route.params.id.toString();

const fields = [
  {
    id: 'employee', label: 'Empleado', typeField: 'select', placeholder: 'Seleccione un empleado', options: []
  },
  {
    id: 'role', label: 'Rol', typeField: 'select', placeholder: 'Seleccione un rol', options: []
  },
];

const validationSchema = yup.object({
  employee: yup.string().required('Debe seleccionar un empleado')
});

const formData = ref({
  employee: '',
  role: '',
});

const fetchEmployees = async () => {
  const data = await getEmployeesWithoutProject();
  console.log("data", data)
  if (data.success) {
    fields[0].options = data.data.map((employee: any) => ({
      label: `${employee.name} ${employee.lastName}`,
      value: employee.id
    }));
  } else {
    console.error('Error al obtener empleados:', data);
  }
};

// Carga los empleados cuando se abre el modal
watch(() => {
  if (isOpen || modalStore.isCreateModalOpen) {
    fetchEmployees();
    formData.value = { name: '', description: '', employee: '' }; // Reset form
  }
});

const handleSubmit = async (values: any) => {
  console.log('Proyecto creado:', values);

  const res = await asignProjectToEmployee(values.employee, id, values.role ) // Envía el empleado
  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
};
</script>

<template>
  <i @click="isOpen = true; modalStore.isCreateModalOpen = true" class="rounded-full h-5 w-5 bg-blue-500 flex items-center justify-center text-white cursor-pointer">+</i>

  <div v-if="isOpen">
    <FormModal
      title="Agregar Empleado a Proyecto"
      :fields="fields"
      :validationSchema="validationSchema"
      :formData="formData"
      @submit="handleSubmit"
    />
  </div>
</template>


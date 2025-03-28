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
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const props = defineProps<{ fetchOnUpdate : () => void }>();

const isOpen1 = ref(false);
const modalStore = useModalStore();
const route = useRoute();
const id : string = route.params.id ? route.params.id.toString() : authStore.employee?.projectId;

const fields = [
  {
    id: 'employee', label: 'Empleado', typeField: 'select', placeholder: 'Seleccione un empleado', options: []
  }
];

const validationSchema = yup.object({
  employee: yup.string().required('Debe seleccionar un empleado')
});

const formData = ref({
  employee: ''
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
  if (isOpen1.value == true || modalStore.isCreateModalOpen) {
    fetchEmployees();
    formData.value = { name: '', description: '', employee: '' }; // Reset form
  }
});

const handleSubmit = async (values: any) => {
  console.log('Empleado creado:', values);

  const res = await asignProjectToEmployee(values.employee, id)
  console.log(res);

  isOpen1.value = false;
  modalStore.isCreateModalOpen = false;

  props.fetchOnUpdate();
}

watch(() => {
  if (!modalStore.isCreateModalOpen) {
    isOpen1.value = false;
  }
})

</script>

<template>

  <i @click="isOpen1= true; modalStore.isCreateModalOpen = true;" class=" rounded-full h-5 w-5 bg-DarkTeal flex items-center justify-center text-white cursor-pointer">+</i>

  <div class="absolute" v-if="isOpen1">
    <FormModal
      title="Agregar Empleado a Proyecto"
      :fields="fields"
      :validationSchema="validationSchema"
      :formData="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped></style>

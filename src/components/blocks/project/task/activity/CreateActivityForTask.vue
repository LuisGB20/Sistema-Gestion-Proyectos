<script setup lang="ts">
import { ref, watch } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import FormModal from '@/components/forms/CreateForm.vue';
import * as yup from 'yup';
import { CreateActivity } from '@/services/activities/ActivityService';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/formatDate.ts'

const isOpen = ref(false);
const modalStore = useModalStore();
const route = useRoute();
const taskId: string = route.params.idTarea ? route.params.idTarea.toString() : '';
const props = defineProps<{ employees: { id: string, name: string, lastName: string }[] }>();

const fields = [
  { id: 'name', label: 'Nombre de la Actividad', typeField: 'text', placeholder: 'Ingrese el nombre de la actividad' },
  { id: 'description', label: 'Descripción', typeField: 'textarea', placeholder: 'Ingrese la descripción de la actividad' },
  { id: 'employeeId', label: 'Empleado', typeField: 'select', placeholder: 'Seleccione un empleado', options: props.employees.map(employee => ({ label: `${employee.name} ${employee.lastName}`, value: employee.id })) }
];

const validationSchema = yup.object({
  name: yup.string().required('Debe ingresar el nombre de la actividad'),
  description: yup.string().required('Debe ingresar la descripción de la actividad'),
  employeeId: yup.string().required('Debe seleccionar un empleado').test('is-empty', 'No hay integrantes disponibles', value => props.employees.length > 0)
});

const formData = ref({
  name: '',
  description: '',
  employeeId: ''
});

const handleSubmit = async (values: any) => {
  console.log('Actividad creada:', values);

  const activityData = {
    name: values.name,
    description: values.description,
    status: values.status,
    employeeId: values.employeeId
  };

  const res = await CreateActivity(activityData.name, activityData.description, taskId, activityData.employeeId);

  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
};

watch(() => {
  if (isOpen.value || modalStore.isCreateModalOpen) {
    formData.value = { name: '', description: '', employeeId: '' }; // Reset form
  }
});

watch(() => {
  if (!modalStore.isCreateModalOpen) {
    isOpen.value = false;
  }
});
</script>

<template>
  <i @click="isOpen = true; modalStore.isCreateModalOpen = true" class="rounded-full bg-blue-400 px-3 flex items-center justify-center text-white cursor-pointer">
    <div class="text-white py-2 px-5" >
      <p class="font-semibold">Asignar Actividad</p>
    </div>
  </i>

  <div class="absolute" v-if="isOpen">
    <FormModal
      title="Crear Actividad"
      :fields="fields"
      :validationSchema="validationSchema"
      :formData="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped></style>

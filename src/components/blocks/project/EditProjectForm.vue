<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { ref, defineProps, watch } from 'vue'
import * as yup from 'yup';
import { GetProjectById, UpdateProject } from '@/services/projects/projectService';
import EditForm from '@/components/forms/EditForm.vue'

const props = defineProps<{ projectId: string }>();
const isOpen = ref(false);
const modalStore = useModalStore();

const fields = [
  { id: 'name', label: 'Nombre del Proyecto', typeField: 'text', placeholder: 'Ingrese el nombre' },
  { id: 'description', label: 'Descripción', typeField: 'textarea', placeholder: 'Ingrese una descripción' },
];

const validationSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
});

const formData = ref({ name: '', description: '' });

const fetchProjectData = async () => {
  if (!props.projectId) return;

  try {
    const response = await GetProjectById(props.projectId);
    if (response.success) {
      formData.value = { id:response.data.id, name: response.data.name, description: response.data.description };
    }
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
  }
};

// Carga los datos del proyecto solo cuando se abre el modal
watch(() => {
  if (isOpen || modalStore.isEditModalOpen) {
    fetchProjectData();
  }
});

const handleSubmit = async (values: { name: string; description: string }) => {
  console.log('Proyecto actualizado:', values);

  const res = await UpdateProject(props.projectId, null ,  values.name, values.description);
  console.log(res);

  modalStore.isEditModalOpen = false;
};
</script>

<template>

  <i @click="props.projectId ?isOpen = true : '' ; props.projectId ?  modalStore.isEditModalOpen = true : ''" class="pi cursor-pointer hover:text-gray-500 pi-pen-to-square text-CharcoalBlue ml-4"></i>
  <div v-if="isOpen">
    <EditForm
      v-if="modalStore.isEditModalOpen"
      title="Editar Proyecto"
      :fields="fields"
      :validationSchema="validationSchema"
      :formData="formData"
      @submit="handleSubmit"
    />
  </div>

</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue';
import * as yup from 'yup';
import { AssignEmployeeToTask } from '@/services/tasks/TaskService';
import { useModalStore } from '@/stores/modalStore';
import FormModal from '@/components/forms/CreateForm.vue';

const props = defineProps<{ taskId: string, projectMembers: { id: string, name: string }[],   fetchOnUpdate : () => void }>();

const isOpen = ref(false);
const modalStore = useModalStore();

const fields = [
  { id: 'employeeId', label: 'Integrante del Proyecto', typeField: 'select', placeholder: 'Seleccione un integrante', options: props.projectMembers.map(member => ({ label: member.name, value: member.id })) }
];

const validationSchema = yup.object({
  employeeId: yup.string().required('Debe seleccionar un integrante del proyecto')
});

const formData = ref({
  employeeId: ''
});

const handleSubmit = async (values: any) => {
  console.log('Asignación de tarea:', values);

  const res = await AssignEmployeeToTask(props.taskId, values.employeeId);
  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;

  props.fetchOnUpdate();
};
</script>

<template>
  <i @click="isOpen = true; modalStore.isCreateModalOpen = true" class="rounded-full h-5 w-5 bg-DarkTeal flex items-center justify-center text-white cursor-pointer">+</i>

  <div class="absolute" v-if="isOpen">
    <FormModal
      title="Asignar Integrante a Tarea"
      :fields="fields"
      :validationSchema="validationSchema"
      :formData="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.btn-submit {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>

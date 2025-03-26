<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { ref, watch, defineProps } from 'vue';
import { DeleteProject } from '@/services/projects/projectService';
import FormModal from '@/components/forms/CreateForm.vue';
import { useNotificationStore } from '@/stores/notificationsStore';

const modalStore = useModalStore();
const notificationStore = useNotificationStore();
const isOpen = ref(false);

const props = defineProps<{ project: string }>();

const handleSubmit = async () => {
  console.log('Proyecto eliminado:', props.project);

  const res = await DeleteProject(props.project);
  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
  notificationStore.showSuccess = true;
  notificationStore.message = 'Proyecto eliminado correctamente';
  notificationStore.showAlert();
};

watch(() => modalStore.isCreateModalOpen, (newVal) => {
  if (!newVal) isOpen.value = false;
});
</script>

<template>
  <button 
    @click="isOpen = true; modalStore.isCreateModalOpen = true"
    class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-sm rounded-lg transition-all duration-200"
  >
    Eliminar
  </button>

  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <FormModal 
      title="Eliminar Proyecto"
      :fields="[]" 
      :validationSchema="[]" 
      :formData="[]"
      @submit="handleSubmit" 
    />
  </div>
</template>

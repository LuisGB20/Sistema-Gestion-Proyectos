<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { ref, watch } from 'vue'
import FormModal from '@/components/forms/CreateForm.vue';
import * as yup from 'yup';
import { CreateProject } from '@/services/projects/projectService'
import Button from 'primevue/button'
import CustomLink from '@/components/ui/OpenCreateButton.vue'
import { getEmployeesWithoutProject } from '@/services/employees/EmployeeService.ts'
import { useNotificationStore } from '@/stores/notificationsStore';

const modalStore = useModalStore();
const isOpen = ref(false);

const fields = [
  {
    id: 'name', label: 'Nombre del Proyecto',
    typeField: 'text',
    placeholder: 'Ingrese el nombre'
  },
  {
    id: 'employee', label: 'Empleado', typeField: 'select', placeholder: 'Seleccione un empleado', options: []
  },
  {
    id: 'description',
    label: 'Descripción',
    typeField: 'textarea',
    placeholder: 'Ingrese una descripción'
  },
];


const fetchEmployees = async () => {
  const data = await getEmployeesWithoutProject();
  console.log("data", data)
  if (data.success) {
    fields[1].options = data.data.map((employee: any) => ({
      label: `${employee.name} ${employee.lastName}`,
      value: employee.id
    }));
  } else {
    console.error('Error al obtener empleados:', data);
  }
};

// Carga los empleados cuando se abre el modal
watch(() => {
  if ( modalStore.isCreateModalOpen) {
    fetchEmployees();
    formData.value = { name: '', description: '', employee: '' }; // Reset form
  }
});


const validationSchema = yup.object({
  employee: yup.string().required('Debe seleccionar un empleado'),
  name: yup.
    string().
    required('El nombre es obligatorio'),
  description: yup.
    string().
    required('La descripción es obligatoria'),
});

const formData = ref({
  name: '',
  description: ''
});

const emit = defineEmits(["submit"]);



const notificationStore = useNotificationStore()

const handleSubmit = async (values) => {
  console.log('Proyecto creado:', values);

  const res = await CreateProject(values.name, values.description, null , values.employee);
  console.log(res);

  isOpen.value = false;
  modalStore.isCreateModalOpen = false;
  notificationStore.showSuccess = true;
notificationStore.message = 'Proyecto creado correctamente'
notificationStore.showAlert();
emit("submit", values);
};

watch(() => {
  if (!modalStore.isCreateModalOpen) {
    isOpen.value = false;
  }
})

</script>

<template>


  <CustomLink @click="modalStore.isCreateModalOpen = true; isOpen = true;" texto="Crear Proyecto" />

  <div class="absolute" v-if="isOpen">
    <FormModal title="Crear Proyecto" :fields="fields" :validationSchema="validationSchema" :formData="formData"
               @submit="handleSubmit" />
  </div>
</template>

<style scoped></style>

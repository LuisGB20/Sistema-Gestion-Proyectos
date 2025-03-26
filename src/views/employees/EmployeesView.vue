<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import router from '@/router'
import {
  getEmployees,
  deleteEmployee,
  createEmployee,
  updateEmployee,
} from '@/services/employees/EmployeeService'
import { ConfirmDialog, Toast } from 'primevue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useNotificationStore } from '@/stores/notificationsStore'
import CreateForm from '@/components/forms/CreateForm.vue'
import OpenCreateButton from '@/components/ui/OpenCreateButton.vue'
import DataTable from '@/components/ui/DataTable.vue'
import EditForm from '@/components/forms/EditForm.vue'
import { useModalStore } from '@/stores/modalStore'
import type { createEmployeeModel, EmployeeModel } from '@/interfaces/employees/EmployeeModel'
import EmployeeModal from '@/components/blocks/employee/EmployeeModal.vue'
import { CreateEmployeeValidationSchema, EmployeeValidationSchema } from '@/validationSchemas/ValidationSchemas'

const employees = ref<EmployeeModel[]>([])
const employeeSelected = ref<EmployeeModel>({} as EmployeeModel);
const loading = ref(true)


const notificationStore = useNotificationStore()
const modalStore = useModalStore()

onMounted(async () => {
  const response = await getEmployees()
  console.log(response)
  employees.value = response.data
  loading.value = false
  notificationStore.showAlert()
})

const formDataCreate = ref<createEmployeeModel>({
  "email": "",
  "password": "",
  "confirmPassword": "",
  "name": "",
  "lastName": "",
  "age": 18,
  "sexo": 0,
  "curp": "",
  "rfc": "",
  "salary": ""
})

const formDataEdit = ref<EmployeeModel>({
  id: '',
  name: '',
  lastName: '',
  age: 0,
  sexo: 0,
  curp: '',
  rfc: '',
  salary: '',
})

const showEmployee = (data: EmployeeModel) => {
  employeeSelected.value = data;
  modalStore.isEmployeeDataModalOpen = true;
}

const addEmployee = async (data: createEmployeeModel) => {
  const dataToSend = {...data, sexo: Number(data.sexo)};
  const response = await createEmployee(toRaw(dataToSend))
  if (!response.success) {
    toast.add({
      severity: 'error',
      summary: 'Algo salió mal',
      detail: response.message,
      life: 3000,
    })
  } else {
    notificationStore.showSuccess = true
    notificationStore.message = 'Empleado creado con exito'
    notificationStore.showAlertSuccess()

    console.log(response)
    employees.value.push(response.data)
  }
}

const showEditModal = (data: EmployeeModel) => {
  modalStore.isEditModalOpen = true
  formDataEdit.value = data
}

const editEmployee = async (data: EmployeeModel) => {
  const response = await updateEmployee(data)
  console.log(response)
  if (!response.success) {
    toast.add({
      severity: 'error',
      summary: 'Algo salió mal',
      detail: response.message,
      life: 3000,
    })
  } else {
    notificationStore.showSuccess = true
    notificationStore.message = 'Empleado editado con exito'
    notificationStore.showAlertSuccess()
    modalStore.isEditModalOpen = false
    const employeeIndex = employees.value.findIndex((r) => r.id == data.id)
    employees.value.splice(employeeIndex, 1, response.data)
  }
}

const confirm = useConfirm()
const toast = useToast()

const confirmDelete = (data: EmployeeModel) => {
  confirm.require({
    message: '¿Quieres eliminar este registro?',
    header: `${data.name}`,
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: false,
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger',
    },
    accept: () => {
      confirmDeleteEmployee(data.id)
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Cancelado',
        detail: 'Haz cancelado la operación',
        life: 3000,
      })
    },
  })
}

const confirmDeleteEmployee = async (id: string) => {
  const response = await deleteEmployee(id)
  if (response.success) {
    toast.add({
      severity: 'success',
      summary: 'Eliminado',
      detail: 'Empleado eliminado',
      life: 3000,
    })
    const indexEmployee = employees.value.findIndex((r) => r.id == id)
    employees.value.splice(indexEmployee, 1)
  } else {
    toast.add({
      severity: 'error',
      summary: '¡Algo ha salido mal!',
      detail: `${response.message}`,
      life: 3000,
    })
  }
}
</script>

<template>
  <EmployeeModal :employee="employeeSelected" />

  <main class="p-6 sm:p-8">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
      <h1
        class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-3xl sm:text-4xl font-extrabold drop-shadow-md w-full sm:w-auto text-center sm:text-start">
        Empleados
      </h1>
      <div class="w-full max-w-[400px] sm:max-w-none">
        <OpenCreateButton class="w-full sm:w-auto md:ml-auto px-6 py-3 rounded-xl shadow-md" />
      </div>
    </div>

    <Toast />
    <ConfirmDialog />

    <div class="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white">
      <DataTable class="w-full table-auto" :columns="['name', 'lastName', 'age', 'salary']"
        :columnsEs="['Nombre', 'Apellidos', 'Edad', 'Salario']" :data="employees"
        @show-element="(data) => showEmployee(data)" @edit-element="(data) => showEditModal(data)"
        @confirm-delete="(data) => confirmDelete(data)" />
    </div>

    <!-- Formulario para crear empleados -->
    <CreateForm title="Crear empleado" @submit="(values) => addEmployee(values)" :fields="[
      { id: 'name', label: 'Nombre', typeField: 'text', placeholder: 'Escribe el nombre' },
      { id: 'lastName', label: 'Apellidos', typeField: 'text', placeholder: 'Escribe los apellidos' },
      { id: 'age', label: 'Edad', typeField: 'number', placeholder: '0' },
      {
        id: 'sexo', label: 'Sexo', typeField: 'select', placeholder: 'Selecciona el Sexo',
        options: [
          { label: 'No Especificado', value: 0 },
          { label: 'Masculino', value: 1 },
          { label: 'Femenino', value: 2 },
          { label: 'Otro', value: 3 },
        ]
      },
      { id: 'curp', label: 'CURP', typeField: 'text', placeholder: 'Escribe la CURP' },
      { id: 'rfc', label: 'RFC', typeField: 'text', placeholder: 'Escribe el RFC' },
      { id: 'salary', label: 'Salario', typeField: 'number', placeholder: '0' },
      { id: 'email', label: 'Correo Electrónico', typeField: 'text', placeholder: 'Escribe el correo electrónico' },
      { id: 'password', label: 'Contraseña', typeField: 'password', placeholder: 'Escribe la contraseña' },
      { id: 'confirmPassword', label: 'Confirmar contraseña', typeField: 'password', placeholder: 'Escribe de nuevo la contraseña para confirmar' }
    ]" :validationSchema="CreateEmployeeValidationSchema" :formData="formDataCreate" />

    <!-- Formulario para editar empleados -->
    <EditForm title="Editar empleado" @submit="(value) => editEmployee(value)" :fields="[
      { id: 'name', label: 'Nombre', typeField: 'text', placeholder: 'Escribe el nombre' },
      { id: 'lastName', label: 'Apellidos', typeField: 'text', placeholder: 'Escribe los apellidos' },
      { id: 'age', label: 'Edad', typeField: 'number', placeholder: '0' },
      {
        id: 'sexo', label: 'Sexo', typeField: 'select', placeholder: 'Selecciona el Sexo',
        options: [
          { label: 'No Especificado', value: 0 },
          { label: 'Masculino', value: 1 },
          { label: 'Femenino', value: 2 },
          { label: 'Otro', value: 3 },
        ]
      },
      { id: 'curp', label: 'CURP', typeField: 'text', placeholder: 'Escribe la CURP' },
      { id: 'rfc', label: 'RFC', typeField: 'text', placeholder: 'Escribe el RFC' },
      { id: 'salary', label: 'Salario', typeField: 'number', placeholder: '0' },
    ]" :validationSchema="EmployeeValidationSchema" :formData="formDataEdit" />
  </main>
</template>

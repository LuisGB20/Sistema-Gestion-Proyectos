<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import { ResourceValidationSchema } from '@/validationSchemas/ValidationSchemas'
import DataTable from '@/components/ui/DataTable.vue'
import EditForm from '@/components/forms/EditForm.vue'
import { useModalStore } from '@/stores/modalStore'
import type { EmployeeModel } from '@/interfaces/employees/EmployeeModel'

const employees = ref<EmployeeModel[]>([])
const loading = ref(true)

const notificationStore = useNotificationStore()
const modalStore = useModalStore()

onMounted(async () => {
  const response = await getEmployees()
  employees.value = response.data
  loading.value = false
  notificationStore.showAlert()
})

const formData = ref<EmployeeModel>({
  id: '',
  name: '',
  lastName: '',
  age: 0,
  sexo: 0,
  curp: '',
  rfc: '',
  createdAt: '',
  salary: '',
  isDeleted: false,
})

const showEmployee = (data: EmployeeModel) => {
  router.push(`/recursos-humanos/empleados/${data.id}`)
}

const addEmployee = async (data: EmployeeModel) => {
  const response = await createEmployee(data)
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
    employees.value.push(response.data)
  }
}

const showEditModal = (data: EmployeeModel) => {
  modalStore.isEditModalOpen = true
  formData.value = data
}

const editEmployee = async (data: EmployeeModel) => {
  const response = await updateEmployee(data)
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
  <main>
    <div class="flex justify-between mb-4">
      <h1
        class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-start text-3xl font-bold"
      >
        Empleados
      </h1>
      <OpenCreateButton />
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>

    <DataTable
      :columns="['name', 'description', 'quantity']"
      :columnsEs="['Nombre', 'Descripción', 'Cantidad']"
      :data="employees"
      @show-element="(data) => showEmployee(data)"
      @edit-element="(data) => showEditModal(data)"
      @confirm-delete="(data) => confirmDelete(data)"
    />

    <CreateForm
      title="Crear empleado"
      @submit="(values) => addEmployee(values)"
      :fields="[
        { id: 'name', label: 'Nombre', typeField: 'text', placeholder: 'Escribe el nombre' },
        {
          id: 'lastName',
          label: 'Apellidos',
          typeField: 'text',
          placeholder: 'Escribe los apellidos',
        },
        { id: 'age', label: 'Edad', typeField: 'number', placeholder: '0' },
        { id: 'sexo', label: 'Sexo', typeField: 'text', placeholder: 'Hombre/Mujer' },
        { id: 'curp', label: 'CURP', typeField: 'text', placeholder: 'Escribe la CURP' },
        { id: 'rfc', label: 'RFC', typeField: 'text', placeholder: 'Escribe el RFC' },
        {
          id: 'createdAt',
          label: 'Fecha de creación',
          typeField: 'text',
          placeholder: 'Escribe la fecha de creación',
        },
        { id: 'salary', label: 'Salario', typeField: 'text', placeholder: 'Escribe el salario' },
      ]"
      :validationSchema="ResourceValidationSchema"
      :formData="formData"
    />

    <EditForm
      title="Editar recurso"
      @submit="(value) => editEmployee(value)"
      :fields="[
        { id: 'name', label: 'Nombre', typeField: 'text', placeholder: 'Escribe el nombre' },
        {
          id: 'lastName',
          label: 'Apellidos',
          typeField: 'text',
          placeholder: 'Escribe los apellidos',
        },
        { id: 'age', label: 'Edad', typeField: 'number', placeholder: '0' },
        { id: 'sexo', label: 'Sexo', typeField: 'text', placeholder: 'Hombre/Mujer' },
        { id: 'curp', label: 'CURP', typeField: 'text', placeholder: 'Escribe la CURP' },
        { id: 'rfc', label: 'RFC', typeField: 'text', placeholder: 'Escribe el RFC' },
        {
          id: 'createdAt',
          label: 'Fecha de creación',
          typeField: 'text',
          placeholder: 'Escribe la fecha de creación',
        },
        { id: 'salary', label: 'Salario', typeField: 'text', placeholder: 'Escribe el salario' },
      ]"
      :validationSchema="ResourceValidationSchema"
      :formData="formData"
    />
  </main>
</template>

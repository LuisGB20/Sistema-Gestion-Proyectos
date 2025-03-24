<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createResource, deleteResource, getResources, updateResource } from '@/services/resources/recursosService';
import router from '@/router';
import { ConfirmDialog, Toast } from 'primevue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import type { ResourceModel } from '@/interfaces/resources/ResourceModel';
import CreateForm from '@/components/forms/CreateForm.vue';
import OpenCreateButton from '@/components/ui/OpenCreateButton.vue';
import { ResourceValidationSchema } from '@/validationSchemas/ValidationSchemas';
import DataTable from '@/components/ui/DataTable.vue';
import EditForm from '@/components/forms/EditForm.vue';
import { useModalStore } from '@/stores/modalStore';

const resources = ref<ResourceModel[]>([]);
const loading = ref(true);
const modalStore = useModalStore();


onMounted(async () => {
    const response = await getResources();
    resources.value = response.data;
    loading.value = false;
});




const formData = ref<ResourceModel>({
    id: '',
    name: '',
    description: '',
    quantity: 0
});

const showResource = (data: ResourceModel) => {
    router.push(`/sistemas/recursos/${data.id}`);
};

const addResource = async (data: ResourceModel) => {
    const response = await createResource(data);
    console.log(response)
    if (!response.success) {
        toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Recurso agregado con exito', life: 3000 });
        resources.value.push(response.data)
    }
};


const showEditModal = (data: ResourceModel) => {
    modalStore.isEditModalOpen = true;
    formData.value = data;
}


const editResource = async (data: ResourceModel) => {
    const response = await updateResource(data);
    if (!response.success) {
        toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Recurso editado con exito', life: 3000 });
        modalStore.isEditModalOpen = false;
        const resourceIndex = resources.value.findIndex(r => r.id == data.id);
        resources.value.splice(resourceIndex, 1, response.data);
    }
};



const confirm = useConfirm();
const toast = useToast();

const confirmDelete = (data: ResourceModel) => {
    confirm.require({
        message: '¿Quieres eliminar este registro?',
        header: `${data.name}`,
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: false
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'danger'
        },
        accept: () => {
            confirmDeleteResource(data.id)
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Haz cancelado la operación', life: 3000 });
        }
    });
};

const confirmDeleteResource = async (id: string) => {
    console.log("Eliminar recurso", id);
    const response = await deleteResource(id);
    if (response.success) {
        toast.add({ severity: 'success', summary: 'Operación Exitosa', detail: 'Recurso eliminado', life: 3000 });
        const indexResource = resources.value.findIndex(r => r.id == id);
        resources.value.splice(indexResource, 1);
    } else {
        toast.add({ severity: 'error', summary: '¡Algo ha salido mal!', detail: `${response.message}`, life: 3000 });
    }
};
</script>

<template>
    <main class="p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
            <h1
                class="text-transparent bg-clip-text bg-gradient-to-b from-DarkTeal to-CharcoalBlue text-3xl sm:text-4xl font-extrabold drop-shadow-md w-full sm:w-auto text-center sm:text-start">
                Recursos
            </h1>
            <div class="w-full max-w-[400px] sm:max-w-none">
                <OpenCreateButton class="w-full sm:w-auto md:ml-auto px-6 py-3 rounded-xl shadow-md" />
            </div>
        </div>

        <ConfirmDialog />

        <div class="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white">
            <DataTable 
                class="w-full table-auto"
                :columns="['name', 'description', 'quantity']" 
                :columnsEs="['Nombre', 'Descripción', 'Cantidad']"
                :data="resources" 
                @show-element="data => showResource(data)" 
                @edit-element="data => showEditModal(data)"
                @confirm-delete="data => confirmDelete(data)" 
            />
        </div>

        <!-- Formulario para crear recursos -->
        <CreateForm 
            title="Crear recurso" 
            @submit="values => addResource(values)" 
            :fields="[ 
                { id: 'name', label: 'Nombre', typeField: 'text', placeholder: 'Escribe el nombre' }, 
                { id: 'description', label: 'Descripción', typeField: 'textarea', placeholder: 'Descripción del recurso' }, 
                { id: 'quantity', label: 'Cantidad', typeField: 'number', placeholder: '0' }
            ]" 
            :validationSchema="ResourceValidationSchema" 
            :formData="formData" 
        />

        <!-- Formulario para editar recursos -->
        <EditForm 
            title="Editar recurso" 
            @submit="value => editResource(value)" 
            :fields="[ 
                { id: 'name', label: 'Nombre', typeField: 'text', placeholder: 'Escribe el nombre' }, 
                { id: 'description', label: 'Descripción', typeField: 'textarea', placeholder: 'Descripción del recurso' }, 
                { id: 'quantity', label: 'Cantidad', typeField: 'number', placeholder: '0' }
            ]" 
            :validationSchema="ResourceValidationSchema" 
            :formData="formData" 
        />
    </main>
</template>
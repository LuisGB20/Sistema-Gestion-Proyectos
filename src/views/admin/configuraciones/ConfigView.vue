<script setup lang="ts">
import EditForm from '@/components/forms/EditForm.vue';
import { useModalStore } from '@/stores/modalStore';
import { ConfigValidationSchema } from '@/validationSchemas/ValidationSchemas';
import { onMounted, ref } from 'vue';

const modalStore = useModalStore();
const settingName = ref('');
const dataConfig = ref();

const formData = ref({
    config: ''
})

const settings = ref([
    {
        service: 'discord',
        title: "Configuración de Discord",
        description: "Configura el enlace del webhook al que se enviarán los mensajes del canal",
        icon: "pi pi-discord",
    },
    {
        service: 'correo',
        title: "Configuración de Correo",
        description: "Configura el correo al que se enviarán los mensajes",
        icon: "pi pi-envelope",
    },
    {
        service: 'slack',
        title: "Configuración de Slack",
        description: "Configura el canal de Slack al que se enviarán las notificaciones",
        icon: "pi pi-slack",
    }
]);

onMounted(() => {
    dataConfig.value = {
        discord: "https://discord.com/api/webhooks/1234567890/abcde12345",
        correo: "smtp://correo.ejemplo.com:587?user=admin@ejemplo.com",
        slack: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
    };
})

const showSettingsModal = (setting: string, service: string) => {
    settingName.value = setting;
    formData.value = { config: dataConfig.value[service] }
    modalStore.isEditModalOpen = true
}

const handleChangeConfig = (values: object) => {
console.log(values)
}

</script>

<template>
    <main class="min-h-screen flex flex-col items-center p-10">
        <h1 class="text-4xl font-bold text-gray-800 my-12">Configuraciones</h1>

        <div class="w-full max-w-5xl space-y-6">
            <div v-for="setting in settings" :key="setting.title"
                class="relative group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="flex items-center space-x-6">

                    <div class="p-3 w-14 bg-LightGray rounded-full flex items-center justify-center">
                        <i :class="setting.icon" class="text-Gunmetal" style="font-size: 1.5rem;"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold text-Gunmetal">{{ setting.title }}</h2>
                        <p class="text-gray-600 mt-1">{{ setting.description }}</p>
                    </div>
                </div>

                <button @click="showSettingsModal(setting.title, setting.service)"
                    class="absolute top-8 right-8 py-2 px-5 text-sm font-medium rounded-full border border-DarkTeal text-DarkTeal bg-white 
                    transition duration-300 hover:bg-DarkTeal hover:text-white hover:shadow-md flex items-center space-x-2">
                    <span>Configurar</span>
                    <i class="pi pi-arrow-right text-xs"></i>
                </button>
            </div>
        </div>

        <EditForm title="Modificación de configuración" 
        :fields="[
            { id: 'config', label: `${settingName}`, typeField: 'text', placeholder: 'Indica la configuración del servicio' },
        ]" 
        :validation-schema="ConfigValidationSchema" 
        :form-data="formData" 
        @submit="values => handleChangeConfig(values)"/>

    </main>
</template>
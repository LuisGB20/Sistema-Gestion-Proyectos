<script setup lang="ts">
import EditForm from "@/components/forms/EditForm.vue";
import { useModalStore } from "@/stores/modalStore";
import { ConfigValidationSchema, DiscordValidationSchema, SlackValidationSchema, SMTPConfigValidationSchema } from "@/validationSchemas/ValidationSchemas";
import { onMounted, ref } from "vue";
import {
  GetConfiguration,
  UpdateConfiguration,
} from "@/services/admin/configuration/configurationService";
import type { ResponseHelper } from "@/interfaces/helpers/ResponseHelper";
import { useToast } from 'primevue/usetoast';

const modalStore = useModalStore();
const settingName = ref("");
const currentService = ref("");
const dataConfig = ref<Record<string, string>>({});
const toast = useToast();

const settings = ref([
  {
    service: "discord-token",
    title: "Configuración de Discord",
    description:
      "Configura el enlace del webhook al que se enviarán los mensajes del canal",
    icon: "pi pi-discord",
  },
  {
    service: "email",
    title: "Configuración de Correo",
    description: "Configura el correo al que se enviarán los mensajes",
    icon: "pi pi-envelope",
  },
  {
    service: "slack-token",
    title: "Configuración de Slack",
    description: "Configura el canal de Slack al que se enviarán las notificaciones",
    icon: "pi pi-slack",
  },
]);

const fetchConfigurations = async () => {
  for (const setting of settings.value) {
    const response: ResponseHelper<string> = await GetConfiguration(setting.service);
    if (response.success) {
      dataConfig.value[setting.service] = response.data;
    } else {
      console.error(`Error al obtener ${setting.service}:`, response.message);
    }

  }


};

onMounted(async () => {
  await fetchConfigurations();
});

const showSettingsModal = (setting: string, service: string) => {
  settingName.value = setting;
  currentService.value = service;
  modalStore.isEditModalOpen = true;
};

const handleChangeConfig = async (values: { config: string }) => {
  if (!currentService.value) return;

  const response: ResponseHelper<string> = await UpdateConfiguration(
    currentService.value,
    values.config
  );
  if (response.success) {
    dataConfig.value[currentService.value] = values.config;
    modalStore.isEditModalOpen = false;
    toast.add({ severity: 'success', summary: '¡Exito!', detail: 'Configuración actualizada correctamente', life: 3000 });

  } else {
    toast.add({ severity: 'error', summary: 'Algo salió mal', detail: response?.message, life: 3000 });

  }
};

const currentValidationSchema = (current: string) => {

  if (current === "discord-token") {
    console.log("s  as")
    return DiscordValidationSchema;
  } else if (current === "email") {
    return SMTPConfigValidationSchema;
  } else if (current === "slack-token") {
    return SlackValidationSchema;
  } else {
    console.log("sas")
    return ConfigValidationSchema;
  }

};

</script>

<template>
  <main class="min-h-screen flex flex-col items-center p-10">
    <h1 class="text-4xl font-bold text-gray-800 my-12">Configuraciones</h1>

    <div class="w-full max-w-5xl space-y-6">
      <div
        v-for="setting in settings"
        :key="setting.title"
        class="relative group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      >
        <div class="flex items-center space-x-6">
          <div
            class="p-3 w-14 bg-LightGray rounded-full flex items-center justify-center"
          >
            <i :class="setting.icon" class="text-Gunmetal" style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-Gunmetal">{{ setting.title }}</h2>
            <p class="text-gray-600 mt-1">{{ setting.description }}</p>
          </div>
        </div>

        <button
          @click="showSettingsModal(setting.title, setting.service)"
          class="absolute top-8 right-8 py-2 px-5 text-sm font-medium rounded-full border border-DarkTeal text-DarkTeal bg-white transition duration-300 hover:bg-DarkTeal hover:text-white hover:shadow-md flex items-center space-x-2"
        >
          <span>Configurar</span>
          <i class="pi pi-arrow-right text-xs"></i>
        </button>
      </div>
    </div>

    <EditForm
      title="Modificación de configuración"
      :fields="[
        {
          id: 'config',
          label: `${settingName}`,
          typeField: 'text',
          placeholder: 'Indica la configuración del servicio',
        },
      ]"
      :key="currentService"
      :validation-schema="currentValidationSchema(currentService)"
      :form-data="{ config: dataConfig[currentService] }"
      @submit="(values) => handleChangeConfig(values)"
    />
  </main>
</template>

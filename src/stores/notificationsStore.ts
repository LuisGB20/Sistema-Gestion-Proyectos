import { ref, computed, watch, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast';

export const useNotificationStore = defineStore('notification', () => {
    const showSuccess = ref(false);
    const showError = ref(false);
    const showConfirm = ref(false);

    const message = ref('');
    
    const toast = useToast();

    const showAlertSuccess = (message: string) => {
      toast.add({ severity: 'error', summary: 'Algo salió mal', detail: message, life: 3000 });
        
    }

    const showAlertError = (mensaje: string) => {
      
    }

    const showAlertConfirm = (mensaje: string) => {
   
  }

  const alertaDeConfirmacionEliminacionCancelada = () => {
    mostrarConfirmacionEliminacion.value = false;
      mensajeConfirmacion.value = '';
  }

  return {alertaDeConfirmacion, alertaDeConfirmacionError, mostrarConfirmacion, mostrarConfirmacionError, mensajeConfirmacion, alertaDeConfirmacionEliminacion, alertaDeConfirmacionEliminacionCancelada, mostrarConfirmacionEliminacion}
})

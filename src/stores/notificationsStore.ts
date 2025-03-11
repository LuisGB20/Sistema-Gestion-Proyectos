import { ref, computed, watch, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast';

export const useNotificationStore = defineStore('notification', () => {
    const showSuccess = ref(false);
    const showError = ref(false);

    const message = ref('');
    
    const toast = useToast();

    const showAlertSuccess = () => {
      toast.add({ severity: 'success', summary: 'Operación Exitosa', detail: message.value, life: 3000 });
    }

    const showAlertError = () => {
      toast.add({ severity: 'error', summary: 'Error en la Operación', detail: message.value, life: 3000 });
    }

    const showAlert = () => {
      if(showSuccess.value){
        showAlertSuccess();
      } 

      if(showError.value) {
        showAlertError();
      }

      showSuccess.value = false;
      showError.value = false;
      message.value = '';
      
    }

  return {showSuccess, showError, message, showAlertSuccess, showAlertError, showAlert}
})

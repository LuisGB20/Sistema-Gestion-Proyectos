import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logService } from '@/services/logRequests/logService'
import type { User } from '@/interfaces/User'
import { LoginService, LogoutService, ValidateSession } from '@/services/auth/authService'
import router from '@/router'
import { useToast } from 'primevue'

export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | null>(null)
  const isInitialized = ref(false)
  const toast = useToast();

  const isLoggedIn = computed(() => {
    return !!user.value?.id
  })

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      if (response.success) {
        const getSession = await ValidateSession()
        if (getSession.success) {
          user.value = getSession.data
        }
      }

      return response;

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
      await logService.log('error', errorMessage, { error, email });
    }
  }

  async function logout() {
    try {
      const response = await LogoutService()

      if (response.success) {
        user.value = {} as User
        toast.add({ severity: 'success', summary: '¡Nos vemos pronto!', detail: 'Has cerrado sesión correctamente.', life: 3000 });
        router.push('/');
      }
    } catch (error: unknown) {
      const errorMessage = 'error during logout'
      await logService.log('error', errorMessage, { error })
    }
  }

  async function validateSession() {
    try {
      const response = await ValidateSession();

      if (response.success) {
        user.value = response.data;
        return true
      }
      return false
    } catch (error: unknown) {
      return error
    } finally {
      isInitialized.value = true
    }
  }

  async function initialize() {
    if (!isInitialized.value) {
      await validateSession()
    }
  }

  return { login, logout, isLoggedIn, user, validateSession, initialize }
})

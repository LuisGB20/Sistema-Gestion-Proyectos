import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logService } from '@/services/logService'
import type { User } from '@/interfaces/User'
import { LoginService, LogoutService, ValidateSession } from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | null>(null)
  const isInitialized = ref(false)

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

        router.push('/');
      }
    } catch (error: unknown) {
      const errorMessage = 'Error during logout'
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

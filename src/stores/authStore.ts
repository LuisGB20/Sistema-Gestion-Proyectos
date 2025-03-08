import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logService } from '@/Services/logService'
import type { Usuario } from '@/Interfaces/Usuario'
import { LoginService, LogoutService, RegisterService } from '@/Services/authService'


export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as Usuario)
  const token = ref('')
  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      console.log(response)
      if (response) {
        user.value = response
        console.log(user.value)
        token.value = user.value.token
        localStorage.setItem('token', token.value);
        return response;
      }
    } catch (error: any) {
      const errorMessage = 'Error during login'
      console.error(errorMessage, error)
      await logService.log('error', errorMessage, { error, email })
      return error;
    }
  }

  async function register(email: string, password: string) {
    try {
      const response = await RegisterService(email, password)
      if (response) {
        user.value = response
        token.value = user.value.token
        localStorage.setItem('token', token.value);
      }
    } catch (error: any) {
      const errorMessage = 'Error during registration'
      console.error(errorMessage, error)
      await logService.log('error', errorMessage, { error, email })
    }
  }

  async function logout() {
    try {
      const response = await LogoutService(token.value)
      console.log(response)
      if (response) {
        user.value = {} as Usuario
        token.value = ''
        localStorage.removeItem('token');
      }
    } catch (error: any) {
      const errorMessage = 'Error during logout'
      console.error(errorMessage, error)
      await logService.log('error', errorMessage, { error })
    }
  }

  return { login, register, logout, isLoggedIn, token, user }
})
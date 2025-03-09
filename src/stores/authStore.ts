import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logService } from '@/services/logService'
import type { User } from '@/Interfaces/User'
import { LoginService, RegisterService } from '@/services/authService'


export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as User)
  const token = ref('')
  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      console.log(response)
      if (response) {
        user.value = response.data.user
        token.value = response.data.token
        localStorage.setItem('token', token.value);
        return response;
      }
    } catch (error: any) {
      const errorMessage = 'Error during login'
      console.error(errorMessage, error)
      // await logService.log('error', errorMessage, { error, email })
      return error;
    }
  }

  async function register(email: string, password: string, ConfirmPassword: string) {
    try {
      const response = await RegisterService(email, password, ConfirmPassword)
      if (response) {
        user.value = response.data.user
        token.value = response.data.token
        localStorage.setItem('token', token.value);
      }
    } catch (error: any) {
      const errorMessage = 'Error during registration'
      console.error(errorMessage, error)
      // await logService.log('error', errorMessage, { error, email })
    }
  }

  // async function logout() {
  //   try {
  //     const response = await LogoutService(token.value)
  //     console.log(response)
  //     if (response) {
  //       user.value = {} as Usuario
  //       token.value = ''
  //       localStorage.removeItem('token');
  //     }
  //   } catch (error: any) {
  //     const errorMessage = 'Error during logout'
  //     console.error(errorMessage, error)
  //     await logService.log('error', errorMessage, { error })
  //   }
  // }

  return { login, register, isLoggedIn, token, user }
})
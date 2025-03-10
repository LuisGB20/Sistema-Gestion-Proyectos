import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { logService } from '@/services/logService'
import type { User } from '@/Interfaces/User'
import { LoginService, RegisterService } from '@/services/authService'


export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as User)
  const token = ref('')
  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

  onMounted(() => {
    const tokenLs = localStorage.getItem('token') || '';
    if (tokenLs !== '' && tokenLs !== null) {
      token.value = tokenLs
    };
  })

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      if (response.success) {
        user.value = response.data.user
        token.value = response.data.token
        localStorage.setItem('token', token.value);
        localStorage.setItem('user', JSON.stringify(user.value));
      }
      return response;
    } catch (error: any) {
      const errorMessage = 'Error during login'
      console.error(errorMessage, error)
      await logService.log('error', errorMessage, { error, email })
      return error;
    }
  }

  async function register(email: string, password: string, ConfirmPassword: string) {
    try {
      const response = await RegisterService(email, password, ConfirmPassword)
      if (response.success) {
        // user.value = response.data.user
        // token.value = response.data.token
        // localStorage.setItem('token', token.value);
        // localStorage.setItem('user', JSON.stringify(user.value));
        return response;
      }
    } catch (error: any) {
      const errorMessage = 'Error during registration'
      await logService.log('error', errorMessage, { error, email })
      return error;
    }
  }

  async function logout() {
    try {
      // const response = await LogoutService(token.value)
      user.value = {} as User
      token.value = ''
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // if (response) {
      //   user.value = {} as Usuario
      //   token.value = ''
      //   localStorage.removeItem('token');
      // }
    } catch (error: any) {
      const errorMessage = 'Error during logout'
      console.error(errorMessage, error)
      await logService.log('error', errorMessage, { error })
    }
  }

  return { login, register, logout, isLoggedIn, token, user }
})
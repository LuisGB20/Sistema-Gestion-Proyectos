import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'
import { LoginService, LogoutService, ValidateSession } from '@/services/auth/authService'
import router from '@/router'
import { useToast } from 'primevue'
import type { EmployeeModel } from '@/interfaces/employees/EmployeeModel'
import { GetEmployeeData } from '@/services/employees/EmployeeService'

export const useAuthStore = defineStore('auth', () => {
  const employee = ref<EmployeeModel | null>(null);
  const user = ref<User | null>(null)
  const isInitialized = ref(false)
  const toast = useToast();
  const isLoading = ref(true);

  const isLoggedIn = computed(() => {
    return !!user.value?.id
  })

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      if (response.success) {
        const getSession = await ValidateSession()
        if (getSession.success) {
          if (getSession.data.rol == 'Empleado') {
            const getEmployeeData = await GetEmployeeData(getSession.data.id);
            employee.value = getEmployeeData.data;
          }
          user.value = getSession.data
          isLoading.value = false;
        }
      }

      return response;

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
      console.error(errorMessage)
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
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
      console.error(errorMessage)
    }
  }

  async function validateSession() {
    try {
      const response = await ValidateSession();
      if (response.success) {
        user.value = response.data;
        if (response.data.rol == 'Empleado') {
          const getEmployeeData = await GetEmployeeData(response.data.id);
          employee.value = getEmployeeData.data;
        }
        isLoading.value = false;
        return true
      }
      user.value = {} as User
      isLoading.value = false
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

  async function getIsLoggedIn(): Promise<boolean> {
    while (!isInitialized.value) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return isLoggedIn.value;
  }
  

  return { login, logout, isLoggedIn, user, validateSession, initialize, employee, isLoading, isInitialized, getIsLoggedIn }
})

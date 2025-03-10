import type { User } from "@/Interfaces/User";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

// Creación de una instancia de Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL ?? 'https://localhost:7044/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de solicitud para agregar el token
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// Interceptor de respuesta para manejar errores globales y respuestas especiales
api.interceptors.response.use(
    (response) => {
        console.log(response)

        if(!response.data.success){
            return {
                success: false,
                message: response.data.message,
                status: response.status
            }
        }

        // Verificar si la respuesta es de autenticación
        if (response.config.url.includes('Auth')) {
            const token = response.data.token || null;
            const user: User  = response.data.user || null;

            // Retornar los datos de la respuesta
            return {
                success: true,
                message: "Autenticación exitosa",
                data: { token, user },
            };
        }

        return {
            success: true,
            message: response.message,
            data: response.data,
        };
    },
    (error) => {
        const authStore = useAuthStore();
        if (error.response.status === 401) {
            const errorCode = error.response.data.error;
    
            if (errorCode === 'token_expired') {
              // Si el error es de token expirado
              console.log('Token expirado');
              
              authStore.logout();
              router.push('/iniciar-sesion'); // Redirigir al login
            } else if (errorCode === 'forbidden') {
              // Si el error es de falta de permisos
              console.log('No autorizado para esta ruta');
              
              // Mostrar mensaje o redirigir a una página de error o acceso denegado
              router.push('/acceso-denegado'); // Redirigir a una página de error
            }
        }
        return Promise.reject(error);
    }
);

export default api;

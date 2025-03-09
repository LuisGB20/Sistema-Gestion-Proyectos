import type { User } from "@/Interfaces/User";
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
        // Verificar si la respuesta es de autenticación
        if (response.config.url.includes('/Auth')) {
            const token = response.token;
            const user: User  = response.user;

            // Retornar los datos de la respuesta
            return {
                success: true,
                message: "Autenticación exitosa",
                data: { token, user },
            };
        }

        // Respuestas estándar (no de autenticación)
        return {
            success: true,
            message: response.message,
            data: response.data,
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

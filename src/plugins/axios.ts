import router from "@/router";
import { RefreshTokenService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL ?? 'https://localhost:7044/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedRequestsQueue: Array<() => void> = [];

api.defaults.withCredentials = true;

api.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
    (response) => {

        if(!response.data.success){
            return { success: false, message: response.data.message, status: response.status }
        }

        if (response.config?.url?.includes('Auth')) {

            const responseAuth = {
              success: true,
              message: "Autenticación exitosa",
              data: { user: response.data.user }
            }

            return { success: true, message: "Autenticación exitosa", data: responseAuth
            };
        }

        return { success: true, message: response.data.message, data: response.data,
        };
    },
    async (error) => {

      const authStore = useAuthStore();
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
              return new Promise((resolve) => {
                  failedRequestsQueue.push(() => {
                      resolve(api(originalRequest));
                  });
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
              const refresh = await RefreshTokenService();

              if (!refresh.success) {
                  authStore.logout();
                  router.push('/iniciar-sesion');
                  return Promise.reject(error);
              }

              failedRequestsQueue.forEach(callback => callback());
              failedRequestsQueue = [];
              return api(originalRequest);
          } catch (refreshError) {
              failedRequestsQueue = [];
              authStore.logout();
              router.push('/iniciar-sesion');
              return Promise.reject(refreshError);
          } finally {
              isRefreshing = false;
          }
      }
        return Promise.reject(error);

    }
);

export default api;

import router from "@/router";
import { RefreshTokenService } from "@/Services/authService";
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

      return {
        success: response.data.success,
        message: response.data.message,
        ...(response.data.success ? { data: response.data.data } : { status: response.status })
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

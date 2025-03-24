import type { LogModel } from "@/interfaces/logs/LogModel";
import { AuditLogLevel, HttpMethod } from "@/interfaces/logs/Logs";
import router from "@/router";
import { RefreshTokenService } from "@/services/auth/authService";
import { CreateLog } from "@/services/logRequests/logService";
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
      const authStore = useAuthStore();

      const axiosMethod = response.config.method?.toUpperCase();

      const httpMethodValue: HttpMethod = (axiosMethod && HttpMethod[axiosMethod as keyof typeof HttpMethod]) || HttpMethod.GET;

      const logData: LogModel = {

        message: response.data.message,
        httpMethod: httpMethodValue,
        endpoint: response.config.url || '',
        level: response.data.success ? AuditLogLevel.SUCCESS : AuditLogLevel.ERROR,
        userId: authStore.user?.id,
        timeStamp: new Date(),
      };

      CreateLog(logData);

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

            if(!authStore.isInitialized){
                return Promise.reject();
            }

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

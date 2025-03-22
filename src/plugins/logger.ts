import axios from 'axios'

const loggerApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL ?? 'https://localhost:7044/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

loggerApi.defaults.withCredentials = true

loggerApi.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  (response) => {
    return {
      success: response.data.success,
      message: response.data.message,
      ...(response.data.success ? { data: response.data.data } : { status: response.status }),
    }
  },

  (error) => {
    return {
      success: false,
      message: 'error desconocido',
      data: error,
    }
  },
)

export default loggerApi

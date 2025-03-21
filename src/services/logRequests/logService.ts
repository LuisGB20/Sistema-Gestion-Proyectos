class LogService {
  private static instance: LogService
  private baseUrl: string

  private constructor() {
    this.baseUrl = import.meta.env.VITE_LOG_ENDPOINT_API ?? 'https://localhost:7044/logs'
  }

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService()
    }
    return LogService.instance
  }

  public async log(level: 'error' | 'warning', message: string, details: any) {
    try {
      console.log(level, message, details)
      // await axios.post(this.baseUrl, {
      //   level,
      //   message,
      //   details,
      //   timestamp: new Date().toISOString(),
      // })
    } catch (error) {
      console.error('Falló loguear el error:', error)
    }
  }
}

export const logService = LogService.getInstance()
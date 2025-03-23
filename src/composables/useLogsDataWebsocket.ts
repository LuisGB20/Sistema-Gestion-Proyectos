import { useWebSocket } from '@/services/websocket/websocketService';
import type { ResponseHelperArray } from '@/interfaces/helpers/ResponseHelperArray';
import type { LogModelWithUserEmail } from '@/interfaces/logs/LogModel';

export const useLogsDataWebSocket = () => {
  const ws = useWebSocket('getLogs'); 

  const setupLogsDataListeners = (handlers: {
    onDataUpdate?: (data: ResponseHelperArray<LogModelWithUserEmail>) => void;
    onError?: (error: unknown) => void;
  }) => {
    if (handlers.onDataUpdate) {
      ws.on('message', handlers.onDataUpdate);
    }

    if (handlers.onError) {
      ws.on('error', handlers.onError);
    }
  };

  const cleanupLogsDataListeners = (handlers: {
    onDataUpdate?: (data: ResponseHelperArray<LogModelWithUserEmail>) => void;
    onError?: (error: unknown) => void;
  }) => {
    if (handlers.onDataUpdate) {
      ws.off('message', handlers.onDataUpdate);
    }

    if (handlers.onError) {
      ws.off('error', handlers.onError);
    }
  };

  const requestLogs = (params: {
    offset: number;
    pageSize: number;
    level?: string;
    httpMethod?: string
  }) => {
    ws.send(params);
  };

  return {
    setupLogsDataListeners,
    cleanupLogsDataListeners,
    requestLogs,
    close: ws.close
  };
};

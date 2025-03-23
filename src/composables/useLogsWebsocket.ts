import { useWebSocket } from '@/services/websocket/websocketService';
import type { CountLogsTypes } from '@/interfaces/logs/CountLogsParams';
import type { ResponseHelper } from '@/interfaces/helpers/ResponseHelper';

export const useLogsWebSocket = () => {
  const ws = useWebSocket('getLogsCount');

  const setupLogsListeners = (handlers: {
    onUpdate?: (data: ResponseHelper<CountLogsTypes>) => void;
    onError?: (error: unknown) => void;
  }) => {
    if (handlers.onUpdate) {
      ws.on('message', handlers.onUpdate);
    }

    if (handlers.onError) {
      ws.on('error', handlers.onError);
    }
  };

  const cleanupLogsListeners = (handlers: {
    onUpdate?: (data: ResponseHelper<CountLogsTypes>) => void;
    onError?: (error: unknown) => void;
  }) => {
    if (handlers.onUpdate) {
      ws.off('message', handlers.onUpdate);
    }

    if (handlers.onError) {
      ws.off('error', handlers.onError);
    }
  };

  return {
    setupLogsListeners,
    cleanupLogsListeners,
    close: ws.close
  };
};

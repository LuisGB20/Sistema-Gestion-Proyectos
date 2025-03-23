type WebSocketEvent = 'message' | 'error' | 'close';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WebSocketHandler<T = any> = (data: T) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private eventHandlers = new Map<WebSocketEvent, WebSocketHandler[]>();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  constructor(private endpoint: string) {
    this.connect();
  }

  private get baseUrl(): string {
    return import.meta.env.VITE_WS_BASE_URL;
  }

  private get fullUrl(): string {
    return `${this.baseUrl}/${this.endpoint}`.replace(/([^:]\/)\/+/g, '$1');
  }

  connect() {
    this.socket = new WebSocket(this.fullUrl);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.notifyHandlers('message', data);
      } catch (error) {
        this.notifyHandlers('error', error);
      }
    };

    this.socket.onclose = () => {
      console.log(`WebSocket disconnected from ${this.fullUrl}`);
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      this.notifyHandlers('error', error);
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on<T = any>(event: WebSocketEvent, handler: WebSocketHandler<T>) {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.push(handler);
    this.eventHandlers.set(event, handlers);
  }

  off(event: WebSocketEvent, handler: WebSocketHandler) {
    const handlers = this.eventHandlers.get(event) || [];
    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.eventHandlers.clear();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private notifyHandlers(event: WebSocketEvent, data: any) {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.forEach(handler => handler(data));
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, this.reconnectDelay);
    }
  }
}

const instances = new Map<string, WebSocketService>();

export const useWebSocket = (endpoint: string) => {
  if (!instances.has(endpoint)) {
    instances.set(endpoint, new WebSocketService(endpoint));
  }

  const service = instances.get(endpoint)!;

  return {
    on: service.on.bind(service),
    off: service.off.bind(service),
    send: service.send.bind(service),
    close: () => {
      service.close();
      instances.delete(endpoint);
    }
  };
};

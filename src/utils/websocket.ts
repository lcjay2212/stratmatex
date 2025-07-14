import { io, Socket } from "socket.io-client";

export interface WebSocketMessage {
  type: string;
  data: unknown;
  timestamp?: number;
}

export interface WebSocketConfig {
  url: string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
}

class WebSocketManager {
  private socket: Socket | null = null;
  private config: WebSocketConfig;
  private reconnectAttempts = 0;
  private isConnecting = false;
  private messageQueue: WebSocketMessage[] = [];
  private eventListeners: Map<string, ((data: unknown) => void)[]> = new Map();

  constructor(config: WebSocketConfig) {
    this.config = {
      autoReconnect: true,
      reconnectInterval: 3000,
      maxReconnectAttempts: 5,
      ...config,
    };
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      if (this.isConnecting) {
        reject(new Error("Connection already in progress"));
        return;
      }

      this.isConnecting = true;

      try {
        this.socket = io(this.config.url, {
          autoConnect: false,
          reconnection: this.config.autoReconnect,
          reconnectionAttempts: this.config.maxReconnectAttempts,
          reconnectionDelay: this.config.reconnectInterval,
          timeout: 20000,
        });

        this.socket.on("connect", () => {
          console.log("Socket.IO connected");
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.config.onConnect?.();

          // Send queued messages
          while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            if (message) {
              this.send(message);
            }
          }

          resolve();
        });

        this.socket.on("disconnect", (reason) => {
          console.log("Socket.IO disconnected:", reason);
          this.isConnecting = false;
          this.config.onDisconnect?.();
        });

        this.socket.on("connect_error", (error) => {
          console.error("Socket.IO connection error:", error);
          this.isConnecting = false;
          this.config.onError?.(error as unknown as Event);
          reject(error);
        });

        this.socket.on("error", (error) => {
          console.error("Socket.IO error:", error);
          this.config.onError?.(error as unknown as Event);
        });

        // Handle custom events
        this.socket.onAny((eventName, ...args) => {
          try {
            const message: WebSocketMessage = {
              type: eventName,
              data: args[0] || {},
              timestamp: Date.now(),
            };
            this.handleMessage(message);
          } catch (error) {
            console.error("Failed to handle Socket.IO message:", error);
          }
        });

        // Connect the socket
        this.socket.connect();
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  }

  send(message: WebSocketMessage): void {
    if (this.socket?.connected) {
      this.socket.emit(message.type, message.data);
    } else {
      // Queue message for later if not connected
      this.messageQueue.push(message);
      console.log("Message queued, waiting for connection");
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    // Call the global message handler
    this.config.onMessage?.(message);

    // Call specific event listeners
    const listeners = this.eventListeners.get(message.type);
    if (listeners) {
      listeners.forEach((listener) => listener(message.data));
    }
  }

  // Event listener management
  on(event: string, callback: (data: unknown) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);

    // Also listen to Socket.IO events
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback: (data: unknown) => void): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }

    // Remove from Socket.IO as well
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getReadyState(): number | null {
    if (!this.socket) return null;
    return this.socket.connected ? 1 : 0; // 1 = OPEN, 0 = CLOSED
  }

  // Socket.IO specific methods
  emit(event: string, data?: unknown): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected. Message not sent:", event, data);
    }
  }

  // Listen to Socket.IO events directly
  onSocketEvent(event: string, callback: (...args: unknown[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  offSocketEvent(event: string, callback?: (...args: unknown[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

// Create a singleton instance
let wsManager: WebSocketManager | null = null;

export const createWebSocketManager = (
  config: WebSocketConfig
): WebSocketManager => {
  if (wsManager) {
    wsManager.disconnect();
  }

  wsManager = new WebSocketManager(config);
  return wsManager;
};

export const getWebSocketManager = (): WebSocketManager | null => {
  return wsManager;
};

export const disconnectWebSocket = (): void => {
  if (wsManager) {
    wsManager.disconnect();
    wsManager = null;
  }
};

export default WebSocketManager;

import { io, Socket } from "socket.io-client";
import {
  ConnectionState,
  EventCallback,
  EventMap,
  SOCKET_EVENTS,
  WebSocketConfig,
  WebSocketMessage,
} from "../types/websocket";

class WebSocketService {
  private socket: Socket | null = null;
  private config: WebSocketConfig;
  private connectionState: ConnectionState = {
    isConnected: false,
    isConnecting: false,
    readyState: null,
    reconnectAttempts: 0,
  };
  private messageQueue: WebSocketMessage[] = [];
  private eventListeners: EventMap = new Map();
  private stateListeners: Set<(state: ConnectionState) => void> = new Set();

  constructor(config: WebSocketConfig) {
    this.config = {
      autoReconnect: true,
      reconnectInterval: 3000,
      maxReconnectAttempts: 5,
      ...config,
    };
  }

  // Connection management
  async connect(): Promise<void> {
    if (this.socket?.connected) {
      return;
    }

    if (this.connectionState.isConnecting) {
      throw new Error("Connection already in progress");
    }

    this.updateConnectionState({ isConnecting: true });

    try {
      this.socket = io(this.config.url, {
        autoConnect: false,
        reconnection: this.config.autoReconnect,
        reconnectionAttempts: this.config.maxReconnectAttempts,
        reconnectionDelay: this.config.reconnectInterval,
        timeout: 20000,
      });

      this.setupSocketEventListeners();
      this.socket.connect();
    } catch (error) {
      this.updateConnectionState({ isConnecting: false });
      throw error;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.updateConnectionState({
      isConnected: false,
      isConnecting: false,
      readyState: null,
      reconnectAttempts: 0,
    });
    this.clearMessageQueue();
  }

  // Message handling
  send(message: WebSocketMessage): void {
    if (this.socket?.connected) {
      this.socket.emit(message.type, message.data);
    } else {
      this.queueMessage(message);
    }
  }

  emit(event: string, data?: unknown): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected. Message not sent:", event, data);
    }
  }

  // Event management
  on(event: string, callback: EventCallback): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);

    // Also listen to Socket.IO events
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback: EventCallback): void {
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

  // State management
  getConnectionState(): ConnectionState {
    return { ...this.connectionState };
  }

  subscribeToStateChanges(
    callback: (state: ConnectionState) => void
  ): () => void {
    this.stateListeners.add(callback);
    return () => {
      this.stateListeners.delete(callback);
    };
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getReadyState(): number | null {
    if (!this.socket) return null;
    return this.socket.connected ? 1 : 0; // 1 = OPEN, 0 = CLOSED
  }

  // Private methods
  private setupSocketEventListeners(): void {
    if (!this.socket) return;

    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log("Socket.IO connected");
      this.updateConnectionState({
        isConnected: true,
        isConnecting: false,
        readyState: 1,
        reconnectAttempts: 0,
      });
      this.config.onConnect?.();
      this.processMessageQueue();
    });

    this.socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log("Socket.IO disconnected:", reason);
      this.updateConnectionState({
        isConnected: false,
        isConnecting: false,
        readyState: 0,
      });
      this.config.onDisconnect?.();
    });

    this.socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
      console.error("Socket.IO connection error:", error);
      this.updateConnectionState({
        isConnecting: false,
        readyState: 0,
      });
      this.config.onError?.(error as unknown as Event);
    });

    this.socket.on(SOCKET_EVENTS.ERROR, (error) => {
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

    // Re-register existing event listeners
    this.eventListeners.forEach((listeners, event) => {
      listeners.forEach((callback) => {
        this.socket!.on(event, callback);
      });
    });
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

  private updateConnectionState(updates: Partial<ConnectionState>): void {
    this.connectionState = { ...this.connectionState, ...updates };
    this.stateListeners.forEach((listener) => listener(this.connectionState));
  }

  private queueMessage(message: WebSocketMessage): void {
    this.messageQueue.push(message);
    console.log("Message queued, waiting for connection");
  }

  private processMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.send(message);
      }
    }
  }

  private clearMessageQueue(): void {
    this.messageQueue = [];
  }
}

// Singleton instance
let webSocketService: WebSocketService | null = null;

export const createWebSocketService = (
  config: WebSocketConfig
): WebSocketService => {
  if (webSocketService) {
    webSocketService.disconnect();
  }

  webSocketService = new WebSocketService(config);
  return webSocketService;
};

export const getWebSocketService = (): WebSocketService | null => {
  return webSocketService;
};

export const disconnectWebSocketService = (): void => {
  if (webSocketService) {
    webSocketService.disconnect();
    webSocketService = null;
  }
};

export default WebSocketService;

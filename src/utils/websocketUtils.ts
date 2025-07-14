import {
  ChatMessageData,
  SOCKET_EVENTS,
  SystemCommandData,
  WebSocketMessage,
} from "../types/websocket";

// Message factory functions
export const createChatMessage = (data: ChatMessageData): WebSocketMessage => ({
  type: SOCKET_EVENTS.CHAT_MESSAGE,
  data,
  timestamp: Date.now(),
});

export const createSystemCommand = (
  data: SystemCommandData
): WebSocketMessage => ({
  type: SOCKET_EVENTS.SYSTEM_COMMAND,
  data,
  timestamp: Date.now(),
});

export const createSystemMessage = (text: string): WebSocketMessage => ({
  type: SOCKET_EVENTS.SYSTEM_MESSAGE,
  data: { text, timestamp: Date.now() },
  timestamp: Date.now(),
});

export const createPingMessage = (): WebSocketMessage => ({
  type: SOCKET_EVENTS.PING,
  data: { timestamp: Date.now() },
  timestamp: Date.now(),
});

// Connection status helpers
export const getConnectionStatusText = (
  isConnected: boolean,
  isConnecting: boolean
): string => {
  if (isConnecting) return "Connecting...";
  if (isConnected) return "Connected";
  return "Disconnected";
};

export const getConnectionStatusColor = (
  isConnected: boolean,
  isConnecting: boolean
): string => {
  if (isConnecting) return "text-yellow-500";
  if (isConnected) return "text-green-500";
  return "text-red-500";
};

export const getConnectionStatusBgColor = (
  isConnected: boolean,
  isConnecting: boolean
): string => {
  if (isConnecting) return "bg-yellow-100";
  if (isConnected) return "bg-green-100";
  return "bg-red-100";
};

// Message validation
export const isValidMessage = (
  message: unknown
): message is WebSocketMessage => {
  if (!message || typeof message !== "object") return false;

  const msg = message as WebSocketMessage;
  return (
    typeof msg.type === "string" &&
    msg.type.length > 0 &&
    msg.data !== undefined
  );
};

export const isValidChatMessage = (data: unknown): data is ChatMessageData => {
  if (!data || typeof data !== "object") return false;

  const chatData = data as ChatMessageData;
  return (
    typeof chatData.text === "string" &&
    chatData.text.length > 0 &&
    typeof chatData.sender === "string" &&
    chatData.sender.length > 0
  );
};

// Error handling
export const createWebSocketError = (
  message: string,
  type: "connection" | "message" | "system" = "system",
  code?: number
) => ({
  message,
  code,
  timestamp: Date.now(),
  type,
});

// Debug utilities
export const logWebSocketEvent = (event: string, data?: unknown): void => {
  if (import.meta.env.DEV) {
    console.log(`[WebSocket] ${event}:`, data);
  }
};

export const logWebSocketError = (error: unknown, context?: string): void => {
  console.error(`[WebSocket] ${context || "Error"}:`, error);
};

// Message formatting
export const formatMessageTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString();
};

export const formatMessageDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString();
};

// Connection retry logic
export const calculateRetryDelay = (
  attempt: number,
  baseDelay: number = 1000
): number => {
  // Exponential backoff with jitter
  const exponentialDelay = baseDelay * Math.pow(2, attempt);
  const jitter = Math.random() * 0.1 * exponentialDelay;
  return Math.min(exponentialDelay + jitter, 30000); // Max 30 seconds
};

// Event listener management
export const createEventManager = () => {
  const listeners = new Map<string, Set<(data?: unknown) => void>>();

  const on = (event: string, callback: (data?: unknown) => void) => {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event)!.add(callback);
  };

  const off = (event: string, callback: (data?: unknown) => void) => {
    const eventListeners = listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  };

  const emit = (event: string, data?: unknown) => {
    const eventListeners = listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          logWebSocketError(error, `Event listener error for ${event}`);
        }
      });
    }
  };

  const clear = () => {
    listeners.clear();
  };

  return { on, off, emit, clear };
};

// Message queue management
export class MessageQueue {
  private queue: WebSocketMessage[] = [];
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  enqueue(message: WebSocketMessage): void {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift(); // Remove oldest message
    }
    this.queue.push(message);
  }

  dequeue(): WebSocketMessage | undefined {
    return this.queue.shift();
  }

  clear(): void {
    this.queue = [];
  }

  get size(): number {
    return this.queue.length;
  }

  get isEmpty(): boolean {
    return this.queue.length === 0;
  }

  get isFull(): boolean {
    return this.queue.length >= this.maxSize;
  }
}

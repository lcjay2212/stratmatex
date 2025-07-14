// Core WebSocket/Socket.IO types
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

// Connection state types
export interface ConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  readyState: number | null;
  reconnectAttempts: number;
}

// Event listener types
export type EventCallback = (data: unknown) => void;
export type EventMap = Map<string, EventCallback[]>;

// Hook return types
export interface UseWebSocketReturn {
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  send: (message: WebSocketMessage) => void;
  emit: (event: string, data?: unknown) => void;
  on: (event: string, callback: EventCallback) => void;
  off: (event: string, callback: EventCallback) => void;
  readyState: number | null;
}

export interface UseWebSocketOptions extends Omit<WebSocketConfig, "url"> {
  url?: string;
  enabled?: boolean;
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
}

// Context types
export type WebSocketContextType = UseWebSocketReturn;

// Common event types
export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",
  ERROR: "error",
  MESSAGE: "message",
  CHAT_MESSAGE: "chat_message",
  SYSTEM_MESSAGE: "system_message",
  SYSTEM_COMMAND: "system_command",
  SYSTEM_RESPONSE: "system_response",
  USER_UPDATE: "user_update",
  USER_JOIN: "user_join",
  USER_LEAVE: "user_leave",
  BROADCAST: "broadcast",
  PING: "ping",
  PONG: "pong",
} as const;

export type SocketEventType =
  (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];

// Message data types
export interface ChatMessageData {
  id?: string;
  text: string;
  sender: string;
  timestamp?: number;
  roomId?: string;
}

export interface SystemCommandData {
  command: string;
  message?: string;
  timestamp?: number;
}

export interface SystemResponseData {
  command: string;
  response: string;
  timestamp?: number;
  [key: string]: unknown;
}

export interface UserStatusData {
  userId: string;
  status: "online" | "offline" | "away";
  lastSeen?: number;
}

// Error types
export interface WebSocketError {
  message: string;
  code?: number;
  timestamp: number;
  type: "connection" | "message" | "system";
}

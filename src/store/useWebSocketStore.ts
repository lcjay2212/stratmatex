import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import {
  createWebSocketService,
  disconnectWebSocketService,
  getWebSocketService,
} from "../services/websocketService";
import {
  ConnectionState,
  EventCallback,
  WebSocketConfig,
  WebSocketMessage,
} from "../types/websocket";

interface WebSocketState extends ConnectionState {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  readyState: number | null;
  reconnectAttempts: number;

  // Connection info
  url: string;
  lastConnectedAt: number | null;
  lastDisconnectedAt: number | null;

  // Message queue
  messageQueue: WebSocketMessage[];
  sentMessages: WebSocketMessage[];
  receivedMessages: WebSocketMessage[];

  // Event listeners
  eventListeners: Map<string, EventCallback[]>;

  // Connection methods
  connect: (config?: Partial<WebSocketConfig>) => Promise<void>;
  disconnect: () => void;
  reconnect: () => Promise<void>;

  // Message methods
  send: (message: WebSocketMessage) => void;
  emit: (event: string, data?: unknown) => void;

  // Event methods
  on: (event: string, callback: EventCallback) => void;
  off: (event: string, callback: EventCallback) => void;

  // Utility methods
  clearMessages: () => void;
  getConnectionDuration: () => number | null;
  getMessageCount: () => { sent: number; received: number };
}

interface WebSocketActions {
  // Internal state updates
  _setConnectionState: (state: Partial<ConnectionState>) => void;
  _addMessage: (message: WebSocketMessage, type: "sent" | "received") => void;
  _addToQueue: (message: WebSocketMessage) => void;
  _removeFromQueue: (message: WebSocketMessage) => void;
  _setUrl: (url: string) => void;
  _setLastConnected: (timestamp: number) => void;
  _setLastDisconnected: (timestamp: number) => void;
}

type WebSocketStore = WebSocketState & WebSocketActions;

export const useWebSocketStore = create<WebSocketStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        isConnected: false,
        isConnecting: false,
        readyState: null,
        reconnectAttempts: 0,
        url: import.meta.env.VITE_WS_URL || "http://localhost:8080",
        lastConnectedAt: null,
        lastDisconnectedAt: null,
        messageQueue: [],
        sentMessages: [],
        receivedMessages: [],
        eventListeners: new Map(),

        // Connection methods
        connect: async (config = {}) => {
          const { url = get().url, ...restConfig } = config;

          set({ isConnecting: true, url });

          try {
            const service = createWebSocketService({
              url,
              autoReconnect: true,
              reconnectInterval: 3000,
              maxReconnectAttempts: 5,
              onMessage: (message) => {
                get()._addMessage(message, "received");
                // Call event listeners
                const listeners = get().eventListeners.get(message.type);
                if (listeners) {
                  listeners.forEach((callback) => callback(message.data));
                }
              },
              onConnect: () => {
                get()._setConnectionState({
                  isConnected: true,
                  isConnecting: false,
                  readyState: 1,
                  reconnectAttempts: 0,
                });
                get()._setLastConnected(Date.now());

                // Process queued messages
                const { messageQueue } = get();
                messageQueue.forEach((message) => {
                  get().send(message);
                });
                set({ messageQueue: [] });
              },
              onDisconnect: () => {
                get()._setConnectionState({
                  isConnected: false,
                  isConnecting: false,
                  readyState: 0,
                });
                get()._setLastDisconnected(Date.now());
              },
              onError: (error) => {
                console.error("WebSocket error:", error);
                get()._setConnectionState({
                  isConnecting: false,
                  readyState: 0,
                });
              },
              ...restConfig,
            });

            // Subscribe to state changes
            service.subscribeToStateChanges((state) => {
              get()._setConnectionState(state);
            });

            await service.connect();
          } catch (error) {
            console.error("Failed to connect WebSocket:", error);
            set({ isConnecting: false });
            throw error;
          }
        },

        disconnect: () => {
          disconnectWebSocketService();
          get()._setConnectionState({
            isConnected: false,
            isConnecting: false,
            readyState: null,
            reconnectAttempts: 0,
          });
          get()._setLastDisconnected(Date.now());
        },

        reconnect: async () => {
          const { url } = get();
          await get().disconnect();
          await get().connect({ url });
        },

        // Message methods
        send: (message: WebSocketMessage) => {
          const service = getWebSocketService();
          if (service?.isConnected()) {
            service.send(message);
            get()._addMessage(message, "sent");
          } else {
            get()._addToQueue(message);
          }
        },

        emit: (event: string, data?: unknown) => {
          const service = getWebSocketService();
          if (service?.isConnected()) {
            service.emit(event, data);
            const message: WebSocketMessage = {
              type: event,
              data,
              timestamp: Date.now(),
            };
            get()._addMessage(message, "sent");
          } else {
            console.warn(
              "WebSocket not connected. Message not sent:",
              event,
              data
            );
          }
        },

        // Event methods
        on: (event: string, callback: EventCallback) => {
          const { eventListeners } = get();
          if (!eventListeners.has(event)) {
            eventListeners.set(event, []);
          }
          eventListeners.get(event)!.push(callback);

          // Also register with service
          const service = getWebSocketService();
          if (service) {
            service.on(event, callback);
          }
        },

        off: (event: string, callback: EventCallback) => {
          const { eventListeners } = get();
          const listeners = eventListeners.get(event);
          if (listeners) {
            const index = listeners.indexOf(callback);
            if (index > -1) {
              listeners.splice(index, 1);
            }
          }

          // Also unregister from service
          const service = getWebSocketService();
          if (service) {
            service.off(event, callback);
          }
        },

        // Utility methods
        clearMessages: () => {
          set({ sentMessages: [], receivedMessages: [], messageQueue: [] });
        },

        getConnectionDuration: () => {
          const { lastConnectedAt, isConnected } = get();
          if (!isConnected || !lastConnectedAt) return null;
          return Date.now() - lastConnectedAt;
        },

        getMessageCount: () => {
          const { sentMessages, receivedMessages } = get();
          return {
            sent: sentMessages.length,
            received: receivedMessages.length,
          };
        },

        // Internal state updates
        _setConnectionState: (state: Partial<ConnectionState>) => {
          set((prev) => ({ ...prev, ...state }));
        },

        _addMessage: (message: WebSocketMessage, type: "sent" | "received") => {
          set((prev) => ({
            ...prev,
            [type === "sent" ? "sentMessages" : "receivedMessages"]: [
              ...prev[type === "sent" ? "sentMessages" : "receivedMessages"],
              message,
            ].slice(-100), // Keep only last 100 messages
          }));
        },

        _addToQueue: (message: WebSocketMessage) => {
          set((prev) => ({
            ...prev,
            messageQueue: [...prev.messageQueue, message].slice(-50), // Keep only last 50 queued messages
          }));
        },

        _removeFromQueue: (message: WebSocketMessage) => {
          set((prev) => ({
            ...prev,
            messageQueue: prev.messageQueue.filter((m) => m !== message),
          }));
        },

        _setUrl: (url: string) => {
          set({ url });
        },

        _setLastConnected: (timestamp: number) => {
          set({ lastConnectedAt: timestamp });
        },

        _setLastDisconnected: (timestamp: number) => {
          set({ lastDisconnectedAt: timestamp });
        },
      }),
      {
        name: "websocket-storage",
        partialize: (state) => ({
          url: state.url,
          lastConnectedAt: state.lastConnectedAt,
          lastDisconnectedAt: state.lastDisconnectedAt,
          reconnectAttempts: state.reconnectAttempts,
        }),
      }
    )
  )
);

// Selectors for better performance
export const useWebSocketConnection = () =>
  useWebSocketStore((state) => ({
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    readyState: state.readyState,
    connect: state.connect,
    disconnect: state.disconnect,
    reconnect: state.reconnect,
  }));

export const useWebSocketMessages = () =>
  useWebSocketStore((state) => ({
    sentMessages: state.sentMessages,
    receivedMessages: state.receivedMessages,
    messageQueue: state.messageQueue,
    clearMessages: state.clearMessages,
    getMessageCount: state.getMessageCount,
  }));

export const useWebSocketActions = () =>
  useWebSocketStore((state) => ({
    send: state.send,
    emit: state.emit,
    on: state.on,
    off: state.off,
  }));

export const useWebSocketStats = () =>
  useWebSocketStore((state) => ({
    url: state.url,
    lastConnectedAt: state.lastConnectedAt,
    lastDisconnectedAt: state.lastDisconnectedAt,
    reconnectAttempts: state.reconnectAttempts,
    getConnectionDuration: state.getConnectionDuration,
    getMessageCount: state.getMessageCount,
  }));

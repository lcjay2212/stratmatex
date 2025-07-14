import { useCallback, useEffect, useRef, useState } from "react";
import type WebSocketService from "../services/websocketService";
import {
  createWebSocketService,
  getWebSocketService,
} from "../services/websocketService";
import {
  ConnectionState,
  EventCallback,
  UseWebSocketOptions,
  UseWebSocketReturn,
  WebSocketMessage,
} from "../types/websocket";

export const useWebSocket = (
  options: UseWebSocketOptions = {}
): UseWebSocketReturn => {
  const {
    url = import.meta.env.VITE_WS_URL || "http://localhost:8080",
    enabled = true,
    autoReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    onMessage,
    onConnect,
    onDisconnect,
    onError,
  } = options;

  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnected: false,
    isConnecting: false,
    readyState: null,
    reconnectAttempts: 0,
  });

  const serviceRef = useRef<WebSocketService | null>(null);

  const connect = useCallback(async (): Promise<void> => {
    if (!enabled) return;

    try {
      const service = createWebSocketService({
        url,
        autoReconnect,
        reconnectInterval,
        maxReconnectAttempts,
        onMessage: (message) => {
          onMessage?.(message);
        },
        onConnect: () => {
          onConnect?.();
        },
        onDisconnect: () => {
          onDisconnect?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });

      serviceRef.current = service;
      await service.connect();
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
      throw error;
    }
  }, [
    url,
    enabled,
    autoReconnect,
    reconnectInterval,
    maxReconnectAttempts,
    onMessage,
    onConnect,
    onDisconnect,
    onError,
  ]);

  const disconnect = useCallback((): void => {
    if (serviceRef.current) {
      serviceRef.current.disconnect();
      serviceRef.current = null;
    }
  }, []);

  const send = useCallback((message: WebSocketMessage): void => {
    if (serviceRef.current) {
      serviceRef.current.send(message);
    }
  }, []);

  const emit = useCallback((event: string, data?: unknown): void => {
    if (serviceRef.current) {
      serviceRef.current.emit(event, data);
    }
  }, []);

  const on = useCallback((event: string, callback: EventCallback): void => {
    if (serviceRef.current) {
      serviceRef.current.on(event, callback);
    }
  }, []);

  const off = useCallback((event: string, callback: EventCallback): void => {
    if (serviceRef.current) {
      serviceRef.current.off(event, callback);
    }
  }, []);

  // Subscribe to connection state changes
  useEffect(() => {
    if (serviceRef.current) {
      const unsubscribe = serviceRef.current.subscribeToStateChanges(
        (state) => {
          setConnectionState(state);
        }
      );
      return unsubscribe;
    }
  }, []);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (enabled) {
      connect().catch(console.error);
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  return {
    isConnected: connectionState.isConnected,
    isConnecting: connectionState.isConnecting,
    connect,
    disconnect,
    send,
    emit,
    on,
    off,
    readyState: connectionState.readyState,
  };
};

// Hook for using the global WebSocket service
export const useGlobalWebSocket = (): UseWebSocketReturn | null => {
  const [service, setService] = useState<WebSocketService | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnected: false,
    isConnecting: false,
    readyState: null,
    reconnectAttempts: 0,
  });

  useEffect(() => {
    const globalService = getWebSocketService();
    setService(globalService);

    if (globalService) {
      const unsubscribe = globalService.subscribeToStateChanges(
        (state: ConnectionState) => {
          setConnectionState(state);
        }
      );
      return unsubscribe;
    }
  }, []);

  if (!service) {
    return null;
  }

  return {
    isConnected: connectionState.isConnected,
    isConnecting: connectionState.isConnecting,
    connect: () => service.connect(),
    disconnect: () => service.disconnect(),
    send: (message: WebSocketMessage) => service.send(message),
    emit: (event: string, data?: unknown) => service.emit(event, data),
    on: (event: string, callback: EventCallback) => service.on(event, callback),
    off: (event: string, callback: EventCallback) =>
      service.off(event, callback),
    readyState: connectionState.readyState,
  };
};

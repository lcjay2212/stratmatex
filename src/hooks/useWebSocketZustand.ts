import { useCallback, useEffect } from "react";
import {
  useWebSocketActions,
  useWebSocketConnection,
  useWebSocketMessages,
  useWebSocketStats,
  useWebSocketStore,
} from "../store/useWebSocketStore";
import { EventCallback, SOCKET_EVENTS } from "../types/websocket";
import {
  createChatMessage,
  createSystemCommand,
  logWebSocketEvent,
} from "../utils/websocketUtils";

// Main hook that provides all WebSocket functionality (compatible with context)
export const useWebSocketZustand = () => {
  const connection = useWebSocketConnection();
  const messages = useWebSocketMessages();
  const actions = useWebSocketActions();
  const stats = useWebSocketStats();

  return {
    ...connection,
    ...messages,
    ...actions,
    ...stats,
  };
};

// Hook for connection management only
export const useWebSocketConnectionZustand = () => {
  return useWebSocketConnection();
};

// Hook for message handling only
export const useWebSocketMessagesZustand = () => {
  return useWebSocketMessages();
};

// Hook for actions only
export const useWebSocketActionsZustand = () => {
  return useWebSocketActions();
};

// Hook for stats only
export const useWebSocketStatsZustand = () => {
  return useWebSocketStats();
};

// Hook for event handling with automatic cleanup
export const useWebSocketEvent = (event: string, callback: EventCallback) => {
  const { on, off } = useWebSocketActions();

  useEffect(() => {
    on(event, callback);
    return () => off(event, callback);
  }, [event, callback, on, off]);
};

// Hook for multiple events
export const useWebSocketEvents = (events: Record<string, EventCallback>) => {
  const { on, off } = useWebSocketActions();

  useEffect(() => {
    // Register all events
    Object.entries(events).forEach(([event, callback]) => {
      on(event, callback);
    });

    // Cleanup all events
    return () => {
      Object.entries(events).forEach(([event, callback]) => {
        off(event, callback);
      });
    };
  }, [events, on, off]);
};

// Hook for chat functionality
export const useWebSocketChat = (roomId?: string) => {
  const { send, emit, on, off } = useWebSocketActions();
  const { receivedMessages, sentMessages } = useWebSocketMessages();

  const sendChatMessage = useCallback(
    (text: string, sender: string) => {
      const message = createChatMessage({
        text,
        sender,
        timestamp: Date.now(),
        roomId,
      });
      send(message);
    },
    [send, roomId]
  );

  const sendSystemCommand = useCallback(
    (command: string, data?: unknown) => {
      const message = createSystemCommand({
        command,
        message: typeof data === "string" ? data : undefined,
        timestamp: Date.now(),
      });
      send(message);
    },
    [send]
  );

  const joinRoom = useCallback(
    (roomId: string, username: string) => {
      emit("join_room", { roomId, username });
    },
    [emit]
  );

  const leaveRoom = useCallback(
    (roomId: string, username: string) => {
      emit("leave_room", { roomId, username });
    },
    [emit]
  );

  const ping = useCallback(() => {
    emit(SOCKET_EVENTS.PING, { timestamp: Date.now() });
  }, [emit]);

  return {
    sendChatMessage,
    sendSystemCommand,
    joinRoom,
    leaveRoom,
    ping,
    receivedMessages,
    sentMessages,
    on,
    off,
  };
};

// Hook for notifications
export const useWebSocketNotifications = () => {
  const { on, off } = useWebSocketActions();

  const subscribeToNotifications = useCallback(
    (callback: (notification: unknown) => void) => {
      const handleNotification = (data: unknown) => {
        logWebSocketEvent("Notification received", data);
        callback(data);
      };

      on("notification", handleNotification);
      return () => off("notification", handleNotification);
    },
    [on, off]
  );

  const subscribeToSystemMessages = useCallback(
    (callback: (message: unknown) => void) => {
      const handleSystemMessage = (data: unknown) => {
        logWebSocketEvent("System message received", data);
        callback(data);
      };

      on(SOCKET_EVENTS.SYSTEM_MESSAGE, handleSystemMessage);
      return () => off(SOCKET_EVENTS.SYSTEM_MESSAGE, handleSystemMessage);
    },
    [on, off]
  );

  return {
    subscribeToNotifications,
    subscribeToSystemMessages,
  };
};

// Hook for real-time data
export const useWebSocketRealTimeData = () => {
  const { on, off, emit } = useWebSocketActions();

  const subscribeToData = useCallback(
    (event: string, callback: (data: unknown) => void) => {
      const handleData = (data: unknown) => {
        logWebSocketEvent(`Real-time data received: ${event}`, data);
        callback(data);
      };

      on(event, handleData);
      return () => off(event, handleData);
    },
    [on, off]
  );

  const requestData = useCallback(
    (event: string, data?: unknown) => {
      logWebSocketEvent(`Requesting data: ${event}`, data);
      emit(event, data);
    },
    [emit]
  );

  return {
    subscribeToData,
    requestData,
  };
};

// Hook for connection monitoring
export const useWebSocketMonitor = () => {
  const { isConnected, isConnecting, readyState } = useWebSocketConnection();
  const { getConnectionDuration, getMessageCount, reconnectAttempts } =
    useWebSocketStats();

  const connectionStatus = {
    isConnected,
    isConnecting,
    readyState,
    reconnectAttempts,
    connectionDuration: getConnectionDuration(),
    messageCount: getMessageCount(),
  };

  return connectionStatus;
};

// Hook for debugging
export const useWebSocketDebug = () => {
  const store = useWebSocketStore();

  const debugInfo = {
    connection: {
      isConnected: store.isConnected,
      isConnecting: store.isConnecting,
      readyState: store.readyState,
      reconnectAttempts: store.reconnectAttempts,
      url: store.url,
      lastConnectedAt: store.lastConnectedAt,
      lastDisconnectedAt: store.lastDisconnectedAt,
    },
    messages: {
      sent: store.sentMessages.length,
      received: store.receivedMessages.length,
      queued: store.messageQueue.length,
    },
    events: {
      registeredEvents: Array.from(store.eventListeners.keys()),
      totalListeners: Array.from(store.eventListeners.values()).reduce(
        (sum, listeners) => sum + listeners.length,
        0
      ),
    },
  };

  const logDebugInfo = useCallback(() => {
    console.log("WebSocket Debug Info:", debugInfo);
  }, [debugInfo]);

  return {
    debugInfo,
    logDebugInfo,
  };
};

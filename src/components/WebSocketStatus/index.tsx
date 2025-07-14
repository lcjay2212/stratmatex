import { Loader2, Wifi, WifiOff } from "lucide-react";
import React from "react";
import { useWebSocketZustand } from "../../hooks/useWebSocketZustand";
import {
  getConnectionStatusBgColor,
  getConnectionStatusColor,
  getConnectionStatusText,
} from "../../utils/websocketUtils";

interface WebSocketStatusProps {
  showText?: boolean;
  className?: string;
}

export const WebSocketStatus: React.FC<WebSocketStatusProps> = ({
  showText = true,
  className = "",
}) => {
  const { isConnected, isConnecting } = useWebSocketZustand();

  const getStatusInfo = () => {
    if (isConnecting) {
      return {
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        text: getConnectionStatusText(isConnected, isConnecting),
        color: getConnectionStatusColor(isConnected, isConnecting),
        bgColor: getConnectionStatusBgColor(isConnected, isConnecting),
      };
    }

    if (isConnected) {
      return {
        icon: <Wifi className="w-4 h-4" />,
        text: getConnectionStatusText(isConnected, isConnecting),
        color: getConnectionStatusColor(isConnected, isConnecting),
        bgColor: getConnectionStatusBgColor(isConnected, isConnecting),
      };
    }

    return {
      icon: <WifiOff className="w-4 h-4" />,
      text: getConnectionStatusText(isConnected, isConnecting),
      color: getConnectionStatusColor(isConnected, isConnecting),
      bgColor: getConnectionStatusBgColor(isConnected, isConnecting),
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${statusInfo.bgColor} ${className}`}
    >
      <div className={statusInfo.color}>{statusInfo.icon}</div>
      {showText && (
        <span className={`text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.text}
        </span>
      )}
    </div>
  );
};

export default WebSocketStatus;

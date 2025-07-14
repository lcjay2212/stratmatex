import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import React from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import WebSocketExample from "../components/WebSocketExample";
import WebSocketStatus from "../components/WebSocketStatus";
import { useWebSocketZustand } from "../hooks/useWebSocketZustand";

const WebSocketTestPage: React.FC = () => {
  const { isConnected, isConnecting, connect, disconnect } =
    useWebSocketZustand();

  const handleConnect = () => {
    connect().catch(console.error);
  };

  const handleReconnect = () => {
    connect().catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              WebSocket Test Page
            </h1>
            <p className="text-gray-600">
              Test real-time communication with WebSocket connections
            </p>
          </div>

          {/* Connection Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Connection Controls
                <WebSocketStatus showText={false} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm">
                    Status: {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleConnect}
                    disabled={isConnected || isConnecting}
                    className="flex items-center gap-2"
                  >
                    <Wifi className="w-4 h-4" />
                    Connect
                  </Button>

                  <Button
                    variant="outline"
                    onClick={disconnect}
                    disabled={!isConnected}
                    className="flex items-center gap-2"
                  >
                    <WifiOff className="w-4 h-4" />
                    Disconnect
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReconnect}
                    disabled={isConnecting}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${
                        isConnecting ? "animate-spin" : ""
                      }`}
                    />
                    Reconnect
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Socket.IO URL:{" "}
                  {import.meta.env.VITE_WS_URL || "http://localhost:8080"}
                </p>
                <p>Auto-reconnect: Enabled</p>
                <p>Max reconnection attempts: 5</p>
              </div>
            </CardContent>
          </Card>

          {/* WebSocket Example */}
          <WebSocketExample />

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>
                1. Make sure your WebSocket server is running on the configured
                URL
              </p>
              <p>
                2. The connection will automatically attempt to connect when the
                page loads
              </p>
              <p>
                3. Use the chat interface to send and receive real-time messages
              </p>
              <p>
                4. Try disconnecting and reconnecting to test the reconnection
                logic
              </p>
              <p>5. Check the browser console for connection logs and errors</p>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>VITE_WS_URL:</strong>{" "}
                  {import.meta.env.VITE_WS_URL ||
                    "Not set (using default: http://localhost:8080)"}
                </p>
                <p>
                  <strong>NODE_ENV:</strong> {import.meta.env.MODE}
                </p>
                <p>
                  <strong>API Base URL:</strong>{" "}
                  {import.meta.env.VITE_PUBLIC_API_BASE_URL || "Not set"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebSocketTestPage;

import { MessageCircle, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useWebSocketZustand } from "../../hooks/useWebSocketZustand";
import { ChatMessageData, SOCKET_EVENTS } from "../../types/websocket";
import {
  createChatMessage,
  createSystemCommand,
  formatMessageTimestamp,
  logWebSocketEvent,
} from "../../utils/websocketUtils";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

export const WebSocketExample: React.FC = () => {
  const { isConnected, send, emit, on, off } = useWebSocketZustand();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [senderName, setSenderName] = useState("User");

  // Handle incoming messages
  useEffect(() => {
    const handleChatMessage = (data: unknown) => {
      const message = data as ChatMessage;
      logWebSocketEvent("Chat message received", message);
      setMessages((prev) => [...prev, message]);
    };

    const handleSystemMessage = (data: unknown) => {
      const message = data as { text: string; type: string };
      logWebSocketEvent("System message received", message);
    };

    const handleSystemResponse = (data: unknown) => {
      const response = data as { command: string; response: string };
      logWebSocketEvent("System response received", response);
    };

    // Subscribe to events
    on(SOCKET_EVENTS.CHAT_MESSAGE, handleChatMessage);
    on(SOCKET_EVENTS.SYSTEM_MESSAGE, handleSystemMessage);
    on(SOCKET_EVENTS.SYSTEM_RESPONSE, handleSystemResponse);

    // Cleanup
    return () => {
      off(SOCKET_EVENTS.CHAT_MESSAGE, handleChatMessage);
      off(SOCKET_EVENTS.SYSTEM_MESSAGE, handleSystemMessage);
      off(SOCKET_EVENTS.SYSTEM_RESPONSE, handleSystemResponse);
    };
  }, [on, off]);

  const sendMessage = () => {
    if (!inputMessage.trim() || !isConnected) return;

    const chatData: ChatMessageData = {
      text: inputMessage,
      sender: senderName,
      timestamp: Date.now(),
    };

    const message = createChatMessage(chatData);
    send(message);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendSystemCommand = (command: string) => {
    if (!isConnected) return;

    const systemData = {
      command,
      timestamp: Date.now(),
    };

    const message = createSystemCommand(systemData);
    send(message);
  };

  const sendPing = () => {
    if (!isConnected) return;
    emit(SOCKET_EVENTS.PING, { timestamp: Date.now() });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Real-time Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          {/* System Commands */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={sendPing}
              disabled={!isConnected}
            >
              Ping
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendSystemCommand("get_users")}
              disabled={!isConnected}
            >
              Get Users
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendSystemCommand("echo")}
              disabled={!isConnected}
            >
              Echo
            </Button>
          </div>
        </div>

        {/* Sender Name Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Your name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Messages */}
        <ScrollArea className="h-64 border rounded-lg p-4">
          <div className="space-y-2">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">
                No messages yet. Start the conversation!
              </p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    message.sender === senderName ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === senderName
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="text-xs opacity-75 mb-1">
                      {message.sender}
                    </div>
                    <div>{message.text}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {formatMessageTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!isConnected || !inputMessage.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Press Enter to send a message</p>
          <p>• Use the Ping button to test the connection</p>
          <p>• Messages are sent in real-time via Socket.IO</p>
          <p>• Check browser console for detailed logs</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebSocketExample;

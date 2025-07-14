const { createServer } = require("http");
const { Server } = require("socket.io");

// Create HTTP server
const httpServer = createServer();

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins in development
    methods: ["GET", "POST"],
  },
});

const PORT = 8080;

console.log(`Socket.IO server running on http://localhost:${PORT}`);

// Store connected clients
const clients = new Map();

// Handle connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  clients.set(socket.id, socket);

  // Send welcome message
  socket.emit("system_message", {
    text: "Welcome to the Socket.IO server!",
    timestamp: Date.now(),
  });

  // Broadcast user joined
  socket.broadcast.emit("system_message", {
    text: "A new user joined the chat",
    timestamp: Date.now(),
  });

  // Handle chat messages
  socket.on("chat_message", (data) => {
    console.log("Chat message received:", data);

    // Broadcast to all clients
    io.emit("chat_message", {
      id: generateId(),
      text: data.text,
      sender: data.sender || "Anonymous",
      timestamp: data.timestamp || Date.now(),
    });
  });

  // Handle system commands
  socket.on("system_command", (data) => {
    console.log("System command received:", data);
    handleSystemCommand(socket, data);
  });

  // Handle custom events
  socket.onAny((eventName, ...args) => {
    console.log(`Event '${eventName}' received:`, args);

    // Echo back for testing
    socket.emit(eventName, {
      echo: true,
      originalData: args[0],
      timestamp: Date.now(),
    });
  });

  // Handle client disconnect
  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", socket.id, reason);
    clients.delete(socket.id);

    // Broadcast user left
    io.emit("system_message", {
      text: "A user left the chat",
      timestamp: Date.now(),
    });
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
    clients.delete(socket.id);
  });
});

// Helper functions
function handleSystemCommand(socket, data) {
  switch (data.command) {
    case "ping":
      socket.emit("system_response", {
        command: "ping",
        response: "pong",
        timestamp: Date.now(),
      });
      break;

    case "get_users":
      const userCount = io.engine.clientsCount;
      socket.emit("system_response", {
        command: "get_users",
        response: `Connected users: ${userCount}`,
        userCount,
        timestamp: Date.now(),
      });
      break;

    case "echo":
      socket.emit("system_response", {
        command: "echo",
        response: data.message || "No message provided",
        timestamp: Date.now(),
      });
      break;

    case "broadcast":
      io.emit("broadcast_message", {
        message: data.message || "No message provided",
        from: socket.id,
        timestamp: Date.now(),
      });
      break;

    default:
      socket.emit("error", {
        message: `Unknown command: ${data.command}`,
        timestamp: Date.now(),
      });
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
  console.log("Available commands:");
  console.log("- ping: Test connection");
  console.log("- get_users: Get connected user count");
  console.log("- echo <message>: Echo back a message");
  console.log("- broadcast <message>: Broadcast to all users");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down Socket.IO server...");
  httpServer.close(() => {
    console.log("Socket.IO server closed");
    process.exit(0);
  });
});

// Keep alive ping
setInterval(() => {
  io.emit("ping");
}, 30000); // Ping every 30 seconds

console.log("Socket.IO server ready!");

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  // Example: Listen for a message from the client
  socket.on("client-message", (data) => {
    console.log("Message from client:", data);
    // Broadcast the message to all other clients
    socket.broadcast.emit("server-message", data);
  });

  // Simulate sending status updates
  setInterval(() => {
    const status = {
      messageId: `msg_${Date.now()}`,
      status: Math.random() > 0.5 ? "read" : "sent",
    };
    socket.emit("status-update", status);
  }, 5000);
});

const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
import { Server as NetServer } from "http";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

// Extend NextApiResponse to include socket.io
export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

// WhatsApp status update event interface
export interface WhatsAppStatusUpdateEvent {
  guestId: string;
  eventId: string;
  status: 'NotSent' | 'Sent' | 'Delivered' | 'Read' | 'Failed';
  messageId?: string;
  timestamp: string;
}

// Email status update event interface
export interface EmailStatusUpdateEvent {
  guestId: string;
  eventId: string;
  status: 'NotSent' | 'Sent' | 'Read';
  timestamp: string;
}

// Guest update event interface
export interface GuestUpdateEvent {
  guestId: string;
  eventId: string;
  updatedFields: Record<string, unknown>;
  timestamp: string;
}

// Socket events interface
export interface SocketEvents {
  'whatsapp-status-update': WhatsAppStatusUpdateEvent;
  'email-status-update': EmailStatusUpdateEvent;
  'guest-update': GuestUpdateEvent;
  'join-event': string;
  'leave-event': string;
}

// Global variable to store the Socket.io server instance
let io: SocketIOServer | undefined;

// Initialize Socket.io server
export const initSocketIO = (server: NetServer): SocketIOServer => {
  if (!io) {
    io = new SocketIOServer(server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? process.env.NEXTAUTH_URL 
          : "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    // Handle client connections
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Handle joining event-specific rooms
      socket.on('join-event', (eventId: string) => {
        socket.join(`event-${eventId}`);
        console.log(`Socket ${socket.id} joined event room: event-${eventId}`);
      });

      // Handle leaving event-specific rooms
      socket.on('leave-event', (eventId: string) => {
        socket.leave(`event-${eventId}`);
        console.log(`Socket ${socket.id} left event room: event-${eventId}`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    console.log('Socket.io server initialized with event room support');
  }
  
  return io;
};

// Get Socket.io server instance
export const getSocketIOInstance = (): SocketIOServer | undefined => {
  return io;
};

// Emit WhatsApp status update to event-specific room
export const emitWhatsAppStatusUpdate = (data: WhatsAppStatusUpdateEvent) => {
  if (io) {
    // Emit to event-specific room
    io.to(`event-${data.eventId}`).emit('whatsapp-status-update', data);
    console.log('WhatsApp status update emitted to event room:', data);
  }
};

// Emit guest update to event-specific room
export const emitGuestUpdate = (data: GuestUpdateEvent) => {
  if (io) {
    // Emit to event-specific room
    io.to(`event-${data.eventId}`).emit('guest-update', data);
    console.log('Guest update emitted to event room:', data);
  }
};

// Emit email status update to event-specific room
export const emitEmailStatusUpdate = (data: EmailStatusUpdateEvent) => {
  if (io) {
    // Emit to event-specific room
    io.to(`event-${data.eventId}`).emit('email-status-update', data);
    console.log('Email status update emitted to event room:', data);
  }
};

// Emit to all clients (for global updates)
export const emitGlobalUpdate = (event: string, data: unknown) => {
  if (io) {
    io.emit(event, data);
    console.log('Global update emitted:', { event, data });
  }
};
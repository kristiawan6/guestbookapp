import { NextRequest } from 'next/server';
import { Server as NetServer } from 'http';
import { initSocketIO, getSocketIOInstance } from '@/lib/socket';

export async function GET(request: NextRequest) {
  // Initialize Socket.io server if not already initialized
  let io = getSocketIOInstance();
  
  if (!io) {
    // Create a minimal HTTP server for Socket.io (workaround for Next.js App Router)
    const httpServer = new NetServer();
    io = initSocketIO(httpServer);
  }
  
  return new Response('Socket.io server is running', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
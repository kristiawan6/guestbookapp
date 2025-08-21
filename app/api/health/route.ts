import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Health check endpoint for production monitoring
export async function GET() {
  try {
    const startTime = Date.now();
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    const dbResponseTime = Date.now() - startTime;
    
    // Check environment variables
    const envCheck = {
      database: !!process.env.DATABASE_URL,
      email: !!process.env.RESEND_API_KEY,
      auth: !!process.env.NEXTAUTH_SECRET,
    };
    
    const allEnvVarsPresent = Object.values(envCheck).every(Boolean);
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: {
        connected: true,
        responseTime: `${dbResponseTime}ms`
      },
      services: {
        email: envCheck.email ? 'configured' : 'missing',
        auth: envCheck.auth ? 'configured' : 'missing',
        database: envCheck.database ? 'configured' : 'missing'
      },
      overall: allEnvVarsPresent ? 'healthy' : 'degraded'
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed',
      environment: process.env.NODE_ENV
    }, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
}

// HEAD request for simple uptime checks
export async function HEAD() {
  try {
    // Quick database ping
    await prisma.$queryRaw`SELECT 1`;
    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(null, { status: 503 });
  }
}
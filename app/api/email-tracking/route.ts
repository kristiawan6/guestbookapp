import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSocketIOInstance, emitEmailStatusUpdate } from '@/lib/socket';

// Handle email tracking pixel requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const guestId = searchParams.get('guestId');
    const eventId = searchParams.get('eventId');

    if (!guestId) {
      return new NextResponse('Missing guestId parameter', { status: 400 });
    }

    // Update guest email status to 'Read'
    const updatedGuest = await prisma.guest.update({
      where: { id: guestId },
      data: { emailStatus: 'Read' },
      include: {
        event: true,
        guestCategory: true
      }
    });

    // Emit Socket.io event for real-time updates
    if (eventId) {
      emitEmailStatusUpdate({
        guestId,
        eventId,
        status: 'Read',
        timestamp: new Date().toISOString()
      });
    }

    // Return a 1x1 transparent pixel
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      'base64'
    );

    return new NextResponse(pixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': pixel.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Email tracking error:', error);
    
    // Still return a pixel even on error to avoid broken images
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      'base64'
    );

    return new NextResponse(pixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': pixel.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}

// Handle webhook-style POST requests for email tracking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestId, eventId, action } = body;

    if (!guestId || !action) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    let emailStatus: 'Sent' | 'Delivered' | 'Read' | 'Failed';
    
    switch (action) {
      case 'delivered':
        emailStatus = 'Delivered';
        break;
      case 'opened':
      case 'read':
        emailStatus = 'Read';
        break;
      case 'failed':
        emailStatus = 'Failed';
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Update guest email status
    const updatedGuest = await prisma.guest.update({
      where: { id: guestId },
      data: { emailStatus },
      include: {
        event: true,
        guestCategory: true
      }
    });

    // Emit Socket.io event for real-time updates
    if (eventId) {
      emitEmailStatusUpdate({
        guestId,
        eventId,
        status: emailStatus as 'Sent' | 'Read',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      guestId,
      emailStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Email tracking webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
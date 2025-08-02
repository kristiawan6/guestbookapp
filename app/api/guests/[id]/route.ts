import { NextRequest, NextResponse } from 'next/server';
import { getGuestById } from '@/lib/services/guestService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      );
    }

    const guest = await getGuestById(id);
    
    return NextResponse.json(guest, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching guest:', error);
    
    if (error.message === 'Guest not found') {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RealtimeGuestTable from '@/components/realtime-guest-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Users, UserCheck, UserX, Clock } from 'lucide-react';

interface GuestStats {
  total: number;
  attended: number;
  notAttended: number;
  pending: number;
}

export default function RealtimeGuestsPage() {
  const params = useParams();
  const [stats, setStats] = useState<GuestStats>({
    total: 0,
    attended: 0,
    notAttended: 0,
    pending: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get eventId from URL or use a default
  const eventId = params?.eventId as string || '1';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}/guests?limit=1000`);
        if (response.ok) {
          const data = await response.json();
          const guests = data.data || [];
          
          const newStats = {
            total: guests.length,
            attended: guests.filter((g: any) => g.status === 'Attended').length,
            notAttended: guests.filter((g: any) => g.status === 'NotAttended').length,
            pending: guests.filter((g: any) => g.status === 'Pending').length
          };
          
          setStats(newStats);
        }
      } catch (error) {
        console.error('Error fetching guest stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [eventId]);

  const handleGuestUpdate = (updatedGuests: any[]) => {
    // Update stats when guests change
    const newStats = {
      total: updatedGuests.length,
      attended: updatedGuests.filter((g: any) => g.status === 'Attended').length,
      notAttended: updatedGuests.filter((g: any) => g.status === 'NotAttended').length,
      pending: updatedGuests.filter((g: any) => g.status === 'Pending').length
    };
    setStats(newStats);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Real-time Guest Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage guests with live updates via WhatsApp integration
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All registered guests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attended</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{isLoading ? '...' : stats.attended}</div>
            <p className="text-xs text-muted-foreground">
              Confirmed attendance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Not Attended</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{isLoading ? '...' : stats.notAttended}</div>
            <p className="text-xs text-muted-foreground">
              Did not attend
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{isLoading ? '...' : stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Guest Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Guest Table
          </CardTitle>
          <CardDescription>
            Real-time updates via Socket.io and WhatsApp webhook integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RealtimeGuestTable 
            eventId={eventId} 
            onGuestUpdate={handleGuestUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}
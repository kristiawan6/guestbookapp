'use client';

import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
  Wifi,
  WifiOff,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface Guest {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  numberOfGuests?: number;
  session?: string;
  tableNumber?: string;
  status: 'Pending' | 'Attended' | 'NotAttended';
  whatsappStatus: 'NotSent' | 'Sent' | 'Delivered' | 'Read' | 'Failed';
  guestCategory?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface WhatsAppStatusUpdateEvent {
  guestId: string;
  eventId: string;
  status: 'NotSent' | 'Sent' | 'Delivered' | 'Read' | 'Failed';
  messageId?: string;
  timestamp: string;
}

interface GuestUpdateEvent {
  guestId: string;
  eventId: string;
  updatedFields: Partial<Guest> & { deleted?: boolean };
  timestamp: string;
}

interface RealtimeGuestTableProps {
  eventId: string;
  onGuestUpdate?: (guests: Guest[]) => void;
}

const ITEMS_PER_PAGE = 10;

export default function RealtimeGuestTable({ eventId, onGuestUpdate }: RealtimeGuestTableProps) {
  // State
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Guest>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [whatsappFilter, setWhatsappFilter] = useState<string>('all');

  // Fetch guests
  const fetchGuests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/events/${eventId}/guests?limit=1000`);
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      
      const data = await response.json();
      const guestData = data.data || [];
      setGuests(guestData);
      onGuestUpdate?.(guestData);
    } catch (err) {
      console.error('Error fetching guests:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch guests');
    } finally {
      setIsLoading(false);
    }
  }, [eventId, onGuestUpdate]);

  // Socket.io connection
  useEffect(() => {
    const socketInstance = io({
      path: '/api/socketio',
    });

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.io server');
      setIsConnected(true);
      // Join event-specific room
      socketInstance.emit('join-event', eventId);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
      setIsConnected(false);
    });

    // Listen for WhatsApp status updates
    socketInstance.on('whatsapp-status-update', (data: WhatsAppStatusUpdateEvent) => {
      console.log('WhatsApp status update received:', data);
      setGuests(prevGuests => 
        prevGuests.map(guest => 
          guest.id === data.guestId 
            ? { ...guest, whatsappStatus: data.status }
            : guest
        )
      );
    });

    // Listen for guest updates
    socketInstance.on('guest-update', (data: GuestUpdateEvent) => {
      console.log('Guest update received:', data);
      setGuests(prevGuests => {
        if (data.updatedFields.deleted) {
          // Remove deleted guest
          return prevGuests.filter(guest => guest.id !== data.guestId);
        } else {
          // Update existing guest or add new one
          const existingIndex = prevGuests.findIndex(guest => guest.id === data.guestId);
          if (existingIndex >= 0) {
            // Update existing guest
            const updatedGuests = [...prevGuests];
            updatedGuests[existingIndex] = { ...updatedGuests[existingIndex], ...data.updatedFields };
            return updatedGuests;
          } else {
            // This might be a new guest, refetch data
            fetchGuests();
            return prevGuests;
          }
        }
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.emit('leave-event', eventId);
      socketInstance.disconnect();
    };
  }, [eventId, fetchGuests]);

  // Initial data fetch
  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  // Filter and sort guests
  useEffect(() => {
    const filtered = guests.filter(guest => {
      const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guest.phoneNumber?.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
      const matchesWhatsApp = whatsappFilter === 'all' || guest.whatsappStatus === whatsappFilter;
      
      return matchesSearch && matchesStatus && matchesWhatsApp;
    });

    // Sort guests
    filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;
      
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredGuests(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [guests, searchTerm, statusFilter, whatsappFilter, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredGuests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGuests = filteredGuests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handlers
  const handleSort = (key: keyof Guest) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectGuest = (guestId: string, checked: boolean) => {
    const newSelected = new Set(selectedGuests);
    if (checked) {
      newSelected.add(guestId);
    } else {
      newSelected.delete(guestId);
    }
    setSelectedGuests(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGuests(new Set(paginatedGuests.map(guest => guest.id)));
    } else {
      setSelectedGuests(new Set());
    }
  };

  // Status badge components
  const getStatusBadge = (status: Guest['status']) => {
    const variants = {
      Pending: { variant: 'secondary' as const, icon: Clock },
      Attended: { variant: 'default' as const, icon: CheckCircle },
      NotAttended: { variant: 'destructive' as const, icon: XCircle }
    };
    
    const { variant, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getWhatsAppStatusBadge = (status: Guest['whatsappStatus']) => {
    const variants = {
      NotSent: { variant: 'outline' as const, icon: MessageSquare, color: 'text-gray-500' },
      Sent: { variant: 'secondary' as const, icon: MessageSquare, color: 'text-blue-500' },
      Delivered: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-500' },
      Read: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      Failed: { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-500' }
    };
    
    const { variant, icon: Icon, color } = variants[status];
    return (
      <Badge variant={variant} className={cn('flex items-center gap-1', color)}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">Disconnected</span>
            </>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredGuests.length} of {guests.length} guests
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Attended">Attended</SelectItem>
            <SelectItem value="NotAttended">Not Attended</SelectItem>
          </SelectContent>
        </Select>

        <Select value={whatsappFilter} onValueChange={setWhatsappFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="WhatsApp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All WhatsApp</SelectItem>
            <SelectItem value="NotSent">Not Sent</SelectItem>
            <SelectItem value="Sent">Sent</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Read">Read</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={paginatedGuests.length > 0 && selectedGuests.size === paginatedGuests.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-semibold"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="h-auto p-0 font-semibold"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('whatsappStatus')}
                  className="h-auto p-0 font-semibold"
                >
                  WhatsApp
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading guests...
                </TableCell>
              </TableRow>
            ) : paginatedGuests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No guests found
                </TableCell>
              </TableRow>
            ) : (
              paginatedGuests.map((guest) => (
                <TableRow key={guest.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedGuests.has(guest.id)}
                      onCheckedChange={(checked) => handleSelectGuest(guest.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div>{guest.name}</div>
                      {guest.guestCategory && (
                        <div className="text-xs text-muted-foreground">
                          {guest.guestCategory.name}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {guest.email && (
                        <div className="text-sm">{guest.email}</div>
                      )}
                      {guest.phoneNumber && (
                        <div className="text-sm text-muted-foreground">{guest.phoneNumber}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {guest.numberOfGuests && (
                        <div>Guests: {guest.numberOfGuests}</div>
                      )}
                      {guest.session && (
                        <div>Session: {guest.session}</div>
                      )}
                      {guest.tableNumber && (
                        <div>Table: {guest.tableNumber}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(guest.status)}
                  </TableCell>
                  <TableCell>
                    {getWhatsAppStatusBadge(guest.whatsappStatus)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredGuests.length)} of {filteredGuests.length} guests
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  Hash,
} from "lucide-react";
import { useStatistics } from "@/hooks/use-statistics";
import Swal from "sweetalert2";

// Types
type WhatsAppStatus = "NotSent" | "Sent" | "Delivered" | "Read" | "Failed";

type Guest = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  numberOfGuests: number;
  session: string;
  tableNumber: string;
  guestCategoryId: string;
  notes: string;
  whatsappStatus: WhatsAppStatus;
  createdAt: string;
  updatedAt: string;
};

type GuestCategory = {
  id: string;
  name: string;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type WhatsAppStatusUpdateEvent = {
  guestId: string;
  eventId: string;
  status: WhatsAppStatus;
  messageId?: string;
  timestamp: string;
};

type GuestUpdateEvent = {
  guestId: string;
  eventId: string;
  updatedFields: Partial<Guest>;
  timestamp: string;
};

interface RealtimeGuestTableProps {
  onEditGuest?: (guest: Guest) => void;
  onDeleteGuest?: (guestId: string) => void;
  selectedGuests?: string[];
  onGuestSelectionChange?: (selectedIds: string[]) => void;
}

export function RealtimeGuestTable({
  onEditGuest,
  onDeleteGuest, // eslint-disable-line @typescript-eslint/no-unused-vars
  selectedGuests = [],
  onGuestSelectionChange,
}: RealtimeGuestTableProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestCategories, setGuestCategories] = useState<GuestCategory[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const { selectedEventId } = useStatistics();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [sortKey, setSortKey] = useState<keyof Guest>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Socket.io connection setup
  useEffect(() => {
    const socketInstance = io({
      path: '/api/socketio',
    });

    setSocket(socketInstance);
    setConnectionStatus('connecting');

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.io server');
      setConnectionStatus('connected');
      
      // Join event-specific room for targeted updates
      if (selectedEventId) {
        socketInstance.emit('join-event', selectedEventId);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
      setConnectionStatus('disconnected');
    });

    socketInstance.on('whatsapp-status-update', (data: WhatsAppStatusUpdateEvent) => {
      console.log('WhatsApp status update received:', data);
      
      // Only update if the event matches current selected event
      if (data.eventId === selectedEventId) {
        setGuests(prevGuests => 
          prevGuests.map(guest => 
            guest.id === data.guestId 
              ? { ...guest, whatsappStatus: data.status }
              : guest
          )
        );
      }
    });

    socketInstance.on('guest-update', (data: GuestUpdateEvent) => {
      console.log('Guest update received:', data);
      
      // Only update if the event matches current selected event
      if (data.eventId === selectedEventId) {
        setGuests(prevGuests => 
          prevGuests.map(guest => 
            guest.id === data.guestId 
              ? { ...guest, ...data.updatedFields }
              : guest
          )
        );
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [selectedEventId]);

  // Join event room when selectedEventId changes
  useEffect(() => {
    if (socket && selectedEventId && connectionStatus === 'connected') {
      socket.emit('join-event', selectedEventId);
    }
  }, [socket, selectedEventId, connectionStatus]);

  // Fetch guests data
  const fetchGuests = useCallback(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/guests?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
      )
        .then((res) => res.json())
        .then((data) => {
          setGuests(data.data);
          setMeta(data.meta);
        })
        .catch((error) => {
          console.error('Error fetching guests:', error);
        });
    }
  }, [page, search, selectedEventId, sortKey, sortOrder]);

  // Fetch guest categories
  useEffect(() => {
    if (selectedEventId) {
      fetch(`/api/events/${selectedEventId}/guest-categories`)
        .then((res) => res.json())
        .then((data) => setGuestCategories(data.data))
        .catch((error) => {
          console.error('Error fetching guest categories:', error);
        });
    }
  }, [selectedEventId]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  // Handle guest selection
  const handleGuestSelection = (guestId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedGuests, guestId]
      : selectedGuests.filter(id => id !== guestId);
    
    onGuestSelectionChange?.(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? guests.map(guest => guest.id) : [];
    onGuestSelectionChange?.(newSelection);
  };

  // Handle sorting
  const handleSort = (key: keyof Guest) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (guestId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`/api/events/${selectedEventId}/guests/${guestId}`, {
          method: "DELETE",
        });
        
        // Remove from local state immediately for better UX
        setGuests(prevGuests => prevGuests.filter(guest => guest.id !== guestId));
        
        // Also remove from selection if selected
        if (selectedGuests.includes(guestId)) {
          onGuestSelectionChange?.(selectedGuests.filter(id => id !== guestId));
        }
        
        Swal.fire("Deleted!", "Guest has been deleted.", "success");
        
        // Refresh data to ensure consistency
        fetchGuests();
      } catch (error) {
        console.error('Error deleting guest:', error);
        Swal.fire("Error!", "Failed to delete guest.", "error");
      }
    }
  };

  // Get WhatsApp status badge
  const getWhatsAppStatusBadge = (status: WhatsAppStatus) => {
    const statusConfig = {
      NotSent: { variant: "secondary" as const, label: "Not Sent" },
      Sent: { variant: "default" as const, label: "Sent" },
      Delivered: { variant: "outline" as const, label: "Delivered" },
      Read: { variant: "default" as const, label: "Read" },
      Failed: { variant: "destructive" as const, label: "Failed" },
    };

    const config = statusConfig[status] || statusConfig.NotSent;
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  // Get guest category name
  const getCategoryName = (categoryId: string) => {
    const category = guestCategories.find(cat => cat.id === categoryId);
    return category?.name || "Uncategorized";
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className="text-sm text-gray-600">
            Real-time updates: {connectionStatus}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Showing {guests.length} of {meta?.total || 0} guests
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search guests by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>
        {selectedGuests.length > 0 && (
          <div className="text-sm text-gray-600 whitespace-nowrap px-3 py-2 bg-blue-50 rounded-md">
            {selectedGuests.length} selected
          </div>
        )}
      </div>

      {/* Guest Table */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={guests.length > 0 && selectedGuests.length === guests.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Name
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Event Details</TableHead>
                  <TableHead>WhatsApp Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow key={guest.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedGuests.includes(guest.id)}
                        onCheckedChange={(checked) => 
                          handleGuestSelection(guest.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{guest.name}</div>
                        {guest.notes && (
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">
                            {guest.notes}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {guest.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="truncate max-w-[150px]">{guest.email}</span>
                          </div>
                        )}
                        {guest.phoneNumber && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{guest.phoneNumber}</span>
                          </div>
                        )}
                        {guest.address && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="truncate max-w-[150px]">{guest.address}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {guest.numberOfGuests && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-gray-400" />
                            <span>{guest.numberOfGuests} guests</span>
                          </div>
                        )}
                        {guest.session && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span>{guest.session}</span>
                          </div>
                        )}
                        {guest.tableNumber && (
                          <div className="flex items-center gap-1">
                            <Hash className="h-3 w-3 text-gray-400" />
                            <span>Table {guest.tableNumber}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getWhatsAppStatusBadge(guest.whatsappStatus)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryName(guest.guestCategoryId)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditGuest?.(guest)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(guest.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Page {meta.page} of {meta.totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={meta.page <= 1}
                  onClick={() => setPage(meta.page - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={meta.page >= meta.totalPages}
                  onClick={() => setPage(meta.page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
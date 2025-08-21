import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  queryKeyFactory, 
  queryConfigs, 
  cacheInvalidation,
  prefetchHelpers 
} from '@/lib/react-query-config';

// Types for API responses
interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  location?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    guests: number;
    guestCategories: number;
    messages: number;
  };
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  eventId: string;
  guestCategoryId?: string;
  isPresent: boolean;
  checkedInAt?: string;
  address?: string;
  numberOfGuests?: number;
  session?: string;
  tableNumber?: string;
  notes?: string;
  whatsappStatus?: string;
  signed?: string;
  emailStatus?: string;
  webStatus?: string;
  dateArrival?: string | null;
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
  guestCategory?: GuestCategory;
  event?: Event;
  messages?: any[];
}

export interface GuestCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    guests: number;
  };
  event?: Event;
  guests?: Guest[];
}

export interface GuestStatistics {
  totalGuests: number;
  presentGuests: number;
  absentGuests: number;
  guestsByCategory: Array<{
    categoryId: string;
    categoryName: string;
    count: number;
    presentCount: number;
  }>;
  checkInTrend: Array<{
    hour: number;
    count: number;
  }>;
}

// API Functions
const fetchEvents = async (filters?: Record<string, any>): Promise<{ events: Event[]; total: number }> => {
  const searchParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  }
  
  const url = `/api/events${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

const fetchEvent = async (id: string): Promise<Event> => {
  const response = await fetch(`/api/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return response.json();
};

const createEvent = async (data: Partial<Event>): Promise<Event> => {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

const fetchGuests = async (
  eventId: string,
  filters?: Record<string, any>
): Promise<{ guests: Guest[]; total: number }> => {
  const searchParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  }
  
  const url = `/api/events/${eventId}/guests${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch guests');
  }
  return response.json();
};

const fetchGuest = async (id: string): Promise<Guest> => {
  const response = await fetch(`/api/guests/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch guest');
  }
  return response.json();
};

const createGuest = async (eventId: string, data: Partial<Guest>): Promise<Guest> => {
  const response = await fetch(`/api/events/${eventId}/guests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create guest');
  }
  return response.json();
};

const fetchGuestCategories = async (
  eventId: string,
  filters?: Record<string, any>
): Promise<{ guestCategories: GuestCategory[]; total: number }> => {
  const searchParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  }
  
  const url = `/api/events/${eventId}/guest-categories${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch guest categories');
  }
  return response.json();
};

const createGuestCategory = async (
  eventId: string,
  data: Partial<GuestCategory>
): Promise<GuestCategory> => {
  const response = await fetch(`/api/events/${eventId}/guest-categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create guest category');
  }
  return response.json();
};

const fetchGuestStatistics = async (eventId: string): Promise<GuestStatistics> => {
  const response = await fetch(`/api/events/${eventId}/statistics/guests`);
  if (!response.ok) {
    throw new Error('Failed to fetch guest statistics');
  }
  return response.json();
};

// Custom Hooks

// Events
export function useEvents(filters?: Record<string, any>) {
  return useQuery({
    queryKey: queryKeyFactory.eventsList(filters),
    queryFn: () => fetchEvents(filters),
    ...queryConfigs.events.list,
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeyFactory.eventsDetail(id),
    queryFn: () => fetchEvent(id),
    enabled: !!id,
    ...queryConfigs.events.detail,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createEvent,
    onSuccess: (newEvent) => {
      // Invalidate events list
      queryClient.invalidateQueries({ 
        queryKey: queryKeyFactory.events() 
      });
      
      // Optionally set the new event in cache
      queryClient.setQueryData(
        queryKeyFactory.eventsDetail(newEvent.id),
        newEvent
      );
    },
    onError: (error: Error) => {
      console.error('Failed to create event:', error);
    },
  });
}

// Guests
export function useGuests(eventId: string, filters?: Record<string, any>) {
  return useQuery({
    queryKey: queryKeyFactory.guestsList(eventId, filters),
    queryFn: () => fetchGuests(eventId, filters),
    enabled: !!eventId,
    ...queryConfigs.guests.list,
  });
}

export function useGuest(id: string) {
  return useQuery({
    queryKey: queryKeyFactory.guestsDetail(id),
    queryFn: () => fetchGuest(id),
    enabled: !!id,
    ...queryConfigs.guests.detail,
  });
}

export function useCreateGuest(eventId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Guest>) => createGuest(eventId, data),
    onSuccess: () => {
      // Use cache invalidation helper
      cacheInvalidation.invalidateGuestData(queryClient, eventId);
    },
    onError: (error: Error) => {
      console.error('Failed to create guest:', error);
    },
  });
}

// Guest Categories
export function useGuestCategories(eventId: string, filters?: Record<string, any>) {
  return useQuery({
    queryKey: queryKeyFactory.guestCategoriesList(eventId, filters),
    queryFn: () => fetchGuestCategories(eventId, filters),
    enabled: !!eventId,
    ...queryConfigs.guestCategories.list,
  });
}

export function useCreateGuestCategory(eventId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<GuestCategory>) => createGuestCategory(eventId, data),
    onSuccess: () => {
      // Use cache invalidation helper
      cacheInvalidation.invalidateCategoryData(queryClient, eventId);
    },
    onError: (error: Error) => {
      console.error('Failed to create guest category:', error);
    },
  });
}

// Statistics
export function useGuestStatistics(eventId: string) {
  return useQuery({
    queryKey: queryKeyFactory.guestStatistics(eventId),
    queryFn: () => fetchGuestStatistics(eventId),
    enabled: !!eventId,
    ...queryConfigs.statistics.guests,
  });
}

// Cache Management Utilities
export function useCacheInvalidation() {
  const queryClient = useQueryClient();
  
  return {
    invalidateEvents: () => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeyFactory.events() 
      });
    },
    invalidateEvent: (eventId: string) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeyFactory.eventsDetail(eventId) 
      });
    },
    invalidateEventData: (eventId: string) => {
      cacheInvalidation.invalidateEventData(queryClient, eventId);
    },
    invalidateGuestData: (eventId: string) => {
      cacheInvalidation.invalidateGuestData(queryClient, eventId);
    },
    invalidateCategoryData: (eventId: string) => {
      cacheInvalidation.invalidateCategoryData(queryClient, eventId);
    },
    invalidateStatistics: (eventId: string) => {
      cacheInvalidation.invalidateStatistics(queryClient, eventId);
    },
    clearAllCache: () => {
      cacheInvalidation.clearAllCache(queryClient);
    },
  };
}

// Prefetch Utilities
export function usePrefetch() {
  const queryClient = useQueryClient();
  
  return {
    prefetchEvent: (eventId: string) => {
      prefetchHelpers.prefetchEventDetails(queryClient, eventId);
    },
    prefetchGuests: (eventId: string) => {
      prefetchHelpers.prefetchGuestList(queryClient, eventId);
    },
    prefetchGuestCategories: (eventId: string) => {
      prefetchHelpers.prefetchGuestCategories(queryClient, eventId);
    },
    prefetchStatistics: (eventId: string) => {
      prefetchHelpers.prefetchStatistics(queryClient, eventId);
    },
    prefetchEventData: (eventId: string) => {
      // Prefetch all related data for an event
      prefetchHelpers.prefetchEventDetails(queryClient, eventId);
      prefetchHelpers.prefetchGuestList(queryClient, eventId);
      prefetchHelpers.prefetchGuestCategories(queryClient, eventId);
      prefetchHelpers.prefetchStatistics(queryClient, eventId);
    },
  };
}
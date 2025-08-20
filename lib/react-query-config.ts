import { QueryClient } from '@tanstack/react-query';

// Query key factories for consistent cache management
export const queryKeyFactory = {
  // Base keys
  all: ['guestbook'] as const,
  
  // Events
  events: () => [...queryKeyFactory.all, 'events'] as const,
  eventsList: (filters?: Record<string, any>) => 
    [...queryKeyFactory.events(), 'list', filters] as const,
  eventsDetail: (id: string) => 
    [...queryKeyFactory.events(), 'detail', id] as const,
  
  // Guests
  guests: (eventId: string) => 
    [...queryKeyFactory.all, 'guests', eventId] as const,
  guestsList: (eventId: string, filters?: Record<string, any>) => 
    [...queryKeyFactory.guests(eventId), 'list', filters] as const,
  guestsDetail: (id: string) => 
    [...queryKeyFactory.all, 'guests', 'detail', id] as const,
  
  // Guest Categories
  guestCategories: (eventId: string) => 
    [...queryKeyFactory.all, 'guestCategories', eventId] as const,
  guestCategoriesList: (eventId: string, filters?: Record<string, any>) => 
    [...queryKeyFactory.guestCategories(eventId), 'list', filters] as const,
  guestCategoriesDetail: (id: string) => 
    [...queryKeyFactory.all, 'guestCategories', 'detail', id] as const,
  
  // Statistics
  statistics: (eventId: string) => 
    [...queryKeyFactory.all, 'statistics', eventId] as const,
  guestStatistics: (eventId: string) => 
    [...queryKeyFactory.statistics(eventId), 'guests'] as const,
  
  // Messages
  messages: (eventId: string) => 
    [...queryKeyFactory.all, 'messages', eventId] as const,
  messagesList: (eventId: string, filters?: Record<string, any>) => 
    [...queryKeyFactory.messages(eventId), 'list', filters] as const,
  
  // User
  user: () => [...queryKeyFactory.all, 'user'] as const,
  userProfile: () => [...queryKeyFactory.user(), 'profile'] as const,
};

// Cache time constants (in milliseconds)
export const CACHE_TIMES = {
  // Very short cache for real-time data
  REALTIME: 10 * 1000, // 10 seconds
  
  // Short cache for frequently changing data
  SHORT: 30 * 1000, // 30 seconds
  
  // Medium cache for moderately changing data
  MEDIUM: 2 * 60 * 1000, // 2 minutes
  
  // Long cache for rarely changing data
  LONG: 5 * 60 * 1000, // 5 minutes
  
  // Very long cache for static data
  STATIC: 15 * 60 * 1000, // 15 minutes
  
  // Garbage collection time
  GC_TIME: 10 * 60 * 1000, // 10 minutes
};

// Query configurations for different data types
export const queryConfigs = {
  // Events configuration
  events: {
    list: {
      staleTime: CACHE_TIMES.MEDIUM,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: true,
    },
    detail: {
      staleTime: CACHE_TIMES.LONG,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: false,
    },
  },
  
  // Guests configuration
  guests: {
    list: {
      staleTime: CACHE_TIMES.SHORT,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: true,
      refetchInterval: 60 * 1000, // Refetch every minute for real-time updates
    },
    detail: {
      staleTime: CACHE_TIMES.MEDIUM,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: false,
    },
  },
  
  // Guest categories configuration
  guestCategories: {
    list: {
      staleTime: CACHE_TIMES.LONG,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: false,
    },
    detail: {
      staleTime: CACHE_TIMES.LONG,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: false,
    },
  },
  
  // Statistics configuration
  statistics: {
    guests: {
      staleTime: CACHE_TIMES.SHORT,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: true,
      refetchInterval: 30 * 1000, // Refetch every 30 seconds
    },
  },
  
  // Messages configuration
  messages: {
    list: {
      staleTime: CACHE_TIMES.REALTIME,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: true,
      refetchInterval: 10 * 1000, // Refetch every 10 seconds for real-time chat
    },
  },
  
  // User configuration
  user: {
    profile: {
      staleTime: CACHE_TIMES.STATIC,
      gcTime: CACHE_TIMES.GC_TIME,
      refetchOnWindowFocus: false,
    },
  },
};

// Optimized QueryClient factory
export function createOptimizedQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Default cache settings
        staleTime: CACHE_TIMES.MEDIUM,
        gcTime: CACHE_TIMES.GC_TIME,
        
        // Retry configuration
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors (client errors)
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        
        // Exponential backoff with jitter
        retryDelay: (attemptIndex) => {
          const baseDelay = Math.min(1000 * 2 ** attemptIndex, 30000);
          // Add jitter to prevent thundering herd
          const jitter = Math.random() * 0.1 * baseDelay;
          return baseDelay + jitter;
        },
        
        // Network and focus behavior
        refetchOnWindowFocus: true,
        refetchOnReconnect: 'always',
        refetchOnMount: true,
        
        // Enable request deduplication
        refetchInterval: false,
        
        // Network mode
        networkMode: 'online',
      },
      
      mutations: {
        // Retry failed mutations once
        retry: 1,
        retryDelay: 1000,
        
        // Network mode for mutations
        networkMode: 'online',
      },
    },
    
    // Query cache configuration
    queryCache: undefined, // Use default
    mutationCache: undefined, // Use default
  });
}

// Cache invalidation helpers
export const cacheInvalidation = {
  // Invalidate all event-related data
  invalidateEventData: (queryClient: QueryClient, eventId: string) => {
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.eventsDetail(eventId) 
    });
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.guests(eventId) 
    });
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.guestCategories(eventId) 
    });
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.statistics(eventId) 
    });
  },
  
  // Invalidate guest-related data
  invalidateGuestData: (queryClient: QueryClient, eventId: string) => {
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.guests(eventId) 
    });
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.guestStatistics(eventId) 
    });
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.eventsDetail(eventId) 
    });
  },
  
  // Invalidate category-related data
  invalidateCategoryData: (queryClient: QueryClient, eventId: string) => {
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.guestCategories(eventId) 
    });
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.eventsDetail(eventId) 
    });
  },
  
  // Invalidate statistics
  invalidateStatistics: (queryClient: QueryClient, eventId: string) => {
    queryClient.invalidateQueries({ 
      queryKey: queryKeyFactory.statistics(eventId) 
    });
  },
  
  // Clear all cache
  clearAllCache: (queryClient: QueryClient) => {
    queryClient.clear();
  },
};

// Prefetch helpers
export const prefetchHelpers = {
  // Prefetch event details when hovering over event list items
  prefetchEventDetails: (queryClient: QueryClient, eventId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeyFactory.eventsDetail(eventId),
      queryFn: async () => {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) throw new Error('Failed to fetch event');
        return response.json();
      },
      ...queryConfigs.events.detail,
    });
  },
  
  // Prefetch guest list when navigating to event details
  prefetchGuestList: (queryClient: QueryClient, eventId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeyFactory.guestsList(eventId),
      queryFn: async () => {
        const response = await fetch(`/api/events/${eventId}/guests`);
        if (!response.ok) throw new Error('Failed to fetch guests');
        return response.json();
      },
      ...queryConfigs.guests.list,
    });
  },
  
  // Prefetch guest categories
  prefetchGuestCategories: (queryClient: QueryClient, eventId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeyFactory.guestCategoriesList(eventId),
      queryFn: async () => {
        const response = await fetch(`/api/events/${eventId}/guest-categories`);
        if (!response.ok) throw new Error('Failed to fetch guest categories');
        return response.json();
      },
      ...queryConfigs.guestCategories.list,
    });
  },
  
  // Prefetch statistics
  prefetchStatistics: (queryClient: QueryClient, eventId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeyFactory.guestStatistics(eventId),
      queryFn: async () => {
        const response = await fetch(`/api/events/${eventId}/statistics/guests`);
        if (!response.ok) throw new Error('Failed to fetch statistics');
        return response.json();
      },
      ...queryConfigs.statistics.guests,
    });
  },
};

// Background sync helpers
export const backgroundSync = {
  // Setup background refetch for critical data
  setupBackgroundRefetch: (queryClient: QueryClient, eventId: string) => {
    // Refetch guest list every minute
    const guestRefetchInterval = setInterval(() => {
      queryClient.refetchQueries({ 
        queryKey: queryKeyFactory.guestsList(eventId),
        type: 'active'
      });
    }, 60 * 1000);
    
    // Refetch statistics every 30 seconds
    const statsRefetchInterval = setInterval(() => {
      queryClient.refetchQueries({ 
        queryKey: queryKeyFactory.guestStatistics(eventId),
        type: 'active'
      });
    }, 30 * 1000);
    
    // Return cleanup function
    return () => {
      clearInterval(guestRefetchInterval);
      clearInterval(statsRefetchInterval);
    };
  },
};
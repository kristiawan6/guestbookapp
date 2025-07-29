"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

export type Event = {
  id: string;
  name:string;
}

type EventContextType = {
  events: Event[] | undefined;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  isLoading: boolean;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

const fetchEvents = async () => {
  const res = await fetch("/api/events");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const { data } = await res.json();
  return data;
};

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedEventId');
    }
    return null;
  });

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // Custom setSelectedEventId that also saves to localStorage
  const handleSetSelectedEventId = (id: string | null) => {
    setSelectedEventId(id);
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem('selectedEventId', id);
      } else {
        localStorage.removeItem('selectedEventId');
      }
    }
  };

  useEffect(() => {
    if (!selectedEventId && events && events.length > 0) {
      // Check if stored eventId is still valid
      const storedEventId = typeof window !== 'undefined' ? localStorage.getItem('selectedEventId') : null;
      if (storedEventId && events.some(event => event.id === storedEventId)) {
        setSelectedEventId(storedEventId);
      } else {
        // Fallback to first event if stored event is not found
        handleSetSelectedEventId(events[0].id);
      }
    }
  }, [events, selectedEventId]);

  return (
    <EventContext.Provider value={{ events, selectedEventId, setSelectedEventId: handleSetSelectedEventId, isLoading }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
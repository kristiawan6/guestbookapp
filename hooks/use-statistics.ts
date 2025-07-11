"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const res = await fetch("/api/user");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const { data } = await res.json();
  return data;
};

const fetchStatistics = async (eventId: string) => {
  const res = await fetch(`/api/events/${eventId}/statistics/guests`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const { data } = await res.json();
  return data;
};

const fetchEvents = async () => {
  const res = await fetch("/api/events");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const { data } = await res.json();
  return data;
};

export const useStatistics = () => {
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(
    null
  );

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const { data: events, isLoading: isEventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    enabled: !!user,
  });

  React.useEffect(() => {
    if (!selectedEventId && events?.length > 0) {
      setSelectedEventId(events[0].id);
    }
  }, [events, selectedEventId]);

  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    error,
  } = useQuery({
    queryKey: ["statistics", selectedEventId],
    queryFn: () => fetchStatistics(selectedEventId!),
    enabled: !!selectedEventId,
  });

  return {
    user,
    events,
    selectedEventId,
    setSelectedEventId,
    statistics: {
      ...statistics,
      totalEvents: 1,
      totalGuestsLastEvent: 201,
      deletedGuests: 51,
    },
    isLoading: isUserLoading || isStatisticsLoading || isEventsLoading,
    error,
  };
};
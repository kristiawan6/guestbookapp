"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useEventContext } from "./use-event-context";

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

export const useStatistics = () => {
  const {
    events,
    selectedEventId,
    setSelectedEventId,
    isLoading: isEventsLoading,
  } = useEventContext();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

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
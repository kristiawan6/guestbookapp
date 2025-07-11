"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchUser = async () => {
  const res = await fetch("/api/user");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const usePrefetchUser = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: fetchUser,
    });
  }, [queryClient]);

  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
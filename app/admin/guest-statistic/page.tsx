"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatistics } from "@/hooks/use-statistics";
import { BarChart } from "lucide-react";

export default function GuestStatisticPage() {
  const { statistics, isLoading, error } = useStatistics();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading statistics</div>;
  }

  const stats = [
    {
      title: "Total Guests",
      value: statistics?.totalGuests,
      color: "bg-purple-500",
    },
    {
      title: "Total Guests for Last Event",
      value: statistics?.totalGuestsLastEvent,
      color: "bg-blue-500",
    },
    {
      title: "Total Guest is Deleted",
      value: statistics?.deletedGuests,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Guest Statistics</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <BarChart className="h-8 w-8 text-gray-400" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <div
                  className={`h-3 w-3 rounded-full ${stat.color}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
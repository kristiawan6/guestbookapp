"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  BarChart, 
  Users, 
  Calendar, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Activity,
  Gift
} from "lucide-react";
import { useStatistics } from "@/hooks/use-statistics";

export default function AdminDashboardPage() {
  const { statistics, isLoading, error } = useStatistics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserX className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-red-600 font-medium">Error loading dashboard</p>
          <p className="text-gray-500 text-sm mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "Total Events",
      value: statistics?.totalEvents || 0,
      icon: Calendar,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Total Guests",
      value: statistics?.totalGuests || 0,
      icon: Users,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "Active Guests",
      value: statistics?.activeGuests || 0,
      icon: UserCheck,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      change: "+15%",
      changeType: "increase"
    },
    {
      title: "Deleted Guests",
      value: statistics?.deletedGuests || 0,
      icon: UserX,
      color: "bg-gradient-to-r from-red-500 to-red-600",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      change: "-3%",
      changeType: "decrease"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart className="h-6 w-6 text-emerald-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your events and guests.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Activity className="h-4 w-4" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${
                      stat.changeType === 'decrease' ? 'rotate-180' : ''
                    }`} />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value?.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Manage Events</h3>
                <p className="text-sm text-gray-600">Create and manage your events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Guest Management</h3>
                <p className="text-sm text-gray-600">View and manage guest lists</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Gift className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Claim Souvenirs</h3>
                <p className="text-sm text-gray-600">Manage claimable items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
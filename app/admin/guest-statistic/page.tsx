"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatistics } from "@/hooks/use-statistics";
import { BarChart, Users, UserCheck, UserX, TrendingUp, Calendar, Target, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

interface CategoryDataItem {
  name: string;
  value: number;
  color: string;
}

export default function GuestStatisticPage() {
  const { statistics, isLoading, error } = useStatistics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
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
          <p className="text-red-600 font-medium">Error loading statistics</p>
          <p className="text-gray-500 text-sm mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Guests",
      value: statistics?.totalGuests || 0,
      icon: Users,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Active Guests",
      value: statistics?.activeGuests || 0,
      icon: UserCheck,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      change: "+8%",
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
    {
      title: "Attended Guests",
      value: statistics?.attendedGuests || 0,
      icon: CheckCircle,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      change: "+15%",
      changeType: "increase"
    },
    {
      title: "Attendance Rate",
      value: statistics?.attendanceRate || 0,
      icon: Target,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      change: "+5%",
      changeType: "increase",
      suffix: "%"
    },
  ];

  // Chart data from backend
  const guestTrendData = statistics?.monthlyTrends || [
    { month: 'Jan', guests: 120, active: 95, attended: 80 },
    { month: 'Feb', guests: 150, active: 120, attended: 100 },
    { month: 'Mar', guests: 180, active: 145, attended: 120 },
    { month: 'Apr', guests: 200, active: 160, attended: 140 },
    { month: 'May', guests: 220, active: 180, attended: 160 },
    { month: 'Jun', guests: statistics?.totalGuests || 250, active: statistics?.activeGuests || 200, attended: statistics?.attendedGuests || 180 },
  ];

  const attendanceData: CategoryDataItem[] = statistics?.attendanceDistribution || [
    { name: 'Attended', value: 180, color: '#10B981' },
    { name: 'Not Attended', value: 70, color: '#EF4444' },
  ];

  const categoryData: CategoryDataItem[] = statistics?.categoryDistribution || [
    { name: 'VIP', value: 30, color: '#8B5CF6' },
    { name: 'Regular', value: 45, color: '#10B981' },
    { name: 'Premium', value: 25, color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart className="h-6 w-6 text-emerald-600" />
              Guest Statistics
            </h1>
            <p className="text-gray-600 mt-1">Comprehensive overview of guest data and trends</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
                    {stat.value?.toLocaleString()}{stat.suffix || ''}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Guest Trends Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Guest Trends</CardTitle>
            <p className="text-sm text-gray-600">Monthly guest registration and activity</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={guestTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="guests" 
                    stackId="1" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6" 
                    fillOpacity={0.6}
                    name="Total Guests"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="active" 
                    stackId="2" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                    name="Active Guests"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attended" 
                    stackId="3" 
                    stroke="#059669" 
                    fill="#059669" 
                    fillOpacity={0.8}
                    name="Attended Guests"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Attendance Status</CardTitle>
            <p className="text-sm text-gray-600">Distribution of guest attendance</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceData.map((entry: CategoryDataItem, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guest Categories Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Guest Categories</CardTitle>
            <p className="text-sm text-gray-600">Distribution by guest category</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry: CategoryDataItem, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Guest Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Monthly Activity</CardTitle>
            <p className="text-sm text-gray-600">Guest activity trends by month</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={guestTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="guests" 
                    fill="#3B82F6" 
                    name="Total Guests"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="active" 
                    fill="#10B981" 
                    name="Active Guests"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="attended" 
                    fill="#059669" 
                    name="Attended Guests"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
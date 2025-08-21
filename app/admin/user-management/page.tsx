"use client";

import {
  ArrowUpDown,
  Pencil,
  Plus,
  Trash2,
  Users,
  Search,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Activity,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2";
import { useStatistics } from "@/hooks/use-statistics";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  eventIds: string[];
};

type Event = {
  id: string;
  name: string;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {} = useStatistics();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [sortKey, setSortKey] = useState<keyof User>("username");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchUsers = useCallback(() => {
    fetch(
      `/api/users?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setMeta(data.meta);
      });
  }, [page, search, sortKey, sortOrder]);

  const fetchEvents = useCallback(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, [fetchUsers, fetchEvents]);

  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Collect all checked eventIds
    const eventIds = formData.getAll('eventIds') as string[];

    const url = selectedUser
      ? `/api/users/${selectedUser.id}`
      : "/api/users";

    const method = selectedUser ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          eventIds,
          isActive: data.isActive === "on",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      fetchUsers();
      setIsDialogOpen(false);
      setSelectedUser(null);
      Swal.fire({
        icon: "success",
        title: `User ${
          selectedUser ? "updated" : "created"
        } successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: message,
      });
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchUsers();
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } else {
          const errorData = await response.json();
          Swal.fire(
            "Failed!",
            errorData.message || "Failed to delete the user.",
            "error"
          );
        }
      }
    });
  };

  const handleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = totalUsers - activeUsers;
  const adminUsers = users.filter(user => user.role === 'SuperAdmin').length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              User Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage system users and their permissions</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full sm:w-64 lg:w-80 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                  onClick={() => {
                    setSelectedUser(null);
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> 
                  <span className="sm:inline">Add User</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b border-gray-100">
                  <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {selectedUser ? (
                      <><Pencil className="h-5 w-5 text-blue-600" /> Edit User</>
                    ) : (
                      <><Plus className="h-5 w-5 text-emerald-600" /> Add New User</>
                    )}
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedUser ? "Update user information and permissions" : "Create a new user account with appropriate access"}
                  </p>
                </DialogHeader>
                
                <form
                  key={selectedUser ? "edit-user-form" : "add-user-form"}
                  onSubmit={handleAddUser}
                  className="p-6 space-y-4"
                >
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-blue-600" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="username" className="text-xs font-medium text-gray-700">
                          Username <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          defaultValue={selectedUser?.username}
                          placeholder="Enter username"
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={selectedUser?.email}
                          placeholder="Enter email address"
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                    </div>
                    {!selectedUser && (
                      <div className="space-y-1">
                        <Label htmlFor="password" className="text-xs font-medium text-gray-700">
                          Password <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter secure password"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Role & Permissions */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      Role & Permissions
                    </h3>
                    <div className="grid gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="role" className="text-xs font-medium text-gray-700">
                          User Role
                        </Label>
                        <Select name="role" defaultValue={selectedUser?.role || "AdminEvents"}>
                          <SelectTrigger className="h-8 border-gray-300 focus:border-purple-500 text-sm">
                            <SelectValue placeholder="Select user role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AdminEvents">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">Admin Events</Badge>
                                <span className="text-xs text-gray-600">Manage events and guests</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="SuperAdmin">
                              <div className="flex items-center gap-2">
                                <Badge variant="destructive" className="text-xs">Super Admin</Badge>
                                <span className="text-xs text-gray-600">Full system access</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-gray-700">
                          Event Access
                        </Label>
                        <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-y-auto bg-white">
                          {events.length > 0 ? (
                            <div className="space-y-2">
                              {events.map((event) => (
                                <div key={event.id} className="flex items-center space-x-2 p-1.5 hover:bg-gray-50 rounded-md">
                                  <Checkbox
                                    id={`event-${event.id}`}
                                    name="eventIds"
                                    value={event.id}
                                    defaultChecked={selectedUser?.eventIds?.includes(event.id)}
                                    className="border-gray-300 h-3.5 w-3.5"
                                  />
                                  <Label htmlFor={`event-${event.id}`} className="text-xs font-medium text-gray-700 cursor-pointer flex-1">
                                    {event.name}
                                  </Label>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                    Event
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 text-center py-3">No events available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      Account Status
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        name="isActive"
                        defaultChecked={selectedUser?.isActive ?? true}
                        className="border-gray-300 h-3.5 w-3.5"
                      />
                      <div className="flex-1">
                        <Label htmlFor="isActive" className="text-xs font-medium text-gray-700 cursor-pointer">
                          Active Account
                        </Label>
                        <p className="text-xs text-gray-500">
                          Active users can log in and access the system
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1 sm:flex-none"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white border-0"
                      >
                        {selectedUser ? (
                          <><Pencil className="mr-2 h-4 w-4" /> Update User</>
                        ) : (
                          <><Plus className="mr-2 h-4 w-4" /> Create User</>
                        )}
                      </Button>
                    </div>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Admin Users</p>
              <p className="text-2xl font-bold text-gray-900">{adminUsers}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Users Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">User Records</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Showing {users.length} of {meta?.total || 0} users
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity className="h-4 w-4" />
              {activeUsers} Active
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4 text-xs sm:text-sm">#</TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("username")}
                      className="hover:bg-gray-100 font-semibold text-gray-700 text-xs sm:text-sm"
                    >
                      Username
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 hidden md:table-cell">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("email")}
                      className="hover:bg-gray-100 font-semibold text-gray-700 text-xs sm:text-sm"
                    >
                      Email
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 hidden sm:table-cell">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("role")}
                      className="hover:bg-gray-100 font-semibold text-gray-700 text-xs sm:text-sm"
                    >
                      Role
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort("isActive")}
                      className="hover:bg-gray-100 font-semibold text-gray-700 text-xs sm:text-sm"
                    >
                      Status
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 hidden lg:table-cell text-xs sm:text-sm">Events</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 text-xs sm:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="font-medium text-gray-600 py-4 text-xs sm:text-sm">
                    {(page - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 text-xs sm:text-sm">{user.username}</TableCell>
                  <TableCell className="text-gray-600 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-xs sm:text-sm">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'SuperAdmin' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActive 
                          ? "bg-green-100 text-green-800 border border-green-200" 
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {user.isActive ? (
                        <>
                          <UserCheck className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Active</span>
                          <span className="sm:hidden">✓</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Inactive</span>
                          <span className="sm:hidden">✗</span>
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {user.eventIds?.slice(0, 2).map((eventId) => {
                        const event = events.find(e => e.id === eventId);
                        return event ? (
                          <span key={eventId} className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs border border-emerald-200">
                            {event.name}
                          </span>
                        ) : null;
                      })}
                      {user.eventIds?.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs border border-gray-200">
                          +{user.eventIds.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 p-1 sm:p-2"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200 p-1 sm:p-2"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              <span className="hidden sm:inline">Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, meta?.total || 0)} of {meta?.total || 0} results</span>
              <span className="sm:hidden">{meta?.total || 0} total</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="border-gray-300 hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              <span className="text-xs sm:text-sm font-medium text-gray-700 px-2 sm:px-3">
                {page}/{meta?.totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === meta?.totalPages}
                className="border-gray-300 hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import {
  ArrowUpDown,
  Pencil,
  Plus,
  Trash2,
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Swal from "sweetalert2";
import { useStatistics } from "@/hooks/use-statistics";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  eventId: string;
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
  const { selectedEventId, isLoading } = useStatistics();
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
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: error.message,
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="mr-2"
                onClick={() => {
                  setSelectedUser(null);
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedUser ? "Edit" : "Add"} User
                </DialogTitle>
              </DialogHeader>
              <form
                key={selectedUser ? "edit-user-form" : "add-user-form"}
                onSubmit={handleAddUser}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      defaultValue={selectedUser?.username}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      defaultValue={selectedUser?.email}
                      className="col-span-3"
                    />
                  </div>
                  {!selectedUser && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <select
                      id="role"
                      name="role"
                      defaultValue={selectedUser?.role}
                      className="col-span-3 border rounded-md"
                    >
                      <option value="Admin">Admin</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="eventId" className="text-right">
                      Event
                    </Label>
                    <select
                      id="eventId"
                      name="eventId"
                      defaultValue={selectedUser?.eventId}
                      className="col-span-3 border rounded-md"
                    >
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isActive" className="text-right">
                      Is Active
                    </Label>
                    <Checkbox
                      id="isActive"
                      name="isActive"
                      defaultChecked={selectedUser?.isActive}
                    />
                  </div>
                </div>
                <Button type="submit">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("username")}>
                  Username
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("email")}>
                  Email
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("role")}>
                  Role
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("isActive")}>
                  Is Active
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.isActive ? "Y" : "N"}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>
            Page {page} of {meta?.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
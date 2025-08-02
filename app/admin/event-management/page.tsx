"use client";

import {
  ArrowUpDown,
  Pencil,
  Plus,
  Trash2,
  Upload,
  Calendar,
  Search,
  Activity,
  CheckCircle,
  XCircle,
  BarChart3,
  FileText,
  Settings,
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
import Papa from "papaparse";
import Swal from "sweetalert2";

type Event = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function EventManagementPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [sortKey, setSortKey] = useState<keyof Event>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchEvents = useCallback(() => {
    fetch(
      `/api/events?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
        setMeta(data.meta);
      });
  }, [page, search, sortKey, sortOrder]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAddEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        isActive: data.isActive === "on",
      }),
    });

    fetchEvents();
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDelete = async (eventId: string) => {
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
        await fetch(`/api/events/${eventId}`, {
          method: "DELETE",
        });
        fetchEvents();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(events);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "events.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (key: keyof Event) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const totalEvents = events.length;
  const activeEvents = events.filter(event => event.isActive).length;
  const inactiveEvents = totalEvents - activeEvents;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-emerald-600" />
              Event Management
            </h1>
            <p className="text-gray-600 mt-1">Manage and organize your events efficiently</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-80 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => {
                    setSelectedEvent(null);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <div>{selectedEvent ? "Edit" : "Create"} Event</div>
                      <div className="text-sm font-normal opacity-90 mt-1">
                        {selectedEvent ? "Update event details" : "Add a new event to your system"}
                      </div>
                    </div>
                  </DialogTitle>
                  {selectedEvent && (
                    <div className="flex items-center gap-2 mt-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        Event ID: {selectedEvent.id}
                      </Badge>
                      <Badge 
                        variant={selectedEvent.isActive ? "default" : "secondary"}
                        className={selectedEvent.isActive 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-500 text-white"
                        }
                      >
                        {selectedEvent.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  )}
                </DialogHeader>
              </div>

              <form
                key={selectedEvent ? "edit-event-form" : "add-event-form"}
                onSubmit={handleAddEvent}
                className="p-6"
              >
                <div className="space-y-6">
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-4 w-4 text-emerald-500" />
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Event Name *
                        </Label>
                      </div>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={selectedEvent?.name}
                        className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Enter event name (e.g., Annual Conference 2024)"
                        required
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                          Event Description
                        </Label>
                      </div>
                      <Input
                        id="description"
                        name="description"
                        defaultValue={selectedEvent?.description}
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Brief description of the event"
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Settings className="h-4 w-4 text-orange-500" />
                        <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                          Event Status
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 pt-2">
                        <Checkbox
                          id="isActive"
                          name="isActive"
                          defaultChecked={selectedEvent?.isActive ?? true}
                          className="border-gray-300"
                        />
                        <Label htmlFor="isActive" className="text-sm text-gray-600">
                          Active event (guests can register and participate)
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-gray-500">
                      {selectedEvent ? "Update" : "Create"} event with the information above
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setSelectedEvent(null);
                          setIsDialogOpen(false);
                        }}
                        className="hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {selectedEvent ? "Update Event" : "Create Event"}
                      </Button>
                    </div>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
            <Button 
              variant="outline" 
              onClick={handleExport}
              className="border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <Upload className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+12%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+8%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Events</p>
              <p className="text-2xl font-bold text-gray-900">{activeEvents}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-xs font-medium text-red-600">-2%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Inactive Events</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveEvents}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Events Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Event Records</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Showing {events.length} of {meta?.total || 0} events
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity className="h-4 w-4" />
              {activeEvents} Active
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700 py-4">#</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("name")}
                    className="hover:bg-gray-100 font-semibold text-gray-700"
                  >
                    Event Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("description")}
                    className="hover:bg-gray-100 font-semibold text-gray-700"
                  >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("isActive")}
                    className="hover:bg-gray-100 font-semibold text-gray-700"
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={event.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="font-medium text-gray-600 py-4">
                    {(page - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{event.name}</TableCell>
                  <TableCell className="text-gray-600 max-w-xs truncate">{event.description}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        event.isActive 
                          ? "bg-green-100 text-green-800 border border-green-200" 
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {event.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                        onClick={() => handleEdit(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, meta?.total || 0)} of {meta?.total || 0} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              >
                Previous
              </Button>
              <span className="text-sm font-medium text-gray-700 px-3">
                Page {page} of {meta?.totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === meta?.totalPages}
                className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
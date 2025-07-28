"use client";

import {
  ArrowUpDown,
  ChevronDown,
  Copy,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Printer,
  QrCode,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { ImportDialog } from "@/components/ui/import-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStatistics } from "@/hooks/use-statistics";
import Swal from "sweetalert2";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Guest = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  numberOfGuests: number;
  session: string;
  tableNumber: string;
  guestCategoryId: string;
  notes: string;
};

type GuestCategory = {
  id: string;
  name: string;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function GuestPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestCategories, setGuestCategories] = useState<GuestCategory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const { selectedEventId, isLoading } = useStatistics();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [sortKey, setSortKey] = useState<keyof Guest>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchGuests = useCallback(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/guests?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
      )
        .then((res) => res.json())
        .then((data) => {
          setGuests(data.data);
          setMeta(data.meta);
        });
    }
  }, [page, search, selectedEventId, sortKey, sortOrder]);

  useEffect(() => {
    if (selectedEventId) {
      fetch(`/api/events/${selectedEventId}/guest-categories`)
        .then((res) => res.json())
        .then((data) => setGuestCategories(data.data));
    }
  }, [selectedEventId]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  const handleAddGuest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (selectedGuest) {
      await fetch(`/api/events/${selectedEventId}/guests/${selectedGuest.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch(`/api/events/${selectedEventId}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    fetchGuests();
    setIsDialogOpen(false);
    setSelectedGuest(null);
  };

  const handleEdit = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsDialogOpen(true);
  };

  const handleDelete = async (guestId: string) => {
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
        await fetch(`/api/events/${selectedEventId}/guests/${guestId}`, {
          method: "DELETE",
        });
        fetchGuests();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleExport = async () => {
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const response = await fetch(
      `/api/events/${selectedEventId}/guests/export?t=${new Date().getTime()}`
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "guests.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleImport = async (file: File) => {
    if (file && selectedEventId) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `/api/events/${selectedEventId}/guests/import`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }

        fetchGuests();
        Swal.fire({
          icon: "success",
          title: "Guests imported successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unexpected error occurred";
        Swal.fire({
          icon: "error",
          title: "Import Failed",
          text: message,
        });
      }
    }
  };

  const handleDownloadTemplate = () => {
    const headers = ["Fullname", "Category", "Telephone", "email", "address"];
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, "Template_Excel.xlsx");
  };


  const handleSort = (key: keyof Guest) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Guests</h1>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <h2 className="text-lg font-semibold mb-4">
              Total Attendance from {meta?.total} Guests
            </h2>
            <div className="flex justify-around items-center flex-grow">
              <div className="text-center">
                <ResponsiveContainer width={100} height={100}>
                  <PieChart>
                    <Pie
                      data={[{ value: 303 }, { value: 19 }]}
                      dataKey="value"
                      innerRadius={30}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={5}
                      cornerRadius={5}
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#ef4444" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <p>303 Presence</p>
              </div>
              <div className="text-center">
                <ResponsiveContainer width={100} height={100}>
                  <PieChart>
                    <Pie
                      data={[{ value: 0 }, { value: 100 }]}
                      dataKey="value"
                      innerRadius={30}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={5}
                      cornerRadius={5}
                    >
                      <Cell fill="#8b5cf6" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <p>0 Virtual Attendance</p>
              </div>
              <div className="text-center">
                <ResponsiveContainer width={100} height={100}>
                  <PieChart>
                    <Pie
                      data={[{ value: 19 }, { value: 303 }]}
                      dataKey="value"
                      innerRadius={30}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={5}
                      cornerRadius={5}
                    >
                      <Cell fill="#ef4444" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <p>19 Not Presence</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">RSVP</h2>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Going", value: 269 },
                      { name: "Not Going", value: 0 },
                      { name: "Virtual Attendance", value: 0 },
                      { name: "Not Submit", value: 53 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ef4444" />
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              className="mr-2"
              disabled={isLoading}
              onClick={() => {
                if (guestCategories.length === 0) {
                  Swal.fire({
                    icon: "error",
                    title: "No Guest Category",
                    text: "Please create a guest category first before adding a guest.",
                  });
                } else {
                  setSelectedGuest(null);
                  setIsDialogOpen(true);
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
            <ImportDialog
              onImport={handleImport}
              onDownloadTemplate={handleDownloadTemplate}
            />
            <Button variant="outline" className="mr-2" onClick={handleExport}>
              <Upload className="mr-2 h-4 w-4" /> Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Bulk Action <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Printer className="mr-2 h-4 w-4" /> Print Label
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <QrCode className="mr-2 h-4 w-4" /> Print QRCode
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" /> Send Whatsapp
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" /> Send Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80"
            />
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={7} className="text-center">
                  Data Guest
                </TableHead>
                <TableHead colSpan={10} className="text-center">
                  Guestbook & Web Invitation
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead>
                  <Input placeholder="Search..." className="w-32" />
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="p-4 text-center">
                  <Checkbox
                    checked={
                      guests.length > 0 &&
                      selectedGuests.length === guests.length
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGuests(guests.map((g) => g.id));
                      } else {
                        setSelectedGuests([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("name")}>
                    Fullname
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("guestCategoryId")}
                  >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("phoneNumber")}
                  >
                    Telephone
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
                  <Button variant="ghost" onClick={() => handleSort("address")}>
                    Address / Institution
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("notes")}>
                    Notes
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead>Date of Arrival</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("numberOfGuests")}
                  >
                    Number of Guest
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("session")}>
                    Session
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("tableNumber")}
                  >
                    Table no
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Signature</TableHead>
                <TableHead>Status (WA)</TableHead>
                <TableHead>Status (Email)</TableHead>
                <TableHead>Status on website</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="p-4 text-center">
                    <Checkbox
                      checked={selectedGuests.includes(guest.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGuests([...selectedGuests, guest.id]);
                        } else {
                          setSelectedGuests(
                            selectedGuests.filter((id) => id !== guest.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEdit(guest)}
                    >
                      {guest.name}
                    </button>
                  </TableCell>
                  <TableCell>
                    {
                      guestCategories.find(
                        (c) => c.id === guest.guestCategoryId
                      )?.name
                    }
                  </TableCell>
                  <TableCell>{guest.phoneNumber}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.address}</TableCell>
                  <TableCell>{guest.notes}</TableCell>
                  <TableCell>2024-07-06</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>2024-07-06</TableCell>
                  <TableCell>{guest.numberOfGuests}</TableCell>
                  <TableCell>{guest.session}</TableCell>
                  <TableCell>{guest.tableNumber}</TableCell>
                  <TableCell>Signed</TableCell>
                  <TableCell>Sent</TableCell>
                  <TableCell>Sent</TableCell>
                  <TableCell>Viewed</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEdit(guest)}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(guest.id)}
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedGuest ? "Edit Guest" : "Add Guest"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={selectedGuest ? "col-span-1" : "md:col-span-2"}>
              <form id="guest-form" onSubmit={handleAddGuest}>
                <Accordion type="multiple" defaultValue={["item-1"]}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>General</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-left" required>
                            Fullname
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            defaultValue={selectedGuest?.name}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="guestCategoryId"
                            className="text-left"
                            required
                          >
                            Category
                          </Label>
                          <Select
                            name="guestCategoryId"
                            defaultValue={selectedGuest?.guestCategoryId}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {guestCategories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phoneNumber" className="text-left">
                            Telephone
                          </Label>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            defaultValue={selectedGuest?.phoneNumber}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-left">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            defaultValue={selectedGuest?.email}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-left">
                            Address
                          </Label>
                          <Textarea
                            id="address"
                            name="address"
                            defaultValue={selectedGuest?.address}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Event</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="numberOfGuests"
                            className="text-left"
                          >
                            Number of Guests
                          </Label>
                          <Input
                            id="numberOfGuests"
                            name="numberOfGuests"
                            type="number"
                            defaultValue={selectedGuest?.numberOfGuests}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="session" className="text-left">
                            Session
                          </Label>
                          <Input
                            id="session"
                            name="session"
                            defaultValue={selectedGuest?.session}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tableNumber" className="text-left">
                            Table No.
                          </Label>
                          <Input
                            id="tableNumber"
                            name="tableNumber"
                            defaultValue={selectedGuest?.tableNumber}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Other</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="notes" className="text-left">
                            Notes
                          </Label>
                          <Textarea
                            id="notes"
                            name="notes"
                            defaultValue={selectedGuest?.notes}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>
            </div>
            {selectedGuest && (
              <div className="col-span-1">
                <Tabs defaultValue="qrcode">
                  <TabsList>
                    <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                    <TabsTrigger value="journey">Guest Journey</TabsTrigger>
                  </TabsList>
                  <TabsContent value="qrcode">
                    <div className="flex flex-col items-center justify-center p-6">
                      <p className="mb-2">Link Invitation</p>
                      <a
                        href={`https://ecoforum2025.com/?c=${selectedGuest?.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mb-4"
                      >
                        ecoforum2025.com/?c={selectedGuest?.id}
                      </a>
                      <div className="flex gap-2 mb-4">
                        <Button
                          variant="link"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `https://ecoforum2025.com/?c=${selectedGuest?.id}`
                            )
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" /> Copy Link
                        </Button>
                        <Button variant="link">
                          <Share2 className="mr-2 h-4 w-4" /> Share Link
                        </Button>
                      </div>
                      <QRCodeSVG
                        value={`https://ecoforum2025.com/?c=${selectedGuest?.id}`}
                        size={128}
                      />
                      <p className="mt-4">Message Template</p>
                      <Select>
                        <SelectTrigger className="w-[180px] mt-2">
                          <SelectValue placeholder="AUTOSEND WA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wa">AUTOSEND WA</SelectItem>
                          <SelectItem value="email">
                            AUTOSEND EMAIL
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" /> Send by
                          Whatsapp
                        </Button>
                        <Button variant="outline">
                          <Mail className="mr-2 h-4 w-4" /> Send by Email
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="journey">
                    <p>Guest journey details will be here.</p>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
            <Button type="submit" form="guest-form">
              <Pencil className="mr-2 h-4 w-4" />
              {selectedGuest ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
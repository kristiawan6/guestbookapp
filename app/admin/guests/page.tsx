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
  User,
  Phone,
  MapPin,
  Users,
  Calendar,
  Hash,
  FileText,
  Sparkles,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { TemplateSelectionPopup } from "@/components/ui/template-selection-popup";
import { QRCardGenerator } from "@/components/ui/qr-card-generator";

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
  
  // Popup states
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = useState(false);
  const [templateType, setTemplateType] = useState<"WhatsApp" | "Email">("WhatsApp");
  const [isQRCardGeneratorOpen, setIsQRCardGeneratorOpen] = useState(false);
  const [isIndividualEmailTemplateOpen, setIsIndividualEmailTemplateOpen] = useState(false);
  const [individualEmailGuest, setIndividualEmailGuest] = useState<Guest | null>(null);
  const [isIndividualWhatsAppTemplateOpen, setIsIndividualWhatsAppTemplateOpen] = useState(false);
  const [individualWhatsAppGuest, setIndividualWhatsAppGuest] = useState<Guest | null>(null);

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

  // Bulk action handlers
  const handleBulkWhatsApp = () => {
    if (selectedGuests.length === 0) {
      Swal.fire("No guests selected", "Please select at least one guest to send WhatsApp messages.", "warning");
      return;
    }
    setTemplateType("WhatsApp");
    setIsTemplatePopupOpen(true);
  };

  const handleBulkEmail = () => {
    if (selectedGuests.length === 0) {
      Swal.fire("No guests selected", "Please select at least one guest to send emails.", "warning");
      return;
    }
    setTemplateType("Email");
    setIsTemplatePopupOpen(true);
  };

  const handleQRCardGeneration = () => {
    if (selectedGuests.length === 0) {
      Swal.fire("No guests selected", "Please select at least one guest to generate QR cards.", "warning");
      return;
    }
    setIsQRCardGeneratorOpen(true);
  };

  // Individual guest email handler
  const handleSendIndividualEmail = async (guest: any) => {
    if (!guest.email) {
      Swal.fire("No Email", "This guest doesn't have an email address.", "warning");
      return;
    }

    // Open template selection popup for individual email
    setIndividualEmailGuest(guest);
    setTemplateType("Email");
    setIsIndividualEmailTemplateOpen(true);
  };

  // Individual guest WhatsApp handler
  const handleSendIndividualWhatsApp = async (guest: any) => {
    if (!guest.phoneNumber) {
      Swal.fire("No Phone Number", "This guest doesn't have a phone number.", "warning");
      return;
    }

    // Open template selection popup for individual WhatsApp
    setIndividualWhatsAppGuest(guest);
    setTemplateType("WhatsApp");
    setIsIndividualWhatsAppTemplateOpen(true);
  };

  const handleTemplateSelect = async (template: any) => {
    try {
      const response = await fetch('/api/guests/send-bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          guestIds: selectedGuests,
          type: templateType,
          eventId: selectedEventId,
        }),
      });

      if (response.ok) {
        Swal.fire(
          "Success!", 
          `${templateType} messages sent to ${selectedGuests.length} guest(s)!`, 
          "success"
        );
        setSelectedGuests([]);
      } else {
        throw new Error('Failed to send messages');
      }
    } catch (error) {
      Swal.fire(
        "Error!", 
        `Failed to send ${templateType} messages. Please try again.`, 
        "error"
      );
    }
  };

  const handleIndividualTemplateSelect = async (template: any) => {
    if (!individualEmailGuest) return;

    try {
      // Use the dedicated send-email endpoint for individual emails
      const response = await fetch('/api/guests/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestIds: [individualEmailGuest.id],
          templateId: template.id,
          eventId: selectedEventId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          Swal.fire(
            "Email Sent!", 
            `Email successfully sent to ${individualEmailGuest.email}`, 
            "success"
          );
        } else {
          throw new Error(result.errors?.[0]?.error || 'Failed to send email');
        }
        setIsIndividualEmailTemplateOpen(false);
        setIndividualEmailGuest(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Individual email error:', error);
      Swal.fire(
        "Error!", 
        `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        "error"
      );
    }
  };

  const handleIndividualWhatsAppTemplateSelect = async (template: any) => {
    if (!individualWhatsAppGuest) return;

    try {
      // Use the dedicated send-whatsapp endpoint for individual WhatsApp messages
      const response = await fetch('/api/guests/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestId: individualWhatsAppGuest.id,
          templateId: template.id,
          eventId: selectedEventId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          Swal.fire(
            "WhatsApp Sent!", 
            `WhatsApp message successfully sent to ${individualWhatsAppGuest.phoneNumber}`, 
            "success"
          );
        } else {
          throw new Error(result.error || 'Failed to send WhatsApp message');
        }
        setIsIndividualWhatsAppTemplateOpen(false);
        setIndividualWhatsAppGuest(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to send WhatsApp message');
      }
    } catch (error) {
      console.error('Individual WhatsApp error:', error);
      Swal.fire(
        "Error!", 
        `Failed to send WhatsApp message: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        "error"
      );
    }
  };

  const handleBulkDelete = async () => {
    if (selectedGuests.length === 0) {
      Swal.fire("No guests selected", "Please select at least one guest to delete.", "warning");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedGuests.length} guest(s). This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(
            selectedGuests.map(guestId => 
              fetch(`/api/events/${selectedEventId}/guests/${guestId}`, {
                method: "DELETE",
              })
            )
          );
          fetchGuests();
          setSelectedGuests([]);
          Swal.fire("Deleted!", `${selectedGuests.length} guest(s) have been deleted.`, "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete some guests. Please try again.", "error");
        }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Attendance Overview Card */}
          <div className="bg-white border-0 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Attendance Overview</h3>
              <div className="text-sm text-gray-500">Total: {meta?.total || 0} Guests</div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Present", value: 303, color: "#10b981" },
                        { name: "Virtual", value: 0, color: "#3b82f6" },
                        { name: "Absent", value: 19, color: "#ef4444" }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#ef4444" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">322</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Present</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">303</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Virtual</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Absent</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">19</span>
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Status Card */}
          <div className="bg-white border-0 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">RSVP Status</h3>
              <div className="text-sm text-gray-500">Response Rate: 85%</div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Going", value: 269, color: "#10b981" },
                        { name: "Not Going", value: 0, color: "#ef4444" },
                        { name: "Virtual Attendance", value: 0, color: "#8b5cf6" },
                        { name: "Not Submit", value: 53, color: "#e5e7eb" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#ef4444" />
                      <Cell fill="#8b5cf6" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Confirmed</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">269</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Declined</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">Virtual Only</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">No Response</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">53</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Action Bar */}
        <div className="bg-white border-0 shadow-lg rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Top Row - Main Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button 
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md text-sm"
                >
                  <Plus className="mr-1 sm:mr-2 h-4 w-4" /> 
                  <span className="hidden sm:inline">Add Guest</span>
                  <span className="sm:hidden">Add</span>
                </Button>
                <ImportDialog
                  onImport={handleImport}
                  onDownloadTemplate={handleDownloadTemplate}
                />
                <Button 
                  variant="outline" 
                  onClick={handleExport}
                  className="border-gray-300 hover:bg-gray-50 text-sm"
                >
                  <Upload className="mr-1 sm:mr-2 h-4 w-4" /> 
                  <span className="hidden sm:inline">Export</span>
                  <span className="sm:hidden">Export</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline"
                      disabled={selectedGuests.length === 0}
                      className="border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-sm"
                    >
                      <span className="hidden sm:inline">Bulk Actions ({selectedGuests.length})</span>
                      <span className="sm:hidden">Bulk ({selectedGuests.length})</span>
                      <ChevronDown className="ml-1 sm:ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>
                      <Printer className="mr-2 h-4 w-4" /> Print Labels
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleQRCardGeneration}>
                      <QrCode className="mr-2 h-4 w-4" /> Print QR Codes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleBulkWhatsApp}>
                      <MessageSquare className="mr-2 h-4 w-4" /> Send WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleBulkEmail}>
                      <Mail className="mr-2 h-4 w-4" /> Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleBulkDelete} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-sm sm:w-auto w-full">
                <Printer className="mr-1 sm:mr-2 h-4 w-4" /> Print
              </Button>
            </div>
            
            {/* Bottom Row - Search and Selection Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Input
                placeholder="Search guests by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
              {selectedGuests.length > 0 && (
                <div className="text-sm text-gray-600 whitespace-nowrap px-3 py-2 bg-blue-50 rounded-md">
                  {selectedGuests.length} selected
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main Table Card */}
        <div className="bg-white border-0 shadow-lg rounded-xl overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Guest Records</h3>
              <div className="text-sm text-gray-500">
                Showing {guests.length} of {meta?.total || 0} guests
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50/50">
              <TableRow className="hidden lg:table-row">
                <TableHead colSpan={7} className="text-center">
                  Data Guest
                </TableHead>
                <TableHead colSpan={10} className="text-center">
                  Guestbook & Web Invitation
                </TableHead>
              </TableRow>

                <TableRow className="border-b border-gray-200">
                  <TableHead className="w-12 sm:w-16 text-center py-4 sm:py-6 px-2 sm:px-4">
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
                      className="border-gray-400"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 min-w-[120px]">
                    <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-xs sm:text-sm">
                      <span className="hidden sm:inline">Full Name</span>
                      <span className="sm:hidden">Name</span>
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell font-semibold text-gray-700 py-4">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("guestCategoryId")}
                      className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-sm"
                    >
                      Category
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 min-w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("phoneNumber")}
                      className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Phone Number</span>
                      <span className="sm:hidden">Phone</span>
                      <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold text-gray-700 py-4">
                    <Button variant="ghost" onClick={() => handleSort("email")} className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-sm">
                      Email Address
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4">
                    <Button variant="ghost" onClick={() => handleSort("address")} className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-sm">
                      Address / Institution
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4">
                    <Button variant="ghost" onClick={() => handleSort("notes")} className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-sm">
                      Notes
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold text-gray-700 py-4 text-sm">Created Date</TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4 text-sm">Created By</TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4 text-sm">Arrival Date</TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold text-gray-700 py-4">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("numberOfGuests")}
                      className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-sm"
                    >
                      Guest Count
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4">
                    <Button variant="ghost" onClick={() => handleSort("session")} className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-sm">
                      Session
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell font-semibold text-gray-700 py-4">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("tableNumber")}
                      className="h-auto p-0 font-semibold text-gray-700 hover:text-gray-900 text-sm"
                    >
                      Table No.
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4 text-sm">Signature</TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4 text-sm">WhatsApp Status</TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4 text-sm">Email Status</TableHead>
                  <TableHead className="hidden xl:table-cell font-semibold text-gray-700 py-4 text-sm">Website Status</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-4 text-sm">Actions</TableHead>
                </TableRow>
            </TableHeader>
              <TableBody>
                {guests.map((guest, index) => (
                  <TableRow key={guest.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <TableCell className="w-12 sm:w-16 text-center py-4 sm:py-6 px-2 sm:px-4">
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
                        className="border-gray-400"
                      />
                    </TableCell>
                    <TableCell className="py-4 min-w-[120px]">
                      <button
                        className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline transition-colors text-xs sm:text-sm"
                        onClick={() => handleEdit(guest)}
                      >
                        <div className="truncate">{guest.name}</div>
                      </button>
                      <div className="md:hidden text-xs text-gray-500 mt-1">
                        {
                          guestCategories.find(
                            (c) => c.id === guest.guestCategoryId
                          )?.name || 'N/A'
                        }
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {
                          guestCategories.find(
                            (c) => c.id === guest.guestCategoryId
                          )?.name || 'N/A'
                        }
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-gray-700 min-w-[100px] text-xs sm:text-sm">
                      <div className="truncate">{guest.phoneNumber || '-'}</div>
                      <div className="lg:hidden text-xs text-gray-500 mt-1 truncate">
                        {guest.email || '-'}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell py-4 text-gray-700 text-sm">
                      <div className="truncate max-w-[150px]">{guest.email || '-'}</div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell py-4 text-gray-700 max-w-xs truncate text-sm">{guest.address || '-'}</TableCell>
                    <TableCell className="hidden xl:table-cell py-4 text-gray-700 max-w-xs truncate text-sm">{guest.notes || '-'}</TableCell>
                    <TableCell className="hidden lg:table-cell py-4 text-gray-600 text-sm">2024-07-06</TableCell>
                    <TableCell className="hidden xl:table-cell py-4 text-gray-600 text-sm">Admin</TableCell>
                    <TableCell className="hidden xl:table-cell py-4 text-gray-600 text-sm">2024-07-06</TableCell>
                    <TableCell className="hidden lg:table-cell py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                        {guest.numberOfGuests}
                      </span>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell py-4 text-gray-700 text-sm">{guest.session || '-'}</TableCell>
                    <TableCell className="hidden lg:table-cell py-4 text-gray-700 text-sm">{guest.tableNumber || '-'}</TableCell>
                    <TableCell className="hidden xl:table-cell py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Signed
                      </span>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Sent
                      </span>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Sent
                      </span>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Viewed
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(guest)}
                          className="h-7 sm:h-8 px-2 sm:px-3 text-xs border-gray-300 hover:bg-gray-50"
                        >
                          <Pencil className="h-3 w-3 sm:mr-1" /> 
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(guest.id)}
                          className="h-7 sm:h-8 px-2 sm:px-3 text-xs border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                        >
                          <Trash2 className="h-3 w-3 sm:mr-1" /> 
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <div className="text-xs sm:text-sm text-gray-700 order-2 sm:order-1">
                  <span className="hidden sm:inline">
                    Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
                  </span>
                  <span className="sm:hidden">
                    {((meta.page - 1) * meta.limit) + 1}-{Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
                  </span>
                </div>
                <div className="flex items-center gap-2 order-1 sm:order-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="border-gray-300 h-8 px-3 text-xs"
                  >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </Button>
                  <span className="text-xs sm:text-sm text-gray-600 px-2">
                    {meta.page}/{meta.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(meta.totalPages, page + 1))}
                    disabled={page >= meta.totalPages}
                    className="border-gray-300 h-8 px-3 text-xs"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                {selectedGuest ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-white">
                  {selectedGuest ? "Edit Guest" : "Add New Guest"}
                </DialogTitle>
                <p className="text-blue-100 text-sm mt-1">
                  {selectedGuest ? "Update guest information and settings" : "Create a new guest profile with all necessary details"}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={selectedGuest ? "col-span-1" : "md:col-span-2"}>
              <form id="guest-form" onSubmit={handleAddGuest} className="space-y-6">
                {/* Personal Information Card */}
                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5 text-blue-600" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                          <User className="h-4 w-4 text-gray-500" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          defaultValue={selectedGuest?.name}
                          placeholder="Enter full name"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guestCategoryId" className="flex items-center gap-2 font-medium">
                          <Hash className="h-4 w-4 text-gray-500" />
                          Category *
                        </Label>
                        <Select
                          name="guestCategoryId"
                          defaultValue={selectedGuest?.guestCategoryId}
                        >
                          <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {guestCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="flex items-center gap-2 font-medium">
                          <Phone className="h-4 w-4 text-gray-500" />
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          defaultValue={selectedGuest?.phoneNumber}
                          placeholder="Enter phone number"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                          <Mail className="h-4 w-4 text-gray-500" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={selectedGuest?.email}
                          placeholder="Enter email address"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2 font-medium">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        defaultValue={selectedGuest?.address}
                        placeholder="Enter full address"
                        className="focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                      />
                    </div>
                  </CardContent>
                </Card>
                {/* Event Details Card */}
                <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                      Event Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfGuests" className="flex items-center gap-2 font-medium">
                          <Users className="h-4 w-4 text-gray-500" />
                          Number of Guests
                        </Label>
                        <Input
                          id="numberOfGuests"
                          name="numberOfGuests"
                          type="number"
                          min="1"
                          defaultValue={selectedGuest?.numberOfGuests}
                          placeholder="1"
                          className="focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session" className="flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          Session
                        </Label>
                        <Input
                          id="session"
                          name="session"
                          defaultValue={selectedGuest?.session}
                          placeholder="Enter session"
                          className="focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tableNumber" className="flex items-center gap-2 font-medium">
                          <Hash className="h-4 w-4 text-gray-500" />
                          Table Number
                        </Label>
                        <Input
                          id="tableNumber"
                          name="tableNumber"
                          defaultValue={selectedGuest?.tableNumber}
                          placeholder="Table #"
                          className="focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Additional Notes Card */}
                <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Additional Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="flex items-center gap-2 font-medium">
                        <FileText className="h-4 w-4 text-gray-500" />
                        Notes & Comments
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        defaultValue={selectedGuest?.notes}
                        placeholder="Add any additional notes or comments about this guest..."
                        className="focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>
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
                        <Button 
                          variant="outline"
                          onClick={() => selectedGuest && handleSendIndividualWhatsApp(selectedGuest)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" /> Send by
                          Whatsapp
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => selectedGuest && handleSendIndividualEmail(selectedGuest)}
                        >
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
          <DialogFooter className="bg-gray-50 px-6 py-4 -mx-6 -mb-6 mt-6 rounded-b-lg border-t">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="h-4 w-4" />
                <span>All fields marked with * are required</span>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  form="guest-form"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  {selectedGuest ? (
                    <>
                      <Pencil className="mr-2 h-4 w-4" />
                      Update Guest
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Guest
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Template Selection Popup for Bulk Actions */}
      <TemplateSelectionPopup
        isOpen={isTemplatePopupOpen}
        onClose={() => setIsTemplatePopupOpen(false)}
        onSelectTemplate={handleTemplateSelect}
        type={templateType}
        selectedGuestIds={selectedGuests}
      />
      
      {/* Template Selection Popup for Individual Email */}
      <TemplateSelectionPopup
        isOpen={isIndividualEmailTemplateOpen}
        onClose={() => {
          setIsIndividualEmailTemplateOpen(false);
          setIndividualEmailGuest(null);
        }}
        onSelectTemplate={handleIndividualTemplateSelect}
        type="Email"
        selectedGuestIds={individualEmailGuest ? [individualEmailGuest.id] : []}
      />
      
      {/* Template Selection Popup for Individual WhatsApp */}
      <TemplateSelectionPopup
        isOpen={isIndividualWhatsAppTemplateOpen}
        onClose={() => {
          setIsIndividualWhatsAppTemplateOpen(false);
          setIndividualWhatsAppGuest(null);
        }}
        onSelectTemplate={handleIndividualWhatsAppTemplateSelect}
        type="WhatsApp"
        selectedGuestIds={individualWhatsAppGuest ? [individualWhatsAppGuest.id] : []}
      />
      
      {/* QR Card Generator */}
      <QRCardGenerator
        isOpen={isQRCardGeneratorOpen}
        onClose={() => setIsQRCardGeneratorOpen(false)}
        selectedGuestIds={selectedGuests}
      />
    </>
  );
}
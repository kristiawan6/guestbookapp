"use client";

import { ArrowUpDown, Pencil, Trash2, MessageSquare, FileText, CheckCircle, Sparkles } from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useStatistics } from "@/hooks/use-statistics";
import Swal from "sweetalert2";

type Message = {
  id: string;
  content: string;
  timestamp: string;
  approved: boolean;
  guest: {
    name: string;
  };
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function GuestbookPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { selectedEventId } = useStatistics();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [sortKey, setSortKey] = useState<keyof Message>("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchMessages = useCallback(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/messages?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.data);
          setMeta(data.meta);
        });
    }
  }, [page, search, selectedEventId, sortKey, sortOrder]);

  useEffect(() => {
    if (selectedEventId) {
      fetchMessages();
    }
  }, [fetchMessages, selectedEventId]);

  const handleUpdateMessage = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!selectedMessage) return;

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch(
      `/api/events/${selectedEventId}/messages/${selectedMessage.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          approved: data.approved === "on",
        }),
      }
    );

    fetchMessages();
    setIsDialogOpen(false);
    setSelectedMessage(null);
  };

  const handleEdit = (message: Message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const handleDelete = async (messageId: string) => {
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
        await fetch(`/api/events/${selectedEventId}/messages/${messageId}`, {
          method: "DELETE",
        });
        fetchMessages();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };


  const handleSort = (key: keyof Message) => {
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
        <h1 className="text-2xl font-bold">Guestbook</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("guest")}>
                  Guest
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("content")}>
                  Message
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("timestamp")}>
                  Timestamp
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("approved")}>
                  Approved
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message, index) => (
              <TableRow key={message.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{message.guest.name}</TableCell>
                <TableCell>{message.content}</TableCell>
                <TableCell>
                  {new Date(message.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{message.approved ? "Y" : "N"}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(message)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(message.id)}
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 -mx-6 -mt-6 px-6 py-4 mb-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-white text-xl">
                <MessageSquare className="h-6 w-6" />
                Edit Message
              </DialogTitle>
              <p className="text-blue-100 text-sm mt-1">
                Review and moderate guest message content
              </p>
            </DialogHeader>
          </div>

          <form id="message-form" onSubmit={handleUpdateMessage} className="space-y-6">
            {/* Message Content Card */}
            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Message Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="content" className="flex items-center gap-2 font-medium">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    Guest Message
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    defaultValue={selectedMessage?.content}
                    placeholder="Enter the guest message content..."
                    className="focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Approval Status Card */}
            <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Approval Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="approved"
                    name="approved"
                    defaultChecked={selectedMessage?.approved}
                    className="focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex flex-col">
                    <Label htmlFor="approved" className="flex items-center gap-2 font-medium cursor-pointer">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      Approve this message for public display
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Approved messages will be visible to all guests
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>

          <DialogFooter className="bg-gray-50 px-6 py-4 -mx-6 -mb-6 mt-6 rounded-b-lg border-t">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="h-4 w-4" />
                <span>Changes will be applied immediately</span>
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
                  form="message-form"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Update Message
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
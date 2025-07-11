"use client";

import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function GuestbookPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { selectedEventId } = useStatistics();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);
  const [sortKey, setSortKey] = useState<keyof Message>("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchMessages = () => {
    if (selectedEventId) {
      fetch(`/api/events/${selectedEventId}/messages?search=${search}&page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.data);
          setMeta(data.meta);
        });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedEventId, search, page, sortKey, sortOrder]);

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

  const sortedMessages = [...messages].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

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
            {sortedMessages.map((message, index) => (
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateMessage}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Input
                  id="content"
                  name="content"
                  defaultValue={selectedMessage?.content}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="approved" className="text-right">
                  Approved
                </Label>
                <Checkbox
                  id="approved"
                  name="approved"
                  defaultChecked={selectedMessage?.approved}
                />
              </div>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
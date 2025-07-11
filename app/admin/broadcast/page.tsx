"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStatistics } from "@/hooks/use-statistics";
import Papa from "papaparse";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type BroadcastTemplate = {
  id: string;
  name: string;
  type: string;
  content: string;
};

export default function BroadcastTemplatePage() {
  const [templates, setTemplates] = useState<BroadcastTemplate[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { selectedEventId, isLoading } = useStatistics();
  const [activeTab, setActiveTab] = useState("whatsapp");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);

  const fetchTemplates = () => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/broadcast-templates?search=${search}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTemplates(data.data);
          setMeta(data.meta);
        });
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [selectedEventId, search, page]);

  const handleDelete = async (templateId: string) => {
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
        await fetch(
          `/api/events/${selectedEventId}/broadcast-templates/${templateId}`,
          {
            method: "DELETE",
          }
        );
        fetchTemplates();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleAddTemplate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch(`/api/events/${selectedEventId}/broadcast-templates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, type: activeTab }),
    });

    fetchTemplates();
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Broadcast Template</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
        </div>
      </div>
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === "whatsapp" ? "default" : "outline"}
          onClick={() => setActiveTab("whatsapp")}
        >
          Show Template for Whatsapp
        </Button>
        <Button
          variant={activeTab === "email" ? "default" : "outline"}
          onClick={() => setActiveTab("email")}
        >
          Show Template for Email
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Link href="/admin/broadcast/add">
            <Button variant="outline" className="w-full h-32">
              <Plus className="mr-2 h-4 w-4" /> Add Template
            </Button>
          </Link>
        </div>
        {templates
          .filter((template) => template.type === activeTab)
          .map((template, index) => (
            <div key={template.id} className="col-span-1">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="font-bold">
                  {index + 1}. {template.name}
                </h2>
                <p className="text-sm text-gray-500">{template.content}</p>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() =>
                      router.push(`/admin/broadcast/edit/${template.id}`)
                    }
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
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
  );
}
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStatistics } from "@/hooks/use-statistics";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type BroadcastTemplate = {
  id: string;
  name: string;
  type: string;
  content: string;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function BroadcastTemplatePage() {
  const [templates, setTemplates] = useState<BroadcastTemplate[]>([]);
  const { selectedEventId } = useStatistics();
  const [activeTab, setActiveTab] = useState("whatsapp");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);

  const fetchTemplates = useCallback(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/broadcast-templates?search=${search}&page=${page}&type=${activeTab}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTemplates(data.data || []);
          setMeta(data.meta);
        });
    }
  }, [selectedEventId, search, page, activeTab]);

  useEffect(() => {
    if (selectedEventId) {
      fetchTemplates();
    }
  }, [fetchTemplates, selectedEventId]);

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <i className="fab fa-whatsapp text-green-500"></i>
          <i className="far fa-envelope"></i>
          Broadcast Template
        </h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
        </div>
      </div>
      <div className="flex border-b">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "whatsapp"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("whatsapp")}
        >
          Show Template for Whatsapp
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "email"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("email")}
        >
          Show Template for Email
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <Link href="/admin/broadcast/add">
          <div
            className="w-full min-h-[12rem] h-full bg-cover bg-center rounded-lg shadow-md flex items-center justify-center cursor-pointer"
            style={{ backgroundImage: "url('/wa-bg.png')" }}
          >
            <div className="bg-green-100 text-green-800 rounded-full px-4 py-2 border border-green-300">
              Add Template
            </div>
          </div>
        </Link>
        {templates.map((template) => (
          <div key={template.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm">{template.name}</h3>
              <div className="flex gap-2">
                <Pencil
                  className="h-4 w-4 text-gray-500 cursor-pointer"
                  onClick={() =>
                    router.push(`/admin/broadcast/edit/${template.id}`)
                  }
                />
                <Trash2
                  className="h-4 w-4 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(template.id)}
                />
              </div>
            </div>
            <div className="bg-cover bg-center p-4 rounded-md" style={{ backgroundImage: "url('/wa-bg.png')" }}>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-800" dangerouslySetInnerHTML={{ __html: template.content.replace(/\n/g, '<br />') }}></p>
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
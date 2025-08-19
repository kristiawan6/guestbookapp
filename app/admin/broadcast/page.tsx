"use client";

import { Pencil, Trash2, Plus, MessageSquare, Mail, Search, Send, FileText, Activity, BarChart3 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatistics } from "@/hooks/use-statistics";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DOMPurify from "isomorphic-dompurify";

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
  const [whatsappCount, setWhatsappCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);

  const fetchTemplateCounts = useCallback(() => {
    if (selectedEventId) {
      // Fetch WhatsApp template count
      fetch(`/api/events/${selectedEventId}/broadcast-templates?type=whatsapp&limit=1`)
        .then((res) => res.json())
        .then((data) => {
          setWhatsappCount(data.meta?.total || 0);
        })
        .catch(() => setWhatsappCount(0));
      
      // Fetch Email template count
      fetch(`/api/events/${selectedEventId}/broadcast-templates?type=email&limit=1`)
        .then((res) => res.json())
        .then((data) => {
          setEmailCount(data.meta?.total || 0);
        })
        .catch(() => setEmailCount(0));
    }
  }, [selectedEventId]);

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
      fetchTemplateCounts();
    }
  }, [fetchTemplates, fetchTemplateCounts, selectedEventId]);

  useEffect(() => {
    if (selectedEventId) {
      fetchTemplateCounts();
    }
  }, [fetchTemplateCounts, selectedEventId]);

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
        fetchTemplateCounts();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-emerald-600" />
              <Mail className="h-6 w-6 text-blue-600" />
              Broadcast Templates
            </h1>
            <p className="text-gray-600 mt-1">Manage your WhatsApp and Email broadcast templates</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-80 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+18%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{whatsappCount + emailCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+25%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">WhatsApp Templates</p>
              <p className="text-2xl font-bold text-gray-900">{whatsappCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+12%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Email Templates</p>
              <p className="text-2xl font-bold text-gray-900">{emailCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Send className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+8%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Template Type Tabs */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-200 p-0">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                activeTab === "whatsapp"
                  ? "bg-green-50 border-b-2 border-green-500 text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("whatsapp")}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp Templates
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  activeTab === "whatsapp" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {whatsappCount}
                </span>
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                activeTab === "email"
                  ? "bg-blue-50 border-b-2 border-blue-500 text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("email")}
            >
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Email Templates
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  activeTab === "email" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {emailCount}
                </span>
              </div>
            </button>
          </div>
        </CardHeader>
        {/* Templates Grid */}
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link href={`/admin/broadcast/add?type=${activeTab}`}>
              <div className="group w-full min-h-[12rem] h-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 transition-all duration-200">
                <div className="text-center">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    activeTab === 'whatsapp' 
                      ? 'bg-green-100 text-green-600 group-hover:bg-green-200' 
                      : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                  }`}>
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Add {activeTab === 'whatsapp' ? 'WhatsApp' : 'Email'} Template
                  </p>
                </div>
              </div>
            </Link>
            {templates.map((template) => (
              <Card key={template.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {template.type === 'whatsapp' ? (
                          <MessageSquare className="h-4 w-4 text-green-600" />
                        ) : (
                          <Mail className="h-4 w-4 text-blue-600" />
                        )}
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{template.name}</h3>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        template.type === 'whatsapp' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}>
                        {template.type === 'whatsapp' ? 'WhatsApp' : 'Email'}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/broadcast/edit/${template.id}`)}
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(template.id)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border-2 border-dashed transition-colors duration-200 ${
                    template.type === 'whatsapp' 
                      ? 'bg-green-50 border-green-200 group-hover:border-green-300' 
                      : 'bg-blue-50 border-blue-200 group-hover:border-blue-300'
                  }`}>
                    <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                      <p
                        className="text-xs text-gray-700 line-clamp-4 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            template.content.replace(/\n/g, "<br />")
                          ),
                        }}
                      ></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} templates
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                >
                  Previous
                </Button>
                <span className="text-sm font-medium text-gray-700 px-3">
                  Page {meta.page} of {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.min(meta.totalPages, page + 1))}
                  disabled={page >= meta.totalPages}
                  className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
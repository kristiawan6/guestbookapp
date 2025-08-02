"use client";

import {
  ArrowUpDown,
  Pencil,
  Plus,
  Trash2,
  Upload,
  Search,
  Tags,
  Users,
  CheckCircle,
  XCircle,
  Target,
  Activity,
  BarChart3,
  Hash,
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
import { useStatistics } from "@/hooks/use-statistics";
import Papa from "papaparse";
import Swal from "sweetalert2";

type GuestCategory = {
  id: string;
  code: string;
  name: string;
  description: string;
  quota: number;
  isActive: boolean;
  eventId: string;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function GuestCategoryPage() {
  const [guestCategories, setGuestCategories] = useState<GuestCategory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<GuestCategory | null>(null);
  const { selectedEventId } = useStatistics();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [sortKey, setSortKey] = useState<keyof GuestCategory>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchGuestCategories = useCallback(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/guest-categories?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
      )
        .then((res) => res.json())
        .then((data) => {
          setGuestCategories(data.data);
          setMeta(data.meta);
        });
    }
  }, [page, search, selectedEventId, sortKey, sortOrder]);

  useEffect(() => {
    if (selectedEventId) {
      fetchGuestCategories();
    }
  }, [fetchGuestCategories, selectedEventId]);

  const handleAddCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const url = selectedCategory
      ? `/api/events/${selectedEventId}/guest-categories/${selectedCategory.id}`
      : `/api/events/${selectedEventId}/guest-categories`;

    const method = selectedCategory ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          quota: parseInt(data.quota as string) || 0,
          isActive: data.isActive === "on",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      fetchGuestCategories();
      setIsDialogOpen(false);
      setSelectedCategory(null);
      Swal.fire({
        icon: "success",
        title: `Category ${
          selectedCategory ? "updated" : "created"
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

  const handleEdit = (category: GuestCategory) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
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
        const response = await fetch(
          `/api/events/${selectedEventId}/guest-categories/${categoryId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchGuestCategories();
          Swal.fire("Deleted!", "The category has been deleted.", "success");
        } else {
          const errorData = await response.json();
          Swal.fire(
            "Failed!",
            errorData.message || "Failed to delete the category.",
            "error"
          );
        }
      }
    });
  };

  const handleExport = () => {
    const csv = Papa.unparse(guestCategories);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "guest-categories.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleSort = (key: keyof GuestCategory) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Tags className="h-6 w-6 text-emerald-600" />
              Guest Categories
            </h1>
            <p className="text-gray-600 mt-1">Manage guest categories and quotas for your events</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-80 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <Tags className="h-6 w-6" />
                    </div>
                    <div>
                      <div>{selectedCategory ? "Edit" : "Create"} Guest Category</div>
                      <div className="text-sm font-normal opacity-90 mt-1">
                        {selectedCategory ? "Update category details" : "Add a new guest category"}
                      </div>
                    </div>
                  </DialogTitle>
                  {selectedCategory && (
                    <div className="flex items-center gap-2 mt-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        ID: {selectedCategory.code}
                      </Badge>
                      <Badge 
                        variant={selectedCategory.isActive ? "default" : "secondary"}
                        className={selectedCategory.isActive 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-500 text-white"
                        }
                      >
                        {selectedCategory.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  )}
                </DialogHeader>
              </div>

              <form onSubmit={handleAddCategory} className="p-6">
                <div className="space-y-6">
                  {selectedCategory && (
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Hash className="h-4 w-4 text-gray-500" />
                          <Label className="text-sm font-semibold text-gray-700">Category Code</Label>
                        </div>
                        <Input
                          id="code"
                          name="code"
                          defaultValue={selectedCategory?.code}
                          className="bg-gray-50 border-gray-200"
                          readOnly
                          placeholder="Auto-generated code"
                        />
                      </CardContent>
                    </Card>
                  )}

                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Tags className="h-4 w-4 text-blue-500" />
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Category Name *
                        </Label>
                      </div>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={selectedCategory?.name}
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter category name (e.g., VIP, Regular, Staff)"
                        required
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-4 w-4 text-green-500" />
                        <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                          Description
                        </Label>
                      </div>
                      <Input
                        id="description"
                        name="description"
                        defaultValue={selectedCategory?.description}
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="Brief description of this category"
                      />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="h-4 w-4 text-purple-500" />
                          <Label htmlFor="quota" className="text-sm font-semibold text-gray-700">
                            Guest Quota
                          </Label>
                        </div>
                        <Input
                          id="quota"
                          name="quota"
                          type="number"
                          min="0"
                          defaultValue={selectedCategory?.quota}
                          className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Maximum guests (0 = unlimited)"
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Settings className="h-4 w-4 text-orange-500" />
                          <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                            Status
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 pt-2">
                          <Checkbox
                            id="isActive"
                            name="isActive"
                            defaultChecked={selectedCategory?.isActive ?? true}
                            className="border-gray-300"
                          />
                          <Label htmlFor="isActive" className="text-sm text-gray-600">
                            Active category (guests can be assigned)
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <DialogFooter className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-gray-500">
                      {selectedCategory ? "Update" : "Create"} category with the information above
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setSelectedCategory(null)}
                        className="hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {selectedCategory ? "Update Category" : "Create Category"}
                      </Button>
                    </div>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
            <Button variant="outline" onClick={handleExport} className="border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
              <Upload className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Tags className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+12%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{meta?.total || 0}</p>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">{guestCategories.filter(c => c.isActive).length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-xs font-medium text-red-600">-3%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Inactive Categories</p>
              <p className="text-2xl font-bold text-gray-900">{guestCategories.filter(c => !c.isActive).length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-xs font-medium text-green-600">+15%</div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Quota</p>
              <p className="text-2xl font-bold text-gray-900">{guestCategories.reduce((sum, c) => sum + c.quota, 0)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Category Records</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Showing {guestCategories.length} of {meta?.total || 0} categories
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity className="h-4 w-4" />
              {guestCategories.filter(c => c.isActive).length} Active
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
                    onClick={() => handleSort("code")} 
                    className="hover:bg-gray-100 font-semibold text-gray-700"
                  >
                    Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort("name")} 
                    className="hover:bg-gray-100 font-semibold text-gray-700"
                  >
                    Category Name
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
                    onClick={() => handleSort("quota")} 
                    className="hover:bg-gray-100 font-semibold text-gray-700"
                  >
                    Quota
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
              {guestCategories.map((category, index) => (
                <TableRow key={category.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="font-medium text-gray-600 py-4">
                    {((page - 1) * 10) + index + 1}
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {category.code}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Tags className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-gray-700 max-w-xs">
                    <span className="truncate block">{category.description || '-'}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      <Target className="w-3 h-3 mr-1" />
                      {category.quota}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        category.isActive 
                          ? "bg-green-100 text-green-800 border border-green-200" 
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {category.isActive ? (
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
                  <TableCell className="text-center py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(category)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
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
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
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
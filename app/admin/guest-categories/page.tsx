"use client";

import {
  ArrowUpDown,
  Pencil,
  Plus,
  Trash2,
  Upload,
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Guest Category</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mr-2">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedCategory ? "Edit" : "Add"} Guest Category
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCategory}>
                <div className="grid gap-4 py-4">
                  {selectedCategory && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">
                        Code
                      </Label>
                      <Input
                        id="code"
                        name="code"
                        defaultValue={selectedCategory?.code}
                        className="col-span-3"
                        readOnly
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={selectedCategory?.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      defaultValue={selectedCategory?.description}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quota" className="text-right">
                      Quota
                    </Label>
                    <Input
                      id="quota"
                      name="quota"
                      type="number"
                      defaultValue={selectedCategory?.quota}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isActive" className="text-right">
                      Is Active
                    </Label>
                    <Checkbox
                      id="isActive"
                      name="isActive"
                      defaultChecked={selectedCategory?.isActive}
                    />
                  </div>
                </div>
                <Button type="submit">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleExport}>
            <Upload className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("code")}>
                  Code
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Category Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("description")}
                >
                  Description
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("quota")}>
                  Quota
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("isActive")}>
                  Active
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guestCategories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.code}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.quota}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      category.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(category)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
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
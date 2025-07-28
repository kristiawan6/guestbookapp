"use client";

import {
  Pencil,
  Plus,
  Trash2,
  Upload,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
import { useStatistics } from "@/hooks/use-statistics";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

type ClaimableItem = {
  id: string;
  name: string;
  description: string;
  totalQuantity: number;
  remainingQuantity: number;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function ClaimSouvenirPage() {
  const [items, setItems] = useState<ClaimableItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClaimableItem | null>(
    null
  );
  const { selectedEventId, isLoading } = useStatistics();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [sortKey, setSortKey] = useState<keyof ClaimableItem>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchItems = useCallback(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/claimable-items?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
      )
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          setMeta(data.meta);
        });
    }
  }, [selectedEventId, search, page, sortKey, sortOrder]);

  useEffect(() => {
    if (selectedEventId) {
      fetchItems();
    }
  }, [fetchItems, selectedEventId]);

  const handleSaveItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { totalQuantity, ...rest } = data;
    const body = {
      ...rest,
      quantity: parseInt(totalQuantity as string),
    };

    const url = selectedItem
      ? `/api/events/${selectedEventId}/claimable-items/${selectedItem.id}`
      : `/api/events/${selectedEventId}/claimable-items`;
    const method = selectedItem ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    fetchItems();
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleEdit = (item: ClaimableItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (itemId: string) => {
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
        await fetch(`/api/events/${selectedEventId}/claimable-items/${itemId}`, {
          method: "DELETE",
        });
        fetchItems();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Souvenirs");
    XLSX.writeFile(workbook, "souvenirs.xlsx");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Record a point, souvenir, photobooth or goodybag with the same QR Code
        </h1>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="mr-2"
                disabled={isLoading}
                onClick={() => setSelectedItem(null)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedItem ? "Edit" : "Add"} Claimable Item
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveItem}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right" required>
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={selectedItem?.name}
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
                      defaultValue={selectedItem?.description}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="totalQuantity"
                      className="text-right"
                      required
                    >
                      Total Quantity
                    </Label>
                    <Input
                      id="totalQuantity"
                      name="totalQuantity"
                      type="number"
                      defaultValue={selectedItem?.totalQuantity}
                      className="col-span-3"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(item)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <BarChart2 className="h-8 w-8 text-gray-400" />
              <span className="text-2xl font-bold text-red-500">
                {item.remainingQuantity}
              </span>
            </div>
            <Link href={`/admin/claim-souvenir/${item.id}`}>
              <Button variant="outline" className="w-full mt-4">
                Run Application
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import {
  ArrowUpDown,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
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
import { useStatistics } from "@/hooks/use-statistics";
import Papa from "papaparse";
import Swal from "sweetalert2";

type ClaimableItem = {
  id: string;
  name: string;
  description: string;
  totalQuantity: number;
  remainingQuantity: number;
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
  const [meta, setMeta] = useState<any>(null);
  const [sortKey, setSortKey] = useState<keyof ClaimableItem>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchItems = () => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/claimable-items?search=${search}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          setMeta(data.meta);
        });
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedEventId, search, page, sortKey, sortOrder]);

  const handleAddItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch(`/api/events/${selectedEventId}/claimable-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        totalQuantity: parseInt(data.totalQuantity as string),
        remainingQuantity: parseInt(data.totalQuantity as string),
      }),
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
    const csv = Papa.unparse(items);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "claimable-items.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof ClaimableItem) => {
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
        <h1 className="text-2xl font-bold">Claim Souvenir & etc</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mr-2" disabled={isLoading}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedItem ? "Edit" : "Add"} Claimable Item
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddItem}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
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
                    <Label htmlFor="totalQuantity" className="text-right">
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
      <div className="bg-white p-4 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Name
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
                <Button
                  variant="ghost"
                  onClick={() => handleSort("totalQuantity")}
                >
                  Total Quantity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("remainingQuantity")}
                >
                  Remaining Quantity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
                <TableCell>{item.remainingQuantity}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
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
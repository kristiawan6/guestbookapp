"use client";

import {
  Pencil,
  Plus,
  Trash2,
  Upload,
  BarChart2,
  Search,
  Gift,
  Package,
  Package2,
  Activity,
  TrendingUp,
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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



export default function ClaimSouvenirPage() {
  const [items, setItems] = useState<ClaimableItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClaimableItem | null>(
    null
  );
  const { selectedEventId, isLoading } = useStatistics();
  const [search, setSearch] = useState("");
  const [page] = useState(1);
  const [sortKey] = useState<keyof ClaimableItem>("name");
  const [sortOrder] = useState<"asc" | "desc">("asc");

  const fetchItems = useCallback(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/claimable-items?search=${search}&page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`
      )
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
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

  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.totalQuantity, 0);
  const remainingQuantity = items.reduce((sum, item) => sum + item.remainingQuantity, 0);
  const claimedQuantity = totalQuantity - remainingQuantity;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              Claim Souvenir Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Record points, souvenirs, photobooth or goodybag with QR Code</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full sm:w-64 lg:w-80 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                    disabled={isLoading}
                    onClick={() => setSelectedItem(null)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> <span className="sm:hidden">Add</span><span className="hidden sm:inline">Add Item</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-2">
                          <Gift className="h-6 w-6" />
                        </div>
                        <div>
                          <div>{selectedItem ? "Edit" : "Add"} Claimable Item</div>
                          <div className="text-sm font-normal opacity-90 mt-1">
                            {selectedItem
                              ? "Update item details"
                              : "Add a new claimable item to your system"}
                          </div>
                        </div>
                      </DialogTitle>
                      {selectedItem && (
                        <div className="flex items-center gap-2 mt-4">
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white border-white/30"
                          >
                            Item ID: {selectedItem.id}
                          </Badge>
                          <Badge
                            variant="default"
                            className="bg-blue-500 text-white"
                          >
                            {selectedItem.remainingQuantity} / {selectedItem.totalQuantity} Available
                          </Badge>
                        </div>
                      )}
                    </DialogHeader>
                  </div>

                  <form
                    key={selectedItem ? "edit-item-form" : "add-item-form"}
                    onSubmit={handleSaveItem}
                    className="p-6"
                  >
                    <div className="space-y-6">
                      <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Package className="h-4 w-4 text-blue-600" />
                            <Label
                              htmlFor="name"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Item Name *
                            </Label>
                          </div>
                          <Input
                            id="name"
                            name="name"
                            defaultValue={selectedItem?.name}
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter item name"
                            required
                          />
                        </CardContent>
                      </Card>

                      <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Package className="h-4 w-4 text-emerald-500" />
                            <Label
                              htmlFor="description"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Description
                            </Label>
                          </div>
                          <Input
                            id="description"
                            name="description"
                            defaultValue={selectedItem?.description}
                            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="Enter item description"
                          />
                        </CardContent>
                      </Card>

                      <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Package2 className="h-4 w-4 text-purple-600" />
                            <Label
                              htmlFor="totalQuantity"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Total Quantity *
                            </Label>
                          </div>
                          <Input
                            id="totalQuantity"
                            name="totalQuantity"
                            type="number"
                            min="1"
                            defaultValue={selectedItem?.totalQuantity}
                            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            placeholder="Enter total quantity"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Set the total number of items available for claiming
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <DialogFooter className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between w-full">
                        <div className="text-sm text-gray-500">
                          {selectedItem ? "Update" : "Create"} item with the
                          information above
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(null);
                              setIsDialogOpen(false);
                            }}
                            className="hover:bg-gray-50"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0"
                          >
                            {selectedItem ? (
                              <><Pencil className="mr-2 h-4 w-4" /> Update Item</>
                            ) : (
                              <><Plus className="mr-2 h-4 w-4" /> Create Item</>
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button 
                variant="outline" 
                onClick={handleExport}
                className="border-gray-300 hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Quantity</p>
              <p className="text-2xl font-bold text-gray-900">{totalQuantity}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Gift className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Claimed</p>
              <p className="text-2xl font-bold text-gray-900">{claimedQuantity}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Remaining</p>
              <p className="text-2xl font-bold text-gray-900">{remainingQuantity}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Items Grid */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Claimable Items</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Showing {items.length} items
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity className="h-4 w-4" />
              {totalItems} Items
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item) => (
              <Card key={item.id} className="border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Remaining</p>
                        <p className="text-lg sm:text-xl font-bold text-emerald-600">{item.remainingQuantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-700">{item.totalQuantity}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-xs sm:text-sm text-gray-500">{Math.round(((item.totalQuantity - item.remainingQuantity) / item.totalQuantity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-emerald-600 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((item.totalQuantity - item.remainingQuantity) / item.totalQuantity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link href={`/admin/claim-souvenir/${item.id}`}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200">
                      <Gift className="mr-2 h-4 w-4" />
                      Run Application
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {items.length === 0 && (
            <div className="text-center py-12">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first claimable item.</p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
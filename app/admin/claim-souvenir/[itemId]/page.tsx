"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useStatistics } from "@/hooks/use-statistics";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Home, Trash2, Camera } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BarcodeScanner from "@/components/ui/barcode-scanner";
import Swal from "sweetalert2";

type Guest = {
  id: string;
  name: string;
  notes: string;
  claimedAt: string | null;
};

type Transaction = {
  guestId: string;
  createdAt: string;
};

export default function ClaimDetail({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = use(params);
  const { selectedEventId } = useStatistics();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [totalQuota, setTotalQuota] = useState(0);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedGuestId, setScannedGuestId] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    if (selectedEventId) {
      const [guestsRes, itemRes, transactionsRes] = await Promise.all([
        fetch(`/api/events/${selectedEventId}/guests/all`),
        fetch(`/api/events/${selectedEventId}/claimable-items/${itemId}`),
        fetch(
          `/api/events/${selectedEventId}/claimable-items/${itemId}/transactions`
        ),
      ]);

      const guestsData = await guestsRes.json();
      const itemData = await itemRes.json();
      const transactionsData = await transactionsRes.json();

      const transactionsMap = new Map<string, string>(
        transactionsData.data.map((t: Transaction) => [t.guestId, t.createdAt])
      );

      const mergedGuests = guestsData.data.map((g: any) => ({
        ...g,
        claimedAt: transactionsMap.get(g.id) || null,
      }));

      setGuests(mergedGuests);
      setTotalClaimed(transactionsData.data.length);
      setTotalQuota(itemData.data?.totalQuantity || 0);
    }
  }, [selectedEventId, itemId]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleScan = async (data: string | null) => {
    if (data) {
      let guestId = data;
      try {
        const url = new URL(data);
        guestId = url.searchParams.get("c") || data;
      } catch (e) {
        // Not a valid URL, assume it's a raw ID
      }
      setScannedGuestId(guestId);

      try {
        const response = await fetch(
          `/api/events/${selectedEventId}/claimable-items/${itemId}/transactions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ guestId }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }

        Swal.fire({
          icon: "success",
          title: "Claim recorded successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsScannerOpen(false);
        await fetchAllData();
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        Swal.fire({
          icon: "error",
          title: "Operation Failed",
          text: message,
        });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CLAIM souvenir</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsScannerOpen(true)}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Link href="/admin/dashboard">
            <Home className="h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total CLAIM</h2>
          <p className="text-2xl font-bold">{totalClaimed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Quota</h2>
          <p className="text-2xl font-bold">{totalQuota}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>CLAIM AT</TableHead>
              <TableHead>FULLNAME</TableHead>
              <TableHead>NOTES</TableHead>
              <TableHead>TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest, index) => (
              <TableRow key={guest.id}>
                <TableCell>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </TableCell>
                <TableCell>
                  {guest.claimedAt
                    ? new Date(guest.claimedAt).toLocaleString()
                    : "Not Claimed"}
                </TableCell>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.notes}</TableCell>
                <TableCell>{guest.claimedAt ? 1 : 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Guest Barcode</DialogTitle>
          </DialogHeader>
          <BarcodeScanner
            onScan={handleScan}
            onError={(error) => {
              console.error("Scanner Error:", error);
              Swal.fire({
                icon: "error",
                title: "Scanner Error",
                text: error.message || "Could not access the camera.",
              });
              setIsScannerOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
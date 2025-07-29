"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useStatistics } from "@/hooks/use-statistics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, Settings } from "lucide-react";

interface Guest {
  id: string;
  fullname: string;
  email?: string;
  phoneNumber?: string;
}

interface QRTemplateProcessorProps {
  templateId: string;
  templateImageUrl?: string;
}

export default function QRTemplateProcessor({
  templateId,
  templateImageUrl,
}: QRTemplateProcessorProps) {
  const { selectedEventId } = useStatistics();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  const [qrPosition, setQrPosition] = useState({ x: 50, y: 50 });
  const [namePosition, setNamePosition] = useState({ x: 50, y: 80 });
  const [showSettings, setShowSettings] = useState(false);

  // Fetch guests for the current event
  useEffect(() => {
    if (selectedEventId) {
      fetch(`/api/events/${selectedEventId}/guests`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setGuests(data.data || []);
          }
        })
        .catch((error) => {
          console.error("Error fetching guests:", error);
        });
    }
  }, [selectedEventId]);

  const handleGuestSelection = (guestId: string, checked: boolean) => {
    if (checked) {
      setSelectedGuests([...selectedGuests, guestId]);
    } else {
      setSelectedGuests(selectedGuests.filter((id) => id !== guestId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGuests(guests.map((guest) => guest.id));
    } else {
      setSelectedGuests([]);
    }
  };

  const processQRTemplates = async () => {
    if (!selectedEventId || selectedGuests.length === 0) {
      alert("Please select at least one guest");
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch("/api/qr-template/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId,
          guestIds: selectedGuests,
          qrPosition,
          namePosition,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setProcessedImages(result.imageUrls);
        alert(`Successfully processed ${result.imageUrls.length} QR code templates!`);
      } else {
        alert(`Processing failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Error processing QR templates:", error);
      alert("An error occurred while processing QR templates");
    } finally {
      setProcessing(false);
    }
  };

  const downloadProcessedImages = () => {
    processedImages.forEach((imageUrl, index) => {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `qr-template-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  if (!templateImageUrl) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            QR Template Processor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Please upload a blank QR code template first to use this feature.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            QR Template Processor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Template Preview */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={templateImageUrl}
                alt="QR Template"
                className="w-32 h-32 object-cover rounded border"
              />
              <Badge className="absolute -top-2 -right-2">Template</Badge>
            </div>
            <div>
              <h4 className="font-medium">Blank QR Code Template</h4>
              <p className="text-sm text-gray-500">
                This template will be used to generate personalized QR codes for selected guests.
              </p>
            </div>
          </div>

          {/* Settings Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {showSettings ? "Hide" : "Show"} Position Settings
            </Button>
          </div>

          {/* Position Settings */}
          {showSettings && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
              <div>
                <Label className="text-sm font-medium">QR Code Position (%)</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <Label className="text-xs text-gray-500">X (Left)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={qrPosition.x}
                      onChange={(e) =>
                        setQrPosition({ ...qrPosition, x: parseInt(e.target.value) })
                      }
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Y (Top)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={qrPosition.y}
                      onChange={(e) =>
                        setQrPosition({ ...qrPosition, y: parseInt(e.target.value) })
                      }
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Name Position (%)</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <Label className="text-xs text-gray-500">X (Left)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={namePosition.x}
                      onChange={(e) =>
                        setNamePosition({ ...namePosition, x: parseInt(e.target.value) })
                      }
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Y (Top)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={namePosition.y}
                      onChange={(e) =>
                        setNamePosition({ ...namePosition, y: parseInt(e.target.value) })
                      }
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guest Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">
                Select Guests ({selectedGuests.length} of {guests.length} selected)
              </Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedGuests.length === guests.length && guests.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <Label className="text-sm">Select All</Label>
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto border rounded p-3 space-y-2">
              {guests.length === 0 ? (
                <p className="text-gray-500 text-sm">No guests found for this event.</p>
              ) : (
                guests.map((guest) => (
                  <div key={guest.id} className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedGuests.includes(guest.id)}
                      onCheckedChange={(checked) =>
                        handleGuestSelection(guest.id, Boolean(checked))
                      }
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{guest.fullname}</p>
                      <p className="text-xs text-gray-500">
                        {guest.email || guest.phoneNumber || "No contact info"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Process Button */}
          <Button
            onClick={processQRTemplates}
            disabled={processing || selectedGuests.length === 0}
            className="w-full"
          >
            {processing ? "Processing..." : `Process ${selectedGuests.length} QR Templates`}
          </Button>

          {/* Processed Images */}
          {processedImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Processed Images ({processedImages.length})
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadProcessedImages}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {processedImages.slice(0, 8).map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Processed QR ${index + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                    <Badge className="absolute -top-1 -right-1 text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                ))}
                {processedImages.length > 8 && (
                  <div className="flex items-center justify-center h-20 border rounded bg-gray-50">
                    <p className="text-xs text-gray-500">
                      +{processedImages.length - 8} more
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
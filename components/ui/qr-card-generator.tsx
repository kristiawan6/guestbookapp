"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Download, QrCode } from "lucide-react";
import { useStatistics } from "@/hooks/use-statistics";

interface BroadcastTemplate {
  id: string;
  name: string;
  type: string;
  content: string;
  imageAttachment?: string;
}

interface QRCardGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGuestIds: string[];
}

export function QRCardGenerator({
  isOpen,
  onClose,
  selectedGuestIds,
}: QRCardGeneratorProps) {
  const [templates, setTemplates] = useState<BroadcastTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<BroadcastTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  const [qrPosition, setQrPosition] = useState({ x: 50, y: 50 });
  const [namePosition, setNamePosition] = useState({ x: 50, y: 80 });
  const { selectedEventId } = useStatistics();

  useEffect(() => {
    if (isOpen && selectedEventId) {
      fetchQRTemplates();
    }
  }, [isOpen, selectedEventId]);

  const fetchQRTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/events/${selectedEventId}/broadcast-templates?type=whatsapp`
      );
      const data = await response.json();
      // Filter templates that have QR code card
      const qrTemplates = (data.data || []).filter(
        (template: BroadcastTemplate) => template.imageAttachment === "qr-code-card" || template.imageAttachment === "qr-card"
      );
      setTemplates(qrTemplates);
    } catch (error) {
      console.error("Error fetching QR templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: BroadcastTemplate) => {
    setSelectedTemplate(template);
    setProcessedImages([]);
  };

  const handleGenerateQRCards = async () => {
    if (!selectedTemplate || selectedGuestIds.length === 0) return;

    setProcessing(true);
    try {
      const response = await fetch('/api/qr-template/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          guestIds: selectedGuestIds,
          qrPosition,
          namePosition,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setProcessedImages(result.imageUrls);
      } else {
        alert('Failed to generate QR cards: ' + result.error);
      }
    } catch (error) {
      console.error('Error generating QR cards:', error);
      alert('An error occurred while generating QR cards.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    processedImages.forEach((imageUrl, index) => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `qr-card-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setProcessedImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-blue-500" />
            Generate QR Code Cards
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Generate personalized QR code cards for {selectedGuestIds.length} selected guest(s)
          </p>
        </DialogHeader>

        <div className="py-4">
          {!selectedTemplate ? (
            // Template Selection Step
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 1: Select QR Template</h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading QR templates...</span>
                </div>
              ) : templates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No QR code templates found. Please create a WhatsApp template with QR code upload first.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm truncate">
                            {template.name}
                          </h3>
                          <Badge variant="secondary" className="ml-2">
                            QR Template
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <div className="bg-gray-100 rounded p-3 text-center">
                            <QrCode className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                            <div className="text-xs text-gray-600">QR Code Template</div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-600 line-clamp-2">
                          {template.content.replace(/\*##_.*?_##\*/g, "[Variable]")}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : processedImages.length === 0 ? (
            // Configuration Step
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Step 2: Configure QR Card Generation</h3>
                <Button variant="outline" onClick={handleReset}>
                  Change Template
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-2">Selected Template: {selectedTemplate.name}</h4>
                <p className="text-sm text-gray-600">Guests to process: {selectedGuestIds.length}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">QR Code Position (%)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="qr-x" className="text-xs">X Position</Label>
                      <Input
                        id="qr-x"
                        type="number"
                        min="0"
                        max="100"
                        value={qrPosition.x}
                        onChange={(e) => setQrPosition({ ...qrPosition, x: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="qr-y" className="text-xs">Y Position</Label>
                      <Input
                        id="qr-y"
                        type="number"
                        min="0"
                        max="100"
                        value={qrPosition.y}
                        onChange={(e) => setQrPosition({ ...qrPosition, y: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Name Position (%)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="name-x" className="text-xs">X Position</Label>
                      <Input
                        id="name-x"
                        type="number"
                        min="0"
                        max="100"
                        value={namePosition.x}
                        onChange={(e) => setNamePosition({ ...namePosition, x: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name-y" className="text-xs">Y Position</Label>
                      <Input
                        id="name-y"
                        type="number"
                        min="0"
                        max="100"
                        value={namePosition.y}
                        onChange={(e) => setNamePosition({ ...namePosition, y: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleGenerateQRCards}
                  disabled={processing}
                  className="px-8"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating QR Cards...
                    </>
                  ) : (
                    'Generate QR Cards'
                  )}
                </Button>
              </div>
            </div>
          ) : (
            // Results Step
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Step 3: Download Generated QR Cards</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleReset}>
                    Generate New
                  </Button>
                  <Button onClick={handleDownloadAll}>
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="text-green-800">
                  ✅ Successfully generated {processedImages.length} QR code cards!
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {processedImages.map((imageUrl, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-2">
                      <img
                        src={imageUrl}
                        alt={`QR Card ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <div className="mt-2 text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = imageUrl;
                            link.download = `qr-card-${index + 1}.png`;
                            link.click();
                          }}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
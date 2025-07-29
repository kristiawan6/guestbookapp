'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, Download, Eye, Users } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface Guest {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string | null;
}

interface ProcessedImage {
  guestId: string;
  guestName: string;
  guestEmail: string | null;
  guestPhoneNumber: string | null;
  imageUrl: string;
  imagePath: string;
}

interface QRTemplateProcessorProps {
  templateId: string;
  eventId: string;
  guests: Guest[];
  blankTemplateUrl?: string;
}

export function QRTemplateProcessor({ 
  templateId, 
  eventId, 
  guests, 
  blankTemplateUrl 
}: QRTemplateProcessorProps) {
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [qrCodePosition, setQrCodePosition] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 200
  });
  const [namePosition, setNamePosition] = useState({
    x: 50,
    y: 270,
    fontSize: 24,
    fontColor: '#000000'
  });

  const handleGuestSelection = (guestId: string) => {
    setSelectedGuests(prev => 
      prev.includes(guestId) 
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };

  const selectAllGuests = () => {
    setSelectedGuests(guests.map(guest => guest.id));
  };

  const clearSelection = () => {
    setSelectedGuests([]);
  };

  const processQRTemplates = async () => {
    if (selectedGuests.length === 0) {
      toast.error('Please select at least one guest');
      return;
    }

    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('templateId', templateId);
      formData.append('guestIds', JSON.stringify(selectedGuests));
      formData.append('qrCodePosition', JSON.stringify(qrCodePosition));
      formData.append('namePosition', JSON.stringify(namePosition));

      const response = await fetch('/api/qr-template/process', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setProcessedImages(result.processedImages);
        toast.success(`Successfully processed ${result.processedImages.length} QR code templates`);
      } else {
        toast.error(result.error || 'Failed to process QR templates');
      }
    } catch (error) {
      console.error('Error processing QR templates:', error);
      toast.error('Failed to process QR templates');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedImage = (imageUrl: string, guestName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `qr-template-${guestName.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImages = () => {
    processedImages.forEach(({ imageUrl, guestName }) => {
      setTimeout(() => downloadProcessedImage(imageUrl, guestName), 100);
    });
  };

  return (
    <div className="space-y-6">
      {/* Template Preview */}
      {blankTemplateUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Blank Template Preview</CardTitle>
            <CardDescription>
              This is the blank template that will be used to generate personalized QR codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Image 
                src={blankTemplateUrl} 
                alt="Blank QR Template" 
                width={300} 
                height={400} 
                className="border rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Position Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code & Name Positioning</CardTitle>
          <CardDescription>
            Configure where the QR code and guest name will be placed on the template
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>QR Code Position</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">X Position</Label>
                  <Input
                    type="number"
                    value={qrCodePosition.x}
                    onChange={(e) => setQrCodePosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                    placeholder="X"
                  />
                </div>
                <div>
                  <Label className="text-xs">Y Position</Label>
                  <Input
                    type="number"
                    value={qrCodePosition.y}
                    onChange={(e) => setQrCodePosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                    placeholder="Y"
                  />
                </div>
                <div>
                  <Label className="text-xs">Width</Label>
                  <Input
                    type="number"
                    value={qrCodePosition.width}
                    onChange={(e) => setQrCodePosition(prev => ({ ...prev, width: parseInt(e.target.value) || 200 }))}
                    placeholder="Width"
                  />
                </div>
                <div>
                  <Label className="text-xs">Height</Label>
                  <Input
                    type="number"
                    value={qrCodePosition.height}
                    onChange={(e) => setQrCodePosition(prev => ({ ...prev, height: parseInt(e.target.value) || 200 }))}
                    placeholder="Height"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Name Position</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">X Position</Label>
                  <Input
                    type="number"
                    value={namePosition.x}
                    onChange={(e) => setNamePosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                    placeholder="X"
                  />
                </div>
                <div>
                  <Label className="text-xs">Y Position</Label>
                  <Input
                    type="number"
                    value={namePosition.y}
                    onChange={(e) => setNamePosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                    placeholder="Y"
                  />
                </div>
                <div>
                  <Label className="text-xs">Font Size</Label>
                  <Input
                    type="number"
                    value={namePosition.fontSize}
                    onChange={(e) => setNamePosition(prev => ({ ...prev, fontSize: parseInt(e.target.value) || 24 }))}
                    placeholder="Font Size"
                  />
                </div>
                <div>
                  <Label className="text-xs">Font Color</Label>
                  <Input
                    type="color"
                    value={namePosition.fontColor}
                    onChange={(e) => setNamePosition(prev => ({ ...prev, fontColor: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Select Guests ({selectedGuests.length}/{guests.length})
          </CardTitle>
          <CardDescription>
            Choose which guests to generate personalized QR code templates for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={selectAllGuests}
              disabled={selectedGuests.length === guests.length}
            >
              Select All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearSelection}
              disabled={selectedGuests.length === 0}
            >
              Clear Selection
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedGuests.includes(guest.id)
                    ? 'bg-primary/10 border-primary'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleGuestSelection(guest.id)}
              >
                <div className="font-medium">{guest.name}</div>
                <div className="text-sm text-gray-500">
                  {guest.email || guest.phoneNumber || 'No contact info'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process Button */}
      <div className="flex justify-center">
        <Button 
          onClick={processQRTemplates}
          disabled={isProcessing || selectedGuests.length === 0}
          size="lg"
          className="w-full max-w-md"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing QR Templates...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Generate QR Templates ({selectedGuests.length} guests)
            </>
          )}
        </Button>
      </div>

      {/* Processed Images */}
      {processedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Processed QR Templates</span>
              <Button onClick={downloadAllImages} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </CardTitle>
            <CardDescription>
              Generated QR code templates ready for distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {processedImages.map((image) => (
                <div key={image.guestId} className="border rounded-lg p-4 space-y-2">
                  <div className="aspect-square relative">
                    <Image
                      src={image.imageUrl}
                      alt={`QR Template for ${image.guestName}`}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{image.guestName}</div>
                    <div className="text-sm text-gray-500">
                      {image.guestEmail || image.guestPhoneNumber || 'No contact'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadProcessedImage(image.imageUrl, image.guestName)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
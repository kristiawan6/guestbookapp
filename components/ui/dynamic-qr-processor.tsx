"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface ProcessedImage {
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  imageUrl: string;
  imagePath: string;
}

interface CoordinateField {
  id: string;
  type: 'qr-code' | 'text';
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fieldName?: string;
}

interface Template {
  id: string;
  name: string;
  imagePath: string;
  coordinateFields?: CoordinateField[];
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface DynamicQRProcessorProps {
  eventId: string;
}

export default function DynamicQRProcessor({ eventId }: DynamicQRProcessorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [coordinateFields, setCoordinateFields] = useState<CoordinateField[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch templates with coordinate fields
  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}/broadcast-templates?type=whatsapp`);
      const data = await response.json();
      if (data.success) {
        // Filter templates that have coordinate fields
        const templatesWithCoords = data.data.filter((template: Template) => template.coordinateFields);
        setTemplates(templatesWithCoords);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch templates'
      });
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  // Fetch guests for the event
  const fetchGuests = useCallback(async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/guests`);
      const data = await response.json();
      if (data.success) {
        setGuests(data.data);
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  }, [eventId]);

  // Fetch coordinate fields for selected template
  const fetchCoordinateFields = async (templateId: string) => {
    try {
      const response = await fetch(`/api/qr-template/process-dynamic?templateId=${templateId}&eventId=${eventId}`);
      const data = await response.json();
      if (data.success && data.hasCoordinateFields) {
        setCoordinateFields(data.coordinateFields);
      } else {
        setCoordinateFields([]);
      }
    } catch (error) {
      console.error('Error fetching coordinate fields:', error);
    }
  };

  // Process dynamic QR templates
  const processTemplates = async () => {
    if (!selectedTemplate || selectedGuests.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Selection',
        text: 'Please select a template and at least one guest'
      });
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('templateId', selectedTemplate);
      formData.append('guestIds', JSON.stringify(selectedGuests));

      const response = await fetch('/api/qr-template/process-dynamic', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setProcessedImages(data.processedImages);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Processed ${data.processedImages.length} QR code templates`
        });
      } else {
        throw new Error(data.error || 'Processing failed');
      }
    } catch (error) {
      console.error('Error processing templates:', error);
      Swal.fire({
        icon: 'error',
        title: 'Processing Failed',
        text: error instanceof Error ? error.message : 'Failed to process templates'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setProcessedImages([]);
    if (templateId) {
      fetchCoordinateFields(templateId);
    } else {
      setCoordinateFields([]);
    }
  };

  // Toggle guest selection
  const toggleGuestSelection = (guestId: string) => {
    setSelectedGuests(prev => 
      prev.includes(guestId) 
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };

  // Initialize data
  React.useEffect(() => {
    fetchTemplates();
    fetchGuests();
  }, [eventId, fetchTemplates, fetchGuests]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic QR Code Template Processor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Template Selection */}
          <div>
            <Label htmlFor="template-select">Select Template with Coordinate Fields</Label>
            <div className="flex gap-2">
              <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={fetchTemplates} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
              </Button>
            </div>
            {templates.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                No templates with coordinate fields found. Create a template with coordinate fields first.
              </p>
            )}
          </div>

          {/* Coordinate Fields Preview */}
          {coordinateFields.length > 0 && (
            <div>
              <Label>Coordinate Fields Configuration</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {coordinateFields.map((field) => (
                  <Badge key={field.id} variant="outline">
                    {field.label} ({field.type}) - {field.x}%, {field.y}%
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Guest Selection */}
          <div>
            <Label>Select Guests ({selectedGuests.length} selected)</Label>
            <div className="max-h-40 overflow-y-auto border rounded-md p-2 mt-2">
              {guests.map((guest) => (
                <div key={guest.id} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id={`guest-${guest.id}`}
                    checked={selectedGuests.includes(guest.id)}
                    onChange={() => toggleGuestSelection(guest.id)}
                    className="rounded"
                  />
                  <label htmlFor={`guest-${guest.id}`} className="text-sm cursor-pointer">
                    {guest.name} ({guest.email || 'No email'})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Process Button */}
          <Button 
            onClick={processTemplates} 
            disabled={isProcessing || !selectedTemplate || selectedGuests.length === 0}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Templates...
              </>
            ) : (
              'Process Dynamic QR Templates'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Processed Images */}
      {processedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processed QR Code Templates ({processedImages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {processedImages.map((image) => (
                <div key={image.guestId} className="border rounded-lg p-4">
                  <div className="aspect-square relative mb-2">
                    <img
                      src={image.imageUrl}
                      alt={`QR Template for ${image.guestName}`}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{image.guestName}</p>
                    <p className="text-xs text-muted-foreground">{image.guestEmail}</p>
                    <p className="text-xs text-muted-foreground">{image.guestPhoneNumber}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={image.imageUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={image.imageUrl} download={`qr-${image.guestName}.png`}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
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
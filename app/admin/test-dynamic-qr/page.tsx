"use client";

import { useState, useEffect } from 'react';
import DynamicQRProcessor from '@/components/ui/dynamic-qr-processor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useEventContext } from '@/hooks/use-event-context';

export default function TestDynamicQRPage() {
  const { selectedEventId, events } = useEventContext();
  const [currentEventId, setCurrentEventId] = useState<string>('');

  useEffect(() => {
    if (selectedEventId) {
      setCurrentEventId(selectedEventId);
    }
  }, [selectedEventId]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Dynamic QR Code Processing</h1>
          <p className="text-muted-foreground mt-2">
            Test the dynamic coordinate system for QR code template processing
          </p>
        </div>
      </div>

      {/* Event Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Event Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="event-select">Select Event</Label>
            <Select value={currentEventId} onValueChange={setCurrentEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an event..." />
              </SelectTrigger>
              <SelectContent>
                {events?.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                )) || []}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic QR Processor */}
      {currentEventId && (
        <DynamicQRProcessor eventId={currentEventId} />
      )}

      {!currentEventId && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Please select an event to test dynamic QR code processing
            </p>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Prerequisites:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Create a broadcast template with coordinate fields configured</li>
              <li>Upload an image template and set QR code/text field positions</li>
              <li>Have guests added to the selected event</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Testing Steps:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Select an event from the dropdown above</li>
              <li>Choose a template that has coordinate fields configured</li>
              <li>Review the coordinate fields configuration</li>
              <li>Select one or more guests to process</li>
              <li>Click "Process Dynamic QR Templates"</li>
              <li>View and download the generated QR code templates</li>
            </ol>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Expected Results:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>QR codes positioned according to coordinate fields</li>
              <li>Guest information (name, email, etc.) placed at specified positions</li>
              <li>Dynamic sizing based on template dimensions</li>
              <li>Downloadable PNG files for each processed guest</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
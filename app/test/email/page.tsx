'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAutoAlert } from '@/hooks/use-auto-alert';
import { getGuestById } from '@/lib/services/guestService';

export default function EmailTestPage() {
  const [guestId, setGuestId] = useState('cmcpq50z30000guzkhwz0tkdz');
  const [subject, setSubject] = useState('Test Email Subject');
  const [message, setMessage] = useState('This is a test email message to verify the QR code image generation.');
  const [templateImageUrl, setTemplateImageUrl] = useState('');
  const [eventId, setEventId] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState<any>(null);
  
  const { showSuccess, showError, showLoading, dismissAll } = useAutoAlert();

  const fetchGuestData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/guests/${guestId}`);
      const data = await response.json();
      
      if (response.ok) {
        setGuestData(data);
        setEventId(data.eventId);
        showSuccess('Guest data fetched successfully');
      } else {
        showError(data.error || 'Failed to fetch guest data');
      }
    } catch (error) {
      showError('Error fetching guest data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testSendEmail = async () => {
    if (!guestData) {
      showError('Please fetch guest data first');
      return;
    }

    try {
      setLoading(true);
      const loadingToast = showLoading('Sending email...');
      
      const response = await fetch('/api/guests/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestIds: [guestId],
          subject,
          message,
          templateImageUrl: templateImageUrl || undefined,
          eventId,
        }),
      });

      const data = await response.json();
      dismissAll();
      
      if (response.ok) {
        showSuccess(`Email sent successfully! ${data.message}`);
      } else {
        showError(data.error || 'Failed to send email');
      }
    } catch (error) {
      dismissAll();
      showError('Error sending email');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testSendBulk = async () => {
    if (!guestData) {
      showError('Please fetch guest data first');
      return;
    }

    try {
      setLoading(true);
      const loadingToast = showLoading('Sending bulk email...');
      
      const response = await fetch('/api/guests/send-bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: 'test-template',
          guestIds: [guestId],
          type: 'Email',
          eventId,
          customMessage: message,
          customSubject: subject,
        }),
      });

      const data = await response.json();
      dismissAll();
      
      if (response.ok) {
        showSuccess(`Bulk email sent successfully! Success: ${data.successCount}, Failed: ${data.failureCount}`);
      } else {
        showError(data.error || 'Failed to send bulk email');
      }
    } catch (error) {
      dismissAll();
      showError('Error sending bulk email');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Email Testing Page</h1>
      
      <div className="grid gap-6">
        {/* Guest Information */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Information</CardTitle>
            <CardDescription>Fetch and verify guest data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Guest ID</label>
              <Input
                value={guestId}
                onChange={(e) => setGuestId(e.target.value)}
                placeholder="Enter guest ID"
              />
            </div>
            
            <Button onClick={fetchGuestData} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Guest Data'}
            </Button>
            
            {guestData && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Guest Details:</h3>
                <p><strong>Name:</strong> {guestData.name}</p>
                <p><strong>Email:</strong> {guestData.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {guestData.phoneNumber || 'N/A'}</p>
                <p><strong>Event ID:</strong> {guestData.eventId}</p>
                <p><strong>QR Code:</strong> {guestData.qrCode || 'N/A'}</p>
                <p><strong>Table Number:</strong> {guestData.tableNumber || 'N/A'}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
            <CardDescription>Configure email content and template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Email message"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Template Image URL (Optional)</label>
              <Input
                value={templateImageUrl}
                onChange={(e) => setTemplateImageUrl(e.target.value)}
                placeholder="https://example.com/template.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Test Email Functionality</CardTitle>
            <CardDescription>Test send-email and send-bulk endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={testSendEmail} 
                disabled={loading || !guestData}
                className="flex-1"
              >
                {loading ? 'Sending...' : 'Test Send Email'}
              </Button>
              
              <Button 
                onClick={testSendBulk} 
                disabled={loading || !guestData}
                variant="outline"
                className="flex-1"
              >
                {loading ? 'Sending...' : 'Test Send Bulk'}
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>Note:</strong> Make sure to check your Gmail inbox for the test emails.</p>
              <p>The QR code images should be properly generated and attached to the emails.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
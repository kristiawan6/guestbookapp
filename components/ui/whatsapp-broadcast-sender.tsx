"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Send, Users, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BroadcastTemplate {
  id: string;
  name: string;
  type: string;
  content: string;
  subject?: string;
  footerMessage?: string;
  imageAttachment?: string;
}

interface Guest {
  id: string;
  name: string;
  phoneNumber?: string;
  category?: string;
}

interface Category {
  id: string;
  name: string;
  guestCount: number;
}

interface WhatsAppBroadcastSenderProps {
  eventId: string;
  onClose?: () => void;
}

type RecipientType = 'all' | 'category' | 'individual';

interface BroadcastResult {
  success: boolean;
  message: string;
  data?: {
    successCount: number;
    failureCount: number;
    totalAttempted: number;
    messageIds: string[];
    errors: string[];
  };
}

export function WhatsAppBroadcastSender({ eventId, onClose }: WhatsAppBroadcastSenderProps) {
  const [templates, setTemplates] = useState<BroadcastTemplate[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [recipientType, setRecipientType] = useState<RecipientType>('all');
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [result, setResult] = useState<BroadcastResult | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        
        // Load WhatsApp templates
        const templatesResponse = await fetch(`/api/events/${eventId}/broadcast-templates?type=WhatsApp`);
        if (templatesResponse.ok) {
          const templatesData = await templatesResponse.json();
          setTemplates(templatesData.templates || []);
        }

        // Load guests
        const guestsResponse = await fetch(`/api/events/${eventId}/guests`);
        if (guestsResponse.ok) {
          const guestsData = await guestsResponse.json();
          setGuests(guestsData.guests || []);
        }

        // Load categories
        const categoriesResponse = await fetch(`/api/events/${eventId}/categories`);
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.categories || []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [eventId]);

  // Filter guests with phone numbers
  const guestsWithPhone = guests.filter(guest => guest.phoneNumber);
  const guestsWithoutPhone = guests.filter(guest => !guest.phoneNumber);

  // Get recipient count based on selection
  const getRecipientCount = () => {
    switch (recipientType) {
      case 'all':
        return guestsWithPhone.length;
      case 'category':
        return guestsWithPhone.filter(guest => 
          selectedCategories.includes(guest.category || '')
        ).length;
      case 'individual':
        return selectedGuests.length;
      default:
        return 0;
    }
  };

  // Handle guest selection
  const handleGuestSelection = (guestId: string, checked: boolean) => {
    if (checked) {
      setSelectedGuests(prev => [...prev, guestId]);
    } else {
      setSelectedGuests(prev => prev.filter(id => id !== guestId));
    }
  };

  // Handle category selection
  const handleCategorySelection = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  // Send broadcast
  const handleSendBroadcast = async () => {
    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }

    if (recipientType === 'individual' && selectedGuests.length === 0) {
      toast.error('Please select at least one guest');
      return;
    }

    if (recipientType === 'category' && selectedCategories.length === 0) {
      toast.error('Please select at least one category');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const payload = {
        templateId: selectedTemplate,
        recipientType,
        recipientIds: recipientType === 'individual' ? selectedGuests : 
                     recipientType === 'category' ? selectedCategories : []
      };

      const response = await fetch(`/api/events/${eventId}/broadcasts/whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error sending broadcast:', error);
      toast.error('Failed to send broadcast');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading WhatsApp broadcast data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          WhatsApp Broadcast Sender
        </CardTitle>
        <CardDescription>
          Send WhatsApp messages to your guests using broadcast templates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Template</label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a WhatsApp template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{template.name}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {template.subject || template.content}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {templates.length === 0 && (
            <Alert>
              <AlertDescription>
                No WhatsApp templates found. Please create a WhatsApp template first.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Recipient Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Recipients</label>
          <Select value={recipientType} onValueChange={(value: RecipientType) => setRecipientType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  All Guests ({guestsWithPhone.length})
                </div>
              </SelectItem>
              <SelectItem value="category">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  By Category
                </div>
              </SelectItem>
              <SelectItem value="individual">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Individual Guests
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Selection */}
        {recipientType === 'category' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Categories</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategorySelection(category.id, checked as boolean)}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm flex-1">
                    {category.name} ({category.guestCount})
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Individual Guest Selection */}
        {recipientType === 'individual' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Guests</label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {guestsWithPhone.map((guest) => (
                <div key={guest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`guest-${guest.id}`}
                    checked={selectedGuests.includes(guest.id)}
                    onCheckedChange={(checked) => handleGuestSelection(guest.id, checked as boolean)}
                  />
                  <label htmlFor={`guest-${guest.id}`} className="text-sm flex-1">
                    {guest.name}
                    <span className="text-xs text-muted-foreground block">
                      {guest.phoneNumber}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{guestsWithPhone.length}</div>
              <div className="text-xs text-muted-foreground">Guests with Phone</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{guestsWithoutPhone.length}</div>
              <div className="text-xs text-muted-foreground">Guests without Phone</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{getRecipientCount()}</div>
              <div className="text-xs text-muted-foreground">Will Receive Message</div>
            </CardContent>
          </Card>
        </div>

        {/* Send Button */}
        <div className="flex gap-2">
          <Button
            onClick={handleSendBroadcast}
            disabled={loading || !selectedTemplate || getRecipientCount() === 0}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send to {getRecipientCount()} Recipients
              </>
            )}
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>

        {/* Results */}
        {result && (
          <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className="flex-1">
                <div className="font-medium">{result.message}</div>
                {result.data && (
                  <div className="mt-2 space-y-1 text-sm">
                    <div>Successful: {result.data.successCount}</div>
                    <div>Failed: {result.data.failureCount}</div>
                    <div>Total Attempted: {result.data.totalAttempted}</div>
                    {result.data.errors.length > 0 && (
                      <div className="mt-2">
                        <div className="font-medium">Errors:</div>
                        <ul className="list-disc list-inside">
                          {result.data.errors.slice(0, 5).map((error, index) => (
                            <li key={index} className="text-xs">{error}</li>
                          ))}
                          {result.data.errors.length > 5 && (
                            <li className="text-xs">... and {result.data.errors.length - 5} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </AlertDescription>
            </div>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
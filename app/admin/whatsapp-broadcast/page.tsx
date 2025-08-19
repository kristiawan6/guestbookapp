"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { WhatsAppBroadcastSender } from '@/components/ui/whatsapp-broadcast-sender';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Send, CheckCircle } from 'lucide-react';

export default function WhatsAppBroadcastPage() {
  const params = useParams();
  const eventId = params?.eventId as string;

  if (!eventId) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Event ID not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">WhatsApp Broadcast</h1>
        <p className="text-muted-foreground">
          Send WhatsApp messages to your event guests using broadcast templates
        </p>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Template-Based</div>
                <div className="text-xs text-muted-foreground">Use predefined templates</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Flexible Recipients</div>
                <div className="text-xs text-muted-foreground">All, category, or individual</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium">Bulk Sending</div>
                <div className="text-xs text-muted-foreground">Send to multiple guests</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Real-time Results</div>
                <div className="text-xs text-muted-foreground">Track success & failures</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use WhatsApp Broadcast</CardTitle>
          <CardDescription>
            Follow these steps to send WhatsApp messages to your guests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <div className="font-medium">Create WhatsApp Template</div>
                  <div className="text-sm text-muted-foreground">
                    Go to Broadcast Templates and create a WhatsApp template with your message content
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <div className="font-medium">Select Template</div>
                  <div className="text-sm text-muted-foreground">
                    Choose the WhatsApp template you want to use for the broadcast
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <div className="font-medium">Choose Recipients</div>
                  <div className="text-sm text-muted-foreground">
                    Select all guests, specific categories, or individual guests to receive the message
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <div className="font-medium">Send & Monitor</div>
                  <div className="text-sm text-muted-foreground">
                    Send the broadcast and monitor the results in real-time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Broadcast Sender Component */}
      <WhatsAppBroadcastSender eventId={eventId} />
    </div>
  );
}
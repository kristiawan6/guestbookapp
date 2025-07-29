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
import { Loader2, MessageSquare, Mail } from "lucide-react";
import { useStatistics } from "@/hooks/use-statistics";

interface BroadcastTemplate {
  id: string;
  name: string;
  type: string;
  content: string;
  subject?: string;
  footerMessage?: string;
  button?: string;
  imageAttachment?: string;
}

interface TemplateSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: BroadcastTemplate) => void;
  type: "WhatsApp" | "Email";
  selectedGuestIds: string[];
}

export function TemplateSelectionPopup({
  isOpen,
  onClose,
  onSelectTemplate,
  type,
  selectedGuestIds,
}: TemplateSelectionPopupProps) {
  const [templates, setTemplates] = useState<BroadcastTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedEventId } = useStatistics();

  useEffect(() => {
    if (isOpen && selectedEventId) {
      fetchTemplates();
    }
  }, [isOpen, selectedEventId, type]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/events/${selectedEventId}/broadcast-templates?type=${type.toLowerCase()}`
      );
      const data = await response.json();
      setTemplates(data.data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: BroadcastTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  const getIcon = () => {
    return type === "WhatsApp" ? (
      <MessageSquare className="h-5 w-5 text-green-500" />
    ) : (
      <Mail className="h-5 w-5 text-blue-500" />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            Select your favorite template
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Choose a {type} template to send to {selectedGuestIds.length} selected guest(s)
          </p>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading templates...</span>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No {type} templates found. Please create a template first.
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
                        {template.type}
                      </Badge>
                    </div>
                    
                    {template.imageAttachment && (
                      <div className="mb-3">
                        {template.imageAttachment === "qr-code-card" ? (
                          <div className="bg-gray-100 rounded p-3 text-center">
                            <div className="text-xs text-gray-600 mb-1">QR Code Card</div>
                            <div className="text-sm font-medium">Custom QR Template</div>
                          </div>
                        ) : (
                          <img
                            src={template.imageAttachment}
                            alt="Template preview"
                            className="w-full h-20 object-cover rounded"
                          />
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-600 line-clamp-3">
                      {template.content.replace(/\*##_.*?_##\*/g, "[Variable]")}
                    </div>
                    
                    {template.subject && (
                      <div className="mt-2 text-xs text-blue-600">
                        Subject: {template.subject}
                      </div>
                    )}
                    
                    {template.footerMessage && (
                      <div className="mt-2 text-xs text-gray-500">
                        Footer: {template.footerMessage}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
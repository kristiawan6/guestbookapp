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
import { Loader2, MessageSquare, Mail, Sparkles, Users, Eye, CheckCircle } from "lucide-react";
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
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <div className={`bg-gradient-to-r p-6 text-white ${
          type === "WhatsApp" 
            ? "from-green-500 to-emerald-600" 
            : "from-blue-500 to-indigo-600"
        }`}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {getIcon()}
              <div>
                <div>Select {type} Template</div>
                <div className="text-sm font-normal opacity-90 mt-1">
                  Choose the perfect template for your message
                </div>
              </div>
            </DialogTitle>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {selectedGuestIds.length} Recipients
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {templates.length} Templates Available
                </span>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-200 border-t-transparent animate-pulse"></div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-medium text-gray-700">Loading Templates</p>
                <p className="text-sm text-gray-500 mt-1">Finding the best templates for you...</p>
              </div>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No {type} Templates Found
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first {type} template to get started with broadcasting.
              </p>
              <Button 
                variant="outline" 
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={onClose}
              >
                Create Template
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-opacity-100 ${
                    type === "WhatsApp" 
                      ? "hover:border-green-400 hover:shadow-green-100" 
                      : "hover:border-blue-400 hover:shadow-blue-100"
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-0 overflow-hidden">
                    {/* Template Header */}
                    <div className={`p-4 bg-gradient-to-r ${
                      type === "WhatsApp" 
                        ? "from-green-50 to-emerald-50" 
                        : "from-blue-50 to-indigo-50"
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-700 transition-colors">
                          {template.name}
                        </h3>
                        <Badge 
                          variant={type === "WhatsApp" ? "default" : "secondary"} 
                          className={`ml-2 ${
                            type === "WhatsApp" 
                              ? "bg-green-100 text-green-700 hover:bg-green-200" 
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        >
                          {template.type}
                        </Badge>
                      </div>
                      
                      {template.subject && (
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="h-3 w-3 text-blue-500" />
                          <span className="text-xs font-medium text-blue-600 truncate">
                            {template.subject}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Template Preview */}
                    <div className="p-4">
                      {template.imageAttachment && (
                        <div className="mb-4">
                          {template.imageAttachment === "qr-code-card" ? (
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 text-center border-2 border-dashed border-gray-300">
                              <div className="bg-white rounded p-2 inline-block mb-2">
                                <div className="w-8 h-8 bg-gray-800 rounded"></div>
                              </div>
                              <div className="text-xs font-medium text-gray-700">QR Code Card</div>
                              <div className="text-xs text-gray-500">Dynamic Template</div>
                            </div>
                          ) : (
                            <div className="relative overflow-hidden rounded-lg">
                              <img
                                src={template.imageAttachment}
                                alt="Template preview"
                                className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {template.content.replace(/\*##_.*?_##\*/g, "[Variable]")}
                      </div>
                      
                      {template.footerMessage && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="font-medium">Footer:</span>
                            <span className="truncate">{template.footerMessage}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className={`bg-white rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300 ${
                        type === "WhatsApp" 
                          ? "text-green-600" 
                          : "text-blue-600"
                      }`}>
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-gray-600">
              Click on a template to select and continue
            </div>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
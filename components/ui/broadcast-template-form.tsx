"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStatistics } from "@/hooks/use-statistics";
import { useRouter } from "next/navigation";
import SunEditor from "@/components/ui/sun-editor";
import Swal from "sweetalert2";
import CoordinatePicker, { CoordinateField } from "@/components/ui/coordinate-picker";
import { MessageSquare, Mail, FileText, Image, Plus, ArrowLeft, Save, Sparkles, Variable } from "lucide-react";


const GUEST_FIELDS = [
  "Fullname",
  "Email",
  "Address / Institution",
  "Category",
  "Table Number",
  "Notes",
  "Total Pack",
  "Link Web Inv (Personal)",
  "Link RSVP",
  "Link Web (General)",
];

interface Template {
  id: string;
  name: string;
  content: string;
  footer: string;
  imageAttachment: string;
  imageAttachmentType?: string;
  coordinateFields?: string;
}

export default function BroadcastTemplateForm({
  template,
  templateType = "whatsapp",
}: {
  template?: Template;
  templateType?: string;
}) {
  const router = useRouter();
  const { selectedEventId } = useStatistics();
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState(template?.content || "");
  const [footer, setFooter] = useState(template?.footer || "");
  const [imageAttachment, setImageAttachment] = useState(template?.imageAttachment || "none");
  const [coordinateFields, setCoordinateFields] = useState<CoordinateField[]>(
    template?.coordinateFields ? JSON.parse(template.coordinateFields) : []
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(template?.imageAttachment || "");
  const [qrCardImageUrl, setQrCardImageUrl] = useState<string>("");
  const [customImageUrl, setCustomImageUrl] = useState<string>("");
  const [imageAttachmentType, setImageAttachmentType] = useState<string>(
    template?.imageAttachmentType || "qr-card"
  );

  // Initialize state when template changes
  useEffect(() => {
    if (template) {
      setContent(template.content || "");
      setFooter(template.footer || "");
      
      const hasCoordinateFields = template.coordinateFields && template.coordinateFields.trim() !== "";
       const parsedCoordinateFields = hasCoordinateFields ? JSON.parse(template.coordinateFields!) : [];
      setCoordinateFields(parsedCoordinateFields);
      
      // Auto-detect the correct image attachment type based on existing data
      if (hasCoordinateFields && parsedCoordinateFields.length > 0) {
        // If template has coordinate fields, it's a dynamic QR template
        setImageAttachment("qr-card");
        setImageAttachmentType("dynamic-qr");
      } else if (template.imageAttachmentType === "qr-card" || template.imageAttachment === "qr-card") {
        // If it's a standard QR card
        setImageAttachment("qr-card");
        setImageAttachmentType("qr-card");
      } else {
        // Default or custom image
        setImageAttachment(template.imageAttachment || "none");
        setImageAttachmentType(template.imageAttachmentType || "qr-card");
      }
      
      // Handle image URL - convert relative paths to full URLs if needed
      let imageUrl = template.imageAttachment || "";
      if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
        imageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
      }
      setUploadedImageUrl(imageUrl);
      
      // Set appropriate image URL based on attachment type
      if (template.imageAttachmentType === "qr-card" || template.imageAttachmentType === "dynamic-qr") {
        setQrCardImageUrl(imageUrl);
        setCustomImageUrl("");
      } else if (template.imageAttachmentType === "customize") {
        setCustomImageUrl(imageUrl);
        setQrCardImageUrl("");
      }
    }
  }, [template]);

  const handleFileUpload = async (file: File, uploadType: 'qr-card' | 'custom'): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Determine which upload endpoint to use based on upload type
      const uploadEndpoint = uploadType === 'qr-card' ? '/api/upload/qr-cards' : '/api/upload';
      
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.path;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Handle file upload if a new file is selected
    const qrCardFileInput = formData.get('qrCardImage') as File;
    const customFileInput = formData.get('customImage') as File;
    let finalImageUrl = uploadedImageUrl;
    
    // Handle QR card image upload
    if (qrCardFileInput && qrCardFileInput.size > 0) {
      try {
        const uploadResult = await handleFileUpload(qrCardFileInput, 'qr-card');
        if (!uploadResult) {
          await Swal.fire({
            icon: 'error',
            title: 'Upload Error',
            text: 'Failed to upload QR card image. Please try again.',
            confirmButtonColor: '#3085d6'
          });
          return;
        }
        finalImageUrl = uploadResult;
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Upload Error',
          text: error instanceof Error ? error.message : 'Failed to upload QR card image',
          confirmButtonColor: '#3085d6'
        });
        return;
      }
    }
    
    // Handle custom image upload
    if (customFileInput && customFileInput.size > 0) {
      try {
        const uploadResult = await handleFileUpload(customFileInput, 'custom');
        if (!uploadResult) {
          await Swal.fire({
            icon: 'error',
            title: 'Upload Error',
            text: 'Failed to upload custom image. Please try again.',
            confirmButtonColor: '#3085d6'
          });
          return;
        }
        finalImageUrl = uploadResult;
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Upload Error',
          text: error instanceof Error ? error.message : 'Failed to upload custom image',
          confirmButtonColor: '#3085d6'
        });
        return;
      }
    }
    
    // Convert FormData to JSON object (excluding the file inputs)
    const jsonData: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
      if (key !== 'qrCardImage' && key !== 'customImage') { // Skip the file inputs
        jsonData[key] = value;
      }
    });
    
    // Add additional fields
    jsonData.coordinateFields = JSON.stringify(coordinateFields);
    jsonData.imageAttachmentType = imageAttachmentType;
    jsonData.content = content;
    jsonData.footer = footer;
    jsonData.type = templateType === "whatsapp" ? "WhatsApp" : "Email";
    
    // Set the final image URL based on attachment type
    if (imageAttachment === "customize" && (finalImageUrl || customImageUrl)) {
      jsonData.imageAttachment = finalImageUrl || customImageUrl;
    } else if (imageAttachment === "qr-card" && (finalImageUrl || qrCardImageUrl)) {
      jsonData.imageAttachment = finalImageUrl || qrCardImageUrl;
    } else if (imageAttachment !== "customize" && imageAttachment !== "qr-card") {
      jsonData.imageAttachment = imageAttachment;
    }
    
    try {
      if (!selectedEventId) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No event selected. Please select an event first.',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      const url = template 
        ? `/api/events/${selectedEventId}/broadcast-templates/${template.id}` 
        : `/api/events/${selectedEventId}/broadcast-templates`;
      
      const method = template ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Template ${template ? 'updated' : 'created'} successfully!`,
          confirmButtonColor: '#3085d6'
        });
        router.push('/admin/broadcast');
      } else {
        const errorData = await response.json();
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || `Failed to ${template ? 'update' : 'create'} template`,
          confirmButtonColor: '#3085d6'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: `An error occurred while ${template ? 'updating' : 'creating'} the template.`,
        confirmButtonColor: '#3085d6'
      });
    }
  };

  const handleVariableClick = (variable: string) => {
    const formattedVariable = variable.replace(/ \/ /g, "_").replace(/ /g, "_");
    const variableText = `*##_${formattedVariable.toUpperCase()}_##*`;
    
    // If editor instance is available, insert at cursor position
    if (editorRef.current) {
      try {
        // Focus the editor first to ensure cursor position is available <mcreference link="https://stackoverflow.com/questions/71683827/suneditor-inserthtml" index="1">1</mcreference>
        editorRef.current.focus();
        // Use insertHTML to insert at cursor position <mcreference link="https://stackoverflow.com/questions/75687522/how-to-insert-custom-html-at-the-cursors-position-in-suneditor" index="2">2</mcreference>
        editorRef.current.insertHTML(variableText, true, true);
      } catch (error) {
        // Fallback to appending if insertHTML fails
        console.warn('Failed to insert at cursor position, falling back to append:', error);
        setContent(content + variableText);
      }
    } else {
      // Fallback to appending if editor ref is not available
      setContent(content + variableText);
    }
  };

  // Get SunEditor instance when it's ready
  const getSunEditorInstance = (sunEditor: any) => {
    editorRef.current = sunEditor;
  };



  const handleQrCardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setQrCardImageUrl(previewUrl);
      setUploadedImageUrl(previewUrl);
      setCustomImageUrl(""); // Clear custom image when QR card image is selected
    }
  };

  const handleCustomFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCustomImageUrl(previewUrl);
      setUploadedImageUrl(previewUrl);
      setQrCardImageUrl(""); // Clear QR card image when custom image is selected
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {templateType === "whatsapp" ? (
            <MessageSquare className="h-8 w-8 text-green-600" />
          ) : (
            <Mail className="h-8 w-8 text-blue-600" />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {template ? "Edit" : "Create"} {templateType === "whatsapp" ? "WhatsApp" : "Email"} Template
            </h1>
            <p className="text-gray-600 mt-1">
              Design and customize your broadcast template with dynamic variables
            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-white">
          <Sparkles className="h-3 w-3 mr-1" />
          {templateType === "whatsapp" ? "WhatsApp" : "Email"} Template
        </Badge>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Variables Sidebar */}
        <div className="col-span-3">
          <Card className="sticky top-6 border-l-4 border-l-purple-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Variable className="h-5 w-5 text-purple-600" />
                Available Variables
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Click any variable to insert it into your template
              </p>
            </CardHeader>
            <CardContent className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {GUEST_FIELDS.map((field) => (
                  <button
                    key={field}
                    type="button"
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                    onClick={() => handleVariableClick(field)}
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-purple-500 group-hover:text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                        {field}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Form */}
        <div className="col-span-9 space-y-6">
          <form id="broadcast-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Template Name Card */}
            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Template Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                    <FileText className="h-4 w-4 text-gray-500" />
                    Template Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={template?.name || ""}
                    placeholder="Enter a descriptive name for your template"
                    className="focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Editor Card */}
            <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Message Content
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Design your message content using the rich text editor
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content" className="flex items-center gap-2 font-medium mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      Message Content *
                    </Label>
                    <SunEditor
                      setContents={content}
                      onChange={setContent}
                      getSunEditorInstance={getSunEditorInstance}
                      setOptions={{
                         height: "300",
                        buttonList: [
                          ['undo', 'redo'],
                          ['font', 'fontSize', 'formatBlock'],
                          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                          ['fontColor', 'hiliteColor'],
                          ['removeFormat'],
                          ['outdent', 'indent'],
                          ['align', 'horizontalRule', 'list', 'lineHeight'],
                          ['table', 'link'],
                          ['fullScreen', 'showBlocks', 'codeView'],
                          ['preview']
                        ]
                      }}
                    />
                    <input type="hidden" name="content" value={content} />
                  </div>

                  <div>
                    <Label htmlFor="footer" className="flex items-center gap-2 font-medium mb-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      Footer Text
                    </Label>
                    <Textarea
                      id="footer"
                      name="footer"
                      value={footer}
                      onChange={(e) => setFooter(e.target.value)}
                      placeholder="Brief footer text (keep it concise)"
                      className="focus:ring-2 focus:ring-green-500 text-sm min-h-16 max-h-24 resize-none overflow-hidden"
                      maxLength={100}
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {footer.length}/100 characters - Keep footer brief for better readability
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Attachment Card */}
            <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Image className="h-5 w-5 text-orange-600" />
                  Image Attachment
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Choose how to handle image attachments for your template
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RadioGroup
                    value={imageAttachment}
                    onValueChange={(value) => {
                      setImageAttachment(value);
                      // Set imageAttachmentType based on selection
                      if (value === "customize") {
                        setImageAttachmentType("customize");
                      } else if (value === "qr-card") {
                        setImageAttachmentType("qr-card");
                      }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none" className="flex-1 cursor-pointer">
                        <div className="font-medium">No Image</div>
                        <div className="text-sm text-gray-500">Send message without image</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="qr-card" id="qr-card" />
                      <Label htmlFor="qr-card" className="flex-1 cursor-pointer">
                        <div className="font-medium">QR Card</div>
                        <div className="text-sm text-gray-500">Generate QR code card</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="customize" id="customize" />
                      <Label htmlFor="customize" className="flex-1 cursor-pointer">
                        <div className="font-medium">Custom Image</div>
                        <div className="text-sm text-gray-500">Upload your own image</div>
                      </Label>
                    </div>
                  </RadioGroup>
                  <input type="hidden" name="imageAttachment" value={imageAttachment} />

                  {imageAttachment === "qr-card" && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-blue-800 font-medium mb-2 block">
                            QR Card Type
                          </Label>
                          <RadioGroup
                            value={imageAttachmentType}
                            onValueChange={setImageAttachmentType}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                          >
                            <div className="flex items-center space-x-2 p-3 bg-white border border-blue-300 rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="qr-card" id="qr-card-type" />
                              <Label htmlFor="qr-card-type" className="flex-1 cursor-pointer">
                                <div className="font-medium text-blue-800">Standard QR Card</div>
                                <div className="text-sm text-blue-600">Basic QR code with guest info</div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 bg-white border border-blue-300 rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="dynamic-qr" id="dynamic-qr-type" />
                              <Label htmlFor="dynamic-qr-type" className="flex-1 cursor-pointer">
                                <div className="font-medium text-blue-800">Dynamic QR Card</div>
                                <div className="text-sm text-blue-600">Interactive QR with custom fields</div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {imageAttachmentType === "dynamic-qr" && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <Label className="text-blue-800 font-medium mb-2 block">
                                Upload QR Card Template Image
                              </Label>
                              {qrCardImageUrl && (
                                <div className="mb-4 p-4 bg-white rounded-lg border border-blue-200">
                                  <p className="text-sm text-blue-600 mb-3 font-medium">QR Card Image Preview:</p>
                                  <div className="flex justify-center">
                                    <img 
                                      src={qrCardImageUrl} 
                                      alt="QR card template preview" 
                                      className="max-w-md max-h-64 object-contain border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                      onClick={() => window.open(qrCardImageUrl, '_blank')}
                                    />
                                  </div>
                                  <p className="text-xs text-blue-500 mt-2 text-center">Click image to view full size</p>
                                </div>
                              )}
                              <Input
                                type="file"
                                name="qrCardImage"
                                className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                accept="image/png, image/jpeg, image/jpg, image/heic"
                                onChange={handleQrCardFileChange}
                              />
                              <p className="text-xs text-blue-600 mt-1">Upload a template image for your Dynamic QR card. This image will be used as the base for coordinate mapping.</p>
                            </div>
                            <div>
                              <Label className="text-blue-800 font-medium mb-2 block">
                                Configure Dynamic Fields
                              </Label>
                              <CoordinatePicker
                                imageUrl={qrCardImageUrl || uploadedImageUrl}
                                fields={coordinateFields}
                                onFieldsChange={setCoordinateFields}
                                availableFields={GUEST_FIELDS}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {imageAttachment === "customize" && (
                    <div className="mt-4">
                      <Label className="text-gray-600 font-medium mb-3 block">
                        Upload your custom image here
                      </Label>
                      {customImageUrl && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                          <p className="text-sm text-gray-600 mb-3 font-medium">Custom Image Preview:</p>
                          <div className="flex justify-center">
                            <img 
                              src={customImageUrl} 
                              alt="Custom template image preview" 
                              className="max-w-md max-h-64 object-contain border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => window.open(customImageUrl, '_blank')}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2 text-center">Click image to view full size</p>
                        </div>
                      )}
                      <Input
                        type="file"
                        name="customImage"
                        className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="image/png, image/jpeg, image/jpg, image/heic"
                        onChange={handleCustomFileChange}
                      />
                      <p className="text-xs text-gray-600 mt-1">Upload a custom image for your broadcast template. This image will be sent with your messages.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-t-4 border-t-gray-300 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="h-4 w-4" />
                    <span>Template will be saved and ready for broadcasting</span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin/broadcast")}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Templates
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {template ? "Update Template" : "Create Template"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Move } from 'lucide-react';

export interface CoordinateField {
  id: string;
  type: 'qr-code' | 'text';
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fieldName?: string; // For dynamic field mapping
}

interface CoordinatePickerProps {
  imageUrl: string;
  fields: CoordinateField[];
  onFieldsChange: (fields: CoordinateField[]) => void;
  availableFields?: string[];
}

export default function CoordinatePicker({
  imageUrl,
  fields,
  onFieldsChange,
  availableFields = []
}: CoordinatePickerProps) {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingField, setResizingField] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });

  const [shouldShowFields, setShouldShowFields] = useState(false);
  const [newFieldType, setNewFieldType] = useState<'qr-code' | 'text'>('text');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldName, setNewFieldName] = useState('');
  
  const imageRef = useRef<HTMLDivElement>(null);

  // Show fields immediately if they exist and we have an imageUrl
  useEffect(() => {
    if (fields.length > 0 && imageUrl) {
      setShouldShowFields(true);
    }
  }, [fields, imageUrl]);

  const handleResizeMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isResizing || !resizingField || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const field = fields.find(f => f.id === resizingField);
    if (!field) return;
    
    // Calculate size change based on mouse movement
    const deltaX = ((e.clientX - rect.left) / rect.width) * 100 - field.x;
    const deltaY = ((e.clientY - rect.top) / rect.height) * 100 - field.y;
    
    const newWidth = Math.max(5, Math.min(50, resizeStartSize.width + deltaX));
    const newHeight = Math.max(3, Math.min(30, resizeStartSize.height + deltaY));
    
    const updatedFields = fields.map(f => 
      f.id === resizingField 
        ? { ...f, width: newWidth, height: newHeight }
        : f
    );
    
    onFieldsChange(updatedFields);
  }, [isResizing, resizingField, fields, resizeStartSize, onFieldsChange]);

  const addField = useCallback((x: number, y: number) => {
    if (!newFieldLabel.trim()) return;
    
    // Check if trying to add QR code when one already exists
    if (newFieldType === 'qr-code') {
      const existingQRCode = fields.find(field => field.type === 'qr-code');
      if (existingQRCode) {
        alert('Only one QR code is allowed per template');
        return;
      }
    }
    
    if (newFieldType === 'text' && !newFieldName) {
      alert('Please select a field name for text fields');
      return;
    }

    const newField: CoordinateField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: newFieldLabel,
      x,
      y,
      width: newFieldType === 'qr-code' ? 15 : undefined,
      height: newFieldType === 'qr-code' ? 15 : undefined,
      fontSize: newFieldType === 'text' ? 16 : undefined,
      fontWeight: newFieldType === 'text' ? 'normal' : undefined,
      fieldName: newFieldType === 'text' ? newFieldName : undefined
    };

    onFieldsChange([...fields, newField]);
    setNewFieldLabel('');
    setNewFieldName('');
  }, [newFieldType, newFieldLabel, newFieldName, fields, onFieldsChange]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current || selectedField) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    addField(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
  }, [addField, selectedField]);

  const handleFieldMouseDown = useCallback((e: React.MouseEvent, fieldId: string) => {
    // Don't start dragging if we're clicking on a resize handle
    if ((e.target as HTMLElement).classList.contains('cursor-se-resize')) {
      return;
    }
    
    e.stopPropagation();
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;
    
    const fieldX = (field.x / 100) * rect.width;
    const fieldY = (field.y / 100) * rect.height;
    
    setSelectedField(fieldId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left - fieldX,
      y: e.clientY - rect.top - fieldY
    });
  }, [fields]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && selectedField && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
      const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

      const updatedFields = fields.map(field => 
        field.id === selectedField 
          ? { ...field, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
          : field
      );
      
      onFieldsChange(updatedFields);
    } else if (isResizing) {
      handleResizeMouseMove(e);
    }
  }, [isDragging, selectedField, dragOffset, fields, onFieldsChange, isResizing, handleResizeMouseMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setSelectedField(null);
    setResizingField(null);
    setDragOffset({ x: 0, y: 0 });
    setResizeStartSize({ width: 0, height: 0 });
  }, []);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, fieldId: string) => {
    e.stopPropagation();
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;
    
    setIsResizing(true);
    setResizingField(fieldId);
    setResizeStartSize({ 
      width: field.width || (field.type === 'qr-code' ? 15 : 20), 
      height: field.height || (field.type === 'qr-code' ? 15 : 5) 
    });
  }, [fields]);

  const removeField = (fieldId: string) => {
    onFieldsChange(fields.filter(f => f.id !== fieldId));
  };

  const updateFieldProperty = (fieldId: string, property: string, value: string | number) => {
    const updatedFields = fields.map(field => 
      field.id === fieldId ? { ...field, [property]: value } : field
    );
    onFieldsChange(updatedFields);
  };

  return (
    <div className="space-y-4">
      {/* Add New Field Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Add New Field</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Type</Label>
              <select 
                value={newFieldType} 
                onChange={(e) => setNewFieldType(e.target.value as 'qr-code' | 'text')}
                className="w-full p-1 border rounded text-sm"
              >
                <option value="text">Text Field</option>
                <option 
                  value="qr-code" 
                  disabled={fields.some(field => field.type === 'qr-code')}
                >
                  QR Code {fields.some(field => field.type === 'qr-code') ? '(Only 1 allowed)' : ''}
                </option>
              </select>
            </div>
            <div>
              <Label className="text-xs">Label</Label>
              <Input 
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                placeholder="Field label"
                className="text-sm h-8"
              />
            </div>
          </div>
          
          {newFieldType === 'text' && (
            <div>
              <Label className="text-xs">Field Name</Label>
              <select 
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="w-full p-1 border rounded text-sm"
              >
                <option value="">Select field...</option>
                {availableFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => addField(50, 50)}
              disabled={!newFieldLabel.trim() || (newFieldType === 'text' && !newFieldName)}
              className="text-xs h-7"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Field
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Click "Add Field" or click on the image to place the field
          </p>
        </CardContent>
      </Card>

      {/* Image Preview with Coordinate Picker */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Template Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={imageRef}
            className="relative border-2 border-dashed border-gray-300 cursor-crosshair"
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Template" 
                className="w-full h-auto"
                onLoad={() => {
                  setShouldShowFields(true);
                }}
                onError={() => {
                  // If image fails to load, still show fields if they exist
                  if (fields.length > 0) {
                    setShouldShowFields(true);
                  }
                }}
                draggable={false}
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-lg mb-2">📷</div>
                  <div>No image available</div>
                  <div className="text-sm">Upload an image to configure coordinates</div>
                </div>
              </div>
            )}
            
            {shouldShowFields && fields.map(field => (
              <div
                key={field.id}
                className={`absolute border-2 cursor-move ${
                  field.type === 'qr-code' 
                    ? 'border-blue-500 bg-blue-100' 
                    : 'border-green-500 bg-green-100'
                } ${selectedField === field.id ? 'border-red-500' : ''}`}
                style={{
                  left: `${field.x}%`,
                  top: `${field.y}%`,
                  width: field.width ? `${field.width}%` : '100px',
                  height: field.height ? `${field.height}%` : '30px',
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseDown={(e) => handleFieldMouseDown(e, field.id)}
              >
                {field.type === 'qr-code' ? (
                    <div className="flex flex-col items-center justify-center h-full bg-white border-2 border-gray-400 relative">
                      {/* Dummy QR Code Pattern */}
                      <div className="w-full h-full p-1">
                        <div className="w-full h-full grid grid-cols-8 gap-px bg-white">
                          {/* Generate a simple QR-like pattern */}
                          {Array.from({ length: 64 }, (_, i) => (
                            <div
                              key={i}
                              className={`${
                                // Create a pattern that looks like a QR code
                                (i % 8 === 0 || i % 8 === 7 || Math.floor(i / 8) === 0 || Math.floor(i / 8) === 7) ||
                                (i >= 9 && i <= 11 && Math.floor(i / 8) <= 2) ||
                                (i >= 52 && i <= 54 && Math.floor(i / 8) >= 5) ||
                                (i % 3 === 0 && i % 7 !== 0)
                                  ? 'bg-black'
                                  : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Resize handles */}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 cursor-se-resize" 
                           onMouseDown={(e) => handleResizeMouseDown(e, field.id)} />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-0 right-0 h-4 w-4 p-0 hover:bg-red-200 bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeField(field.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                ) : (
                   <div className="flex items-center justify-between p-1 relative">
                     <span 
                       className="truncate"
                       style={{
                         fontSize: `${field.fontSize || 16}px`,
                         fontWeight: field.fontWeight || 'normal'
                       }}
                     >
                       {field.label}
                     </span>
                     {/* Resize handles for text fields */}
                     <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 cursor-se-resize" 
                          onMouseDown={(e) => handleResizeMouseDown(e, field.id)} />
                     <Button
                       size="sm"
                       variant="ghost"
                       className="h-4 w-4 p-0 hover:bg-red-200"
                       onClick={(e) => {
                         e.stopPropagation();
                         removeField(field.id);
                       }}
                     >
                       <X className="h-3 w-3" />
                     </Button>
                   </div>
                 )}
                <Move className="absolute bottom-0 right-0 h-3 w-3 text-gray-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Field List and Properties */}
      {fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Field Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fields.map(field => (
                <div key={field.id} className="border rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={field.type === 'qr-code' ? 'default' : 'secondary'}>
                      {field.type === 'qr-code' ? 'QR Code' : 'Text'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeField(field.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <Label className="text-xs">Label</Label>
                      <Input 
                        value={field.label}
                        onChange={(e) => updateFieldProperty(field.id, 'label', e.target.value)}
                        className="h-7 text-xs"
                      />
                    </div>
                    
                    {field.type === 'text' && (
                      <div>
                        <Label className="text-xs">Field Name</Label>
                        <select 
                          value={field.fieldName || ''}
                          onChange={(e) => updateFieldProperty(field.id, 'fieldName', e.target.value)}
                          className="w-full p-1 border rounded text-xs h-7"
                        >
                          <option value="">Select field...</option>
                          {availableFields.map(fieldName => (
                            <option key={fieldName} value={fieldName}>{fieldName}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div>
                      <Label className="text-xs">X (%)</Label>
                      <Input 
                        type="number"
                        value={Math.round(field.x)}
                        onChange={(e) => updateFieldProperty(field.id, 'x', Number(e.target.value))}
                        className="h-7 text-xs"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Y (%)</Label>
                      <Input 
                        type="number"
                        value={Math.round(field.y)}
                        onChange={(e) => updateFieldProperty(field.id, 'y', Number(e.target.value))}
                        className="h-7 text-xs"
                        min="0"
                        max="100"
                      />
                    </div>
                    
                    {field.type === 'qr-code' ? (
                      <>
                        <div>
                          <Label className="text-xs">Width (%)</Label>
                          <Input 
                            type="number"
                            value={field.width || 15}
                            onChange={(e) => updateFieldProperty(field.id, 'width', Number(e.target.value))}
                            className="h-7 text-xs"
                            min="5"
                            max="50"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Height (%)</Label>
                          <Input 
                            type="number"
                            value={field.height || 15}
                            onChange={(e) => updateFieldProperty(field.id, 'height', Number(e.target.value))}
                            className="h-7 text-xs"
                            min="5"
                            max="50"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label className="text-xs">Font Size (px)</Label>
                          <Input 
                            type="number"
                            value={field.fontSize || 16}
                            onChange={(e) => updateFieldProperty(field.id, 'fontSize', Number(e.target.value))}
                            className="h-7 text-xs"
                            min="8"
                            max="72"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Font Weight</Label>
                          <Select 
                            value={field.fontWeight || 'normal'}
                            onValueChange={(value) => updateFieldProperty(field.id, 'fontWeight', value)}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Regular</SelectItem>
                              <SelectItem value="bold">Bold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
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
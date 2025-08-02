"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, FileText, CheckCircle, X, AlertCircle } from "lucide-react";
import { useState } from "react";

type ImportDialogProps = {
  onImport: (file: File) => void;
  onDownloadTemplate: () => void;
};

export function ImportDialog({
  onImport,
  onDownloadTemplate,
}: ImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleImportClick = () => {
    if (file) {
      onImport(file);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200">
          <Upload className="mr-2 h-4 w-4" /> Import Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Upload className="h-6 w-6" />
              Import Data
            </DialogTitle>
            <p className="text-blue-100 mt-2">Upload your Excel file to import data quickly and efficiently</p>
          </DialogHeader>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Step 1: Download Template */}
          <Card className="border-2 border-blue-100 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Download className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Step 1: Download Template</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Download our Excel template to ensure your data is formatted correctly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDownloadTemplate}
                    className="bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Download Template.xlsx
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Upload File */}
          <Card className="border-2 border-emerald-100 bg-emerald-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <Upload className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Step 2: Upload Your File</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Select your completed Excel file to upload.
                  </p>
                  
                  <div className="relative">
                    {file ? (
                      <div className="bg-white border-2 border-emerald-200 rounded-lg p-4 transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFile(null)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload"
                        className="block w-full cursor-pointer"
                      >
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-200">
                          <div className="bg-gray-100 p-3 rounded-full w-fit mx-auto mb-4">
                            <Upload className="h-6 w-6 text-gray-600" />
                          </div>
                          <p className="text-gray-600 font-medium mb-1">Click to upload file</p>
                          <p className="text-sm text-gray-500">or drag and drop your Excel file here</p>
                          <Badge variant="secondary" className="mt-2">Excel files only (.xlsx)</Badge>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".xlsx,.xls"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Important Notes</p>
                <ul className="text-xs text-amber-700 mt-1 space-y-1">
                  <li>• This process may take a few minutes for large files</li>
                  <li>• Import will continue in the background</li>
                  <li>• Make sure your data follows the template format</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="bg-gray-50 px-6 py-4">
          <div className="flex gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleImportClick} 
              disabled={!file}
              className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
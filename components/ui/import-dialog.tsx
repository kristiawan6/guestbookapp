"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
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
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                First, download the Template Excel file.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={onDownloadTemplate}
              >
                <Download className="mr-2 h-4 w-4" /> Template_Excel.xlsx
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                Please upload the documents in the section below.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 w-full">
                  {file ? (
                    <div className="flex justify-between items-center">
                      <span>{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="flex justify-center items-center cursor-pointer"
                    >
                      <Button asChild variant="outline">
                        <span>Select a File</span>
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".xlsx"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            This process may take a few minutes and will continue in the
            background.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleImportClick} disabled={!file}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
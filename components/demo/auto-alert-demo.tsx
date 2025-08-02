"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAutoAlert, AlertType } from "@/hooks/use-auto-alert";
import { Separator } from "@/components/ui/separator";

/**
 * Demo component showcasing the auto-closing alert system
 * This component demonstrates all available alert types and their configurations
 */
export const AutoAlertDemo: React.FC = () => {
  const {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showPersistent,
    handlePromise,
    dismissAll,
    showValidationError,
    showApiSuccess,
    showApiError,
  } = useAutoAlert();

  const [customMessage, setCustomMessage] = useState("Custom alert message");
  const [customDuration, setCustomDuration] = useState("4000");
  const [selectedType, setSelectedType] = useState<AlertType>("info");
  const [loadingToastId, setLoadingToastId] = useState<string | number | null>(null);

  // Simulate async operation
  const simulateAsyncOperation = (shouldFail: boolean = false): Promise<{ name: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Operation failed"));
        } else {
          resolve({ name: "Data" });
        }
      }, 2000);
    });
  };

  const handlePromiseDemo = (shouldFail: boolean = false) => {
    const promise = simulateAsyncOperation(shouldFail);
    handlePromise(
      promise,
      {
        loading: "Processing your request...",
        success: (data) => `${data.name} loaded successfully!`,
        error: (error) => `Failed to load data: ${error.message}`,
      },
      { duration: 3000 }
    );
  };

  const handleLoadingDemo = () => {
    const toastId = showLoading("Loading data...");
    setLoadingToastId(toastId);
    
    // Simulate completion after 3 seconds
    setTimeout(() => {
      showSuccess("Data loaded successfully!");
      setLoadingToastId(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auto-Closing Alert System Demo</CardTitle>
          <CardDescription>
            Demonstration of the comprehensive auto-closing alert system with various toast types and configurations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Alert Types */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Basic Alert Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => showSuccess("Operation completed successfully!")}
                variant="default"
                className="bg-green-600 hover:bg-green-700"
              >
                Success (3s)
              </Button>
              <Button
                onClick={() => showError("Something went wrong!", { description: "Please try again later" })}
                variant="destructive"
              >
                Error (6s)
              </Button>
              <Button
                onClick={() => showWarning("Please review your input", { description: "Some fields may need attention" })}
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                Warning (5s)
              </Button>
              <Button
                onClick={() => showInfo("Here's some helpful information", { description: "This is additional context" })}
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Info (4s)
              </Button>
            </div>
          </div>

          <Separator />

          {/* Custom Alert Configuration */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Custom Alert Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter custom message"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (ms)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="Duration in milliseconds"
                />
              </div>
              <div>
                <Label htmlFor="type">Alert Type</Label>
                <Select value={selectedType} onValueChange={(value: AlertType) => setSelectedType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => showAlert(selectedType, customMessage, { duration: parseInt(customDuration) })}
              className="w-full md:w-auto"
            >
              Show Custom Alert
            </Button>
          </div>

          <Separator />

          {/* Special Alert Types */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Special Alert Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={handleLoadingDemo}
                variant="outline"
                disabled={loadingToastId !== null}
              >
                {loadingToastId ? "Loading..." : "Loading Demo"}
              </Button>
              <Button
                onClick={() => showPersistent("This alert stays until dismissed", {
                  description: "Click the X to close",
                  action: {
                    label: "Action",
                    onClick: () => showInfo("Action clicked!"),
                  },
                })}
                variant="outline"
              >
                Persistent Alert
              </Button>
              <Button
                onClick={dismissAll}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Dismiss All
              </Button>
            </div>
          </div>

          <Separator />

          {/* Promise Handling */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Promise Handling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                onClick={() => handlePromiseDemo(false)}
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                Successful Promise
              </Button>
              <Button
                onClick={() => handlePromiseDemo(true)}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Failed Promise
              </Button>
            </div>
          </div>

          <Separator />

          {/* API Feedback Examples */}
          <div>
            <h3 className="text-lg font-semibold mb-3">API Feedback Examples</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => showApiSuccess("created", "User")}
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                API Success
              </Button>
              <Button
                onClick={() => showApiError("Create User", "Email already exists")}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                API Error
              </Button>
              <Button
                onClick={() => showValidationError(["Name is required", "Email is invalid", "Password too short"])}
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                Validation Errors
              </Button>
              <Button
                onClick={() => showValidationError("Single validation error")}
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                Single Error
              </Button>
            </div>
          </div>

          <Separator />

          {/* Duration Examples */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Duration Examples</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => showInfo("Quick message", { duration: 1000 })}
                variant="outline"
                size="sm"
              >
                1 Second
              </Button>
              <Button
                onClick={() => showInfo("Standard message", { duration: 3000 })}
                variant="outline"
                size="sm"
              >
                3 Seconds
              </Button>
              <Button
                onClick={() => showInfo("Longer message", { duration: 8000 })}
                variant="outline"
                size="sm"
              >
                8 Seconds
              </Button>
              <Button
                onClick={() => showInfo("Very long message for important information", { duration: 15000 })}
                variant="outline"
                size="sm"
              >
                15 Seconds
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Information */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">Default Durations:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Success: 3 seconds</li>
                <li>Error: 6 seconds (longer for important errors)</li>
                <li>Warning: 5 seconds</li>
                <li>Info: 4 seconds</li>
                <li>Loading: Persists until dismissed or updated</li>
                <li>Persistent: Stays until manually dismissed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Features:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Auto-dismiss with configurable durations</li>
                <li>Multiple toast types with appropriate styling</li>
                <li>Promise handling with loading, success, and error states</li>
                <li>Persistent toasts for critical information</li>
                <li>Batch dismissal functionality</li>
                <li>Custom actions and descriptions</li>
                <li>Validation error handling</li>
                <li>API operation feedback</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
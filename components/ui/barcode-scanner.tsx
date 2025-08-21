"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const BarcodeScanner = ({
  onScan,
  onError,
}: {
  onScan: (data: string) => void;
  onError: (error: Error) => void;
}) => {
  // Create a stable, unique ID for the scanner's container element.
  const containerId = useRef(`reader-${Math.random().toString(36).substr(2, 9)}`);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use refs to hold the latest callbacks. This avoids re-running the main effect.
  const onScanRef = useRef(onScan);
  const onErrorRef = useRef(onError);

  // Keep the callback refs updated if the props change.
  useEffect(() => {
    onScanRef.current = onScan;
    onErrorRef.current = onError;
  }, [onScan, onError]);

  // This is the main effect that creates and destroys the scanner.
  // The empty dependency array [] ensures it runs ONLY ONCE when the component mounts.
  useEffect(() => {
    let isMounted = true;
    
    const initializeScanner = async () => {
      // Ensure any existing scanner is cleaned up first
      if (scannerRef.current) {
        try {
          await scannerRef.current.clear();
          scannerRef.current = null;
        } catch (error) {
          console.log("Previous scanner cleanup:", error);
        }
      }
      
      if (!isMounted) return;
      
      const element = document.getElementById(containerId.current);
      if (!element) {
        console.error("Scanner container element not found");
        if (isMounted) {
          setError("Scanner container not found");
          setIsLoading(false);
          onErrorRef.current(new Error("Scanner container not found"));
        }
        return;
      }

      const scanner = new Html5QrcodeScanner(
        containerId.current, // Use the unique ID here.
        {
          qrbox: 250, // Use simple number format instead of object
          fps: 10,
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          showTorchButtonIfSupported: true,
          aspectRatio: 1.0,
          disableFlip: false,
        },
        false // Set to false to reduce console noise
      );
      
      scannerRef.current = scanner;

      const handleSuccess = (decodedText: string) => {
        console.log("QR Code scanned:", decodedText);
        if (isMounted) {
          setIsLoading(false);
          setError(null);
          onScanRef.current(decodedText);
        }
        // Stop the scanner after successful scan to prevent looping
        scanner.clear().catch((error) => {
          console.error("Failed to clear scanner after success:", error);
        });
      };

      const handleError = (errorMessage: string) => {
        // Only report actual errors, not scanning attempts
        if (!errorMessage.includes("QR code parse error") && 
             !errorMessage.includes("No QR code found") &&
             !errorMessage.includes("NotFoundException") &&
             !errorMessage.includes("No MultiFormat Readers")) {
          console.error("Scanner error:", errorMessage);
          if (isMounted) {
            setError(errorMessage);
            setIsLoading(false);
            onErrorRef.current(new Error(errorMessage));
          }
        }
      };

      try {
        await scanner.render(handleSuccess, handleError);
        console.log("Scanner initialized successfully");
        // Set loading to false immediately after scanner renders
        if (isMounted) {
          setIsLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error("Failed to initialize scanner:", error);
        if (isMounted) {
          setError("Failed to initialize camera scanner");
          setIsLoading(false);
          onErrorRef.current(new Error("Failed to initialize camera scanner"));
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeScanner, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      
      // Cleanup scanner
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => {
          if (error.name !== "NotFoundError") {
            console.error("Failed to clear scanner:", error);
          }
        });
        scannerRef.current = null;
      }
    };
  }, []); // The empty array is critical here.

  // Render the unique container for the scanner with loading and error states
  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-sm text-gray-600">Initializing camera...</p>
          <p className="text-xs text-gray-500 mt-2">Please allow camera access when prompted</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg">
          <div className="text-red-600 mb-2">⚠️</div>
          <p className="text-sm text-red-600 text-center">{error}</p>
          <p className="text-xs text-gray-500 mt-2">Please check camera permissions and try again</p>
        </div>
      )}
      <div 
        id={containerId.current} 
        data-testid="barcode-scanner" 
        style={{ 
          width: "100%", 
          minHeight: "300px",
          display: isLoading || error ? "none" : "block"
        }} 
      />
    </div>
  );
};

export default BarcodeScanner;
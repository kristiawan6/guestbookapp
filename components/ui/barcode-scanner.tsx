"use client";

import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface BarcodeScannerProps {
  onScan: (data: string | null) => void;
  onError: (error: any) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  onError,
}) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    scanner.render(onScan, (errorMessage) => {
      // Do not treat "QR code parse error" as a fatal error.
      if (!errorMessage.includes("QR code parse error")) {
        onError(new Error(errorMessage));
      }
    });

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner:", error);
      });
    };
  }, [onScan, onError]);

  return <div id="reader" />;
};

export default BarcodeScanner;
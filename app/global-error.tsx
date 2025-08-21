'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 px-4">
          <div className="max-w-md w-full text-center">
            {/* 404 SVG Image for consistency */}
            <div className="mb-8">
              <Image
                src="/404.svg"
                alt="Global Error - Something went wrong"
                width={400}
                height={300}
                className="mx-auto"
                priority
              />
            </div>
            
            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Error
            </h1>
            
            <p className="text-gray-600 mb-8">
              A critical error occurred. Please refresh the page or contact support.
            </p>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                className="w-full"
                onClick={reset}
              >
                Try Again
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
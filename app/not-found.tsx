"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 SVG Image */}
        <div className="mb-8">
          <Image
            src="/404.svg"
            alt="404 - Page Not Found"
            width={400}
            height={300}
            className="mx-auto"
            priority
          />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/" className="block">
            <Button className="w-full">Go Home</Button>
          </Link>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

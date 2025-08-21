"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 SVG Image */}
        <div className="mb-8">
          <Image
            src="/404.svg"
            alt="404 - Auth Page Not Found"
            width={400}
            height={300}
            className="mx-auto"
            priority
          />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Authentication Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          The authentication page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/auth/login" className="block">
            <Button className="w-full">Go to Login</Button>
          </Link>

          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              Go to Home
            </Button>
          </Link>

          <Button
            variant="ghost"
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

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useActionState, useEffect } from "react";
import { login } from "@/app/auth/login/actions";
import Image from "next/image";
import Link from "next/link";
import { usePrefetchUser } from "@/hooks/use-prefetch-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
 
 export default function LoginPage() {
   const [state, formAction] = useActionState(login, { error: "" });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  usePrefetchUser();

  useEffect(() => {
    if (state?.error) {
      toast.error("Login Failed", {
        description: state.error,
        classNames: {
          description: "text-black",
        },
      });
      setLoading(false);
      setProgress(0);
    } else if (state?.success) {
      setProgress(100);
      toast.success("Login Success", {
        description: "Welcome back! You have successfully logged in.",
        classNames: {
          description: "text-black",
        },
      });
      if (state.role === "SuperAdmin" || state.role === "AdminEvents") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image 
              src="/guestly_logo.svg" 
              alt="Guestly Logo" 
              width={120} 
              height={40} 
              className="mx-auto"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Sign In
          </h1>
          <p className="text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        <Card className="shadow-lg bg-white border border-gray-200">
          <CardContent className="p-8 space-y-6">
            <form
              action={(formData) => {
                setLoading(true);
                setProgress(50);
                formAction(formData);
              }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username or Email
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="super@admin"
                  required
                  className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
                  
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
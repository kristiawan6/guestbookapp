"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { login } from "@/app/auth/login/actions";
import Image from "next/image";
import Link from "next/link";
import { usePrefetchUser } from "@/hooks/use-prefetch-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    <div className="flex min-h-screen">
      <div className="relative w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login background"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-center w-1/2">
        <div className="w-full max-w-sm p-8 space-y-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <form
            action={(formData) => {
              setLoading(true);
              setProgress(50);
              formAction(formData);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username or Email</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full max-w-xs"
                loading={loading}
                progress={progress}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
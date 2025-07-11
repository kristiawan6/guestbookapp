"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { login } from "@/app/auth/login/actions";
import Image from "next/image";
import Link from "next/link";
import { usePrefetchUser } from "@/hooks/use-prefetch-user";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, { error: "" });
  usePrefetchUser();

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
          <form action={formAction} className="space-y-4">
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
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
            <div className="flex justify-end">
              <Button type="submit" className="w-full max-w-xs">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
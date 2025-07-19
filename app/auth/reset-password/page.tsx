"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleRequestOtp = async () => {
    try {
      const response = await fetch("/api/auth/reset-password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setStep(2);
      Swal.fire({
        icon: "success",
        title: "OTP sent successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: error.message,
      });
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      Swal.fire({
        icon: "success",
        title: "Password reset successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>
            <div className="mt-8 space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button onClick={handleRequestOtp} className="w-full">
                Request OTP
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
            <div className="mt-8 space-y-6">
              <div>
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button onClick={handleResetPassword} className="w-full">
                Reset Password
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
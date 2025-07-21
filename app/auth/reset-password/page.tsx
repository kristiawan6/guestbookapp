"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
 
 export default function ResetPasswordPage() {
   const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const router = useRouter();

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: message,
      });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password: "" }), // password can be empty for verification
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setIsOtpVerified(true);
      Swal.fire({
        icon: "success",
        title: "OTP verified successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: message,
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
      }).then(() => {
        router.push("/auth/login");
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: message,
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
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
            <h2 className="text-2xl font-bold text-center">
              {isOtpVerified ? "Reset Password" : "Verify"}
            </h2>
            <p className="text-center text-gray-500">
              {isOtpVerified
                ? "You can now set a new password."
                : "Your code was sent to you via email"}
            </p>
            <div className="mt-8 space-y-6">
              {!isOtpVerified ? (
                <>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button onClick={handleVerifyOtp} className="w-full">
                    Verify
                  </Button>
                  <div className="text-center">
                    <p className="text-sm">
                      Didn't receive code?{" "}
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRequestOtp();
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Request again
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="password">New Password</Label>
                    <PasswordInput
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                  <Button onClick={handleResetPassword} className="w-full">
                    Reset Password
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
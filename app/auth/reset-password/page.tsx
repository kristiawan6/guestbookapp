"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { toastService } from "@/lib/toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Smartphone, ArrowLeft } from "lucide-react";
 
 export default function ResetPasswordPage() {
   const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
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
      const data = await response.json();
      setQrCodeDataUrl(data.data?.qrCodeDataUrl || null);
      setStep(2);
      toastService.success("QR Code Generated", {
        description: "Scan the QR code with Google Authenticator app to set up TOTP verification.",
        duration: 4000
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toastService.error("Request Failed", {
        description: message,
        duration: 6000
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
      toastService.success("Verification Successful", {
        description: "Your TOTP code has been verified. You can now reset your password.",
        duration: 3000
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toastService.error("Verification Failed", {
        description: message,
        duration: 6000
      });
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toastService.error("Password Mismatch", {
        description: "The passwords you entered do not match. Please check and try again.",
        duration: 5000
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

      toastService.success("Password Reset Complete", {
        description: "Your password has been successfully updated. Redirecting to login page...",
        duration: 3000
      });
      
      // Redirect after showing success message
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toastService.error("Password Reset Failed", {
        description: message,
        duration: 6000
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              {step === 1 ? "Enter your email to get started" : 
               step === 2 && !isOtpVerified ? "Verify your identity" : 
               "Create your new password"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button 
                  onClick={handleRequestOtp} 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Continue with Email
                </Button>
                <div className="text-center">
                  <Link 
                    href="/auth/login" 
                    className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                {!isOtpVerified ? (
                  <>
                    {/* QR Code Section - Only show if not verified */}
                    {qrCodeDataUrl && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2 text-blue-700 mb-3">
                          <Smartphone className="w-5 h-5" />
                          <span className="font-medium">Setup Google Authenticator</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
                          <img 
                            src={qrCodeDataUrl} 
                            alt="Google Authenticator QR Code" 
                            className="w-48 h-48 mx-auto rounded-lg" 
                          />
                        </div>
                        <p className="text-sm text-gray-600 max-w-sm mx-auto">
                          Scan this QR code with Google Authenticator app, then enter the 6-digit code below
                        </p>
                      </div>
                    )}
                    
                    {/* OTP Input Section */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700 block text-center">
                        Enter 6-digit code from Google Authenticator
                      </Label>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={(value) => setOtp(value)}
                          className="gap-3"
                        >
                          <InputOTPGroup className="gap-3">
                            <InputOTPSlot index={0} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                            <InputOTPSlot index={1} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                            <InputOTPSlot index={2} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                            <InputOTPSlot index={3} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                            <InputOTPSlot index={4} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                            <InputOTPSlot index={5} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleVerifyOtp} 
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                      disabled={otp.length !== 6}
                    >
                      Verify Code
                    </Button>
                    
                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-600">
                        Didn't receive the code?{" "}
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRequestOtp();
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                        >
                          Generate new QR code
                        </Link>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Success indicator */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-medium">Identity Verified Successfully</p>
                      <p className="text-green-600 text-sm">You can now create a new password</p>
                    </div>
                    
                    {/* Password Reset Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          New Password
                        </Label>
                        <PasswordInput
                          id="password"
                          placeholder="Enter your new password"
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                          Confirm New Password
                        </Label>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder="Confirm your new password"
                          value={confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleResetPassword} 
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                      disabled={!password || !confirmPassword || password !== confirmPassword}
                    >
                      Reset Password
                    </Button>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
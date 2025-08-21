"use client";

import {
  User,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatistics } from "@/hooks/use-statistics";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type UserProfile = {
  id: string;
  username: string;
  email: string;
  fullname: string;
  role: string;
  isActive: boolean;
};

export default function EditProfilePage() {
  const { user } = useStatistics();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        id: user.id || '',
        username: user.username || '',
        email: user.email || '',
        fullname: user.fullname || '',
        role: user.role || '',
        isActive: user.isActive ?? true,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const updatedProfile = {
      fullname: formData.get('fullname') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
    };

    try {
      const response = await fetch(`/api/users/${profile.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);        
        await Swal.fire({
          title: 'Success!',
          text: 'Your profile has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10b981',
        });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Edit Profile
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Update your personal information and account details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="fullname" className="text-sm font-semibold text-gray-700">
                        Full Name *
                      </Label>
                    </div>
                    <Input
                      id="fullname"
                      name="fullname"
                      defaultValue={profile.fullname}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-4 w-4 text-green-500" />
                      <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                        Username *
                      </Label>
                    </div>
                    <Input
                      id="username"
                      name="username"
                      defaultValue={profile.username}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your username"
                      required
                    />
                  </CardContent>
                </Card>
              </div>

              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-4 w-4 text-purple-500" />
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </Label>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={profile.email}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter your email address"
                    required
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
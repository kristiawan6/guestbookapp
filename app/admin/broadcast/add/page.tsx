"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStatistics } from "@/hooks/use-statistics";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const GUEST_FIELDS = [
  "name",
  "email",
  "phoneNumber",
  "guestCategoryId",
  "status",
];

import BroadcastTemplateForm from "@/components/ui/broadcast-template-form";

export default function AddBroadcastTemplatePage() {
  return <BroadcastTemplateForm />;
}
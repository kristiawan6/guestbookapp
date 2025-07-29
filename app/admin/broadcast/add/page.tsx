"use client";

import BroadcastTemplateForm from "@/components/ui/broadcast-template-form";
import { useSearchParams } from "next/navigation";

export default function AddBroadcastTemplatePage() {
  const searchParams = useSearchParams();
  const templateType = searchParams.get('type') || 'whatsapp';
  
  return <BroadcastTemplateForm templateType={templateType} />;
}
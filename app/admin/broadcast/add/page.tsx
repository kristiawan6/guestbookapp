"use client";

import BroadcastTemplateForm from "@/components/ui/broadcast-template-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AddBroadcastTemplateContent() {
  const searchParams = useSearchParams();
  const templateType = searchParams.get('type') || 'whatsapp';
  
  return <BroadcastTemplateForm templateType={templateType} />;
}

export default function AddBroadcastTemplatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddBroadcastTemplateContent />
    </Suspense>
  );
}
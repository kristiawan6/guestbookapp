"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStatistics } from "@/hooks/use-statistics";
import { useRouter } from "next/navigation";
import SunEditor from "@/components/ui/sun-editor";

const GUEST_FIELDS = [
  "name",
  "email",
  "phoneNumber",
  "guestCategoryId",
  "status",
];

import BroadcastTemplateForm from "@/components/ui/broadcast-template-form";

export default function EditBroadcastTemplatePage({
  params,
}: {
  params: { templateId: string };
}) {
  const { selectedEventId } = useStatistics();
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
    if (selectedEventId) {
      fetch(
        `/api/events/${selectedEventId}/broadcast-templates/${params.templateId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTemplate(data.data);
        });
    }
  }, [selectedEventId, params.templateId]);

  if (!template) {
    return <div>Loading...</div>;
  }

  return <BroadcastTemplateForm template={template} />;
}
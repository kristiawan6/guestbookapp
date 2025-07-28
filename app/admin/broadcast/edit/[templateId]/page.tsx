"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStatistics } from "@/hooks/use-statistics";
import BroadcastTemplateForm from "@/components/ui/broadcast-template-form";

export default function EditBroadcastTemplatePage() {
  const params = useParams();
  const templateId = params.templateId as string;
  const { selectedEventId } = useStatistics();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    if (selectedEventId && templateId) {
      fetch(`/api/events/${selectedEventId}/broadcast-templates/${templateId}`)
        .then((res) => res.json())
        .then((data) => {
          setTemplate(data.data);
        });
    }
  }, [selectedEventId, templateId]);

  if (!template) {
    return <div>Loading...</div>;
  }

  return <BroadcastTemplateForm template={template} />;
}
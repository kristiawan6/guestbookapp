"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStatistics } from "@/hooks/use-statistics";
import { useRouter } from "next/navigation";
import SunEditor from "@/components/ui/sun-editor";

const GUEST_FIELDS = [
  "Fullname",
  "Email",
  "Address / Institution",
  "Category",
  "Table Number",
  "Notes",
  "Total Pack",
  "Link Web Inv (Personal)",
  "Link RSVP",
  "Link Web (General)",
];

interface Template {
  id: string;
  name: string;
  content: string;
  footer: string;
  imageAttachment: string;
}

export default function BroadcastTemplateForm({
  template,
}: {
  template?: Template;
}) {
  const { selectedEventId } = useStatistics();
  const [content, setContent] = useState(
    template?.content ||
      `Yth Bapak/Ibu*##_GUEST_NAME_##* *##_GUEST_ADDRESS_##*
Kami dari Titik Titik Event Organizer sebagai perwakilan dari PT. Bank Terbesar Indonesia, Tbk.
Mengirimkan QR code undangan sebagai peserta`
  );
  const router = useRouter();
  const [buttonWhatsapp, setButtonWhatsapp] = useState(false);
  const [imageAttachment, setImageAttachment] = useState(
    template?.imageAttachment || "customize"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const file = formData.get("image") as File;
    let imageUrl = imageAttachment;

    if (file && file.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
        return;
      }

      const imageFormData = new FormData();
      imageFormData.append("file", file);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });
        const result = await response.json();
        if (result.success) {
          imageUrl = result.path;
        } else {
          alert(`Image upload failed: ${result.error}`);
          return;
        }
      } catch {
        alert("An error occurred while uploading the image.");
        return;
      }
    }

    const data = Object.fromEntries(formData.entries());

    const url = template
      ? `/api/events/${selectedEventId}/broadcast-templates/${template.id}`
      : `/api/events/${selectedEventId}/broadcast-templates`;
    const method = template ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        type: "WhatsApp",
        content,
        footer: data.footer,
        button: buttonWhatsapp ? data.button : undefined,
        imageAttachment: imageUrl,
      }),
    });

    router.push("/admin/broadcast");
  };

  const handleVariableClick = (variable: string) => {
    const formattedVariable = variable.replace(/ \/ /g, "_").replace(/ /g, "_");
    setContent(content + `*##_${formattedVariable.toUpperCase()}_##*`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-green-500"
                >
                  <path d="M22 12a10 10 0 1 1-10-10 10 10 0 0 1 10 10z" />
                  <path d="M16 10a4 4 0 0 0-8 0c0 4 8 12 8 12s8-8 8-12a4 4 0 0 0-8 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              Add Template for Whatsapp
            </h3>
            <p className="text-gray-600 mb-4">
              Variable you can use for this template
            </p>
            <ul>
              {GUEST_FIELDS.map((field) => (
                <li
                  key={field}
                  className="cursor-pointer text-blue-600 hover:underline mb-2 flex items-center"
                  onClick={() => handleVariableClick(field)}
                >
                  <span className="text-lg mr-2">+</span> {field}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-9">
          <form
            id="broadcast-form"
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="mb-4">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={template?.name || ""}
                placeholder="Event Template (id)"
              />
            </div>
            <div className="mb-4">
              <SunEditor
                setContents={content || ""}
                onChange={setContent}
                setOptions={{
                  height: "200",
                  buttonList: [["font", "bold", "italic", "strike", "list"]],
                }}
              />
            </div>
            <div className="mb-4">
              <Input
                id="footer"
                name="footer"
                defaultValue={template?.footer || ""}
                placeholder="Footer message, default: support by *migunesia*"
              />
              <p className="text-xs text-gray-500 mt-1">
                *Footer message is doesn&apos;t work while Button Whatsapp is
                unchecked
              </p>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <Checkbox
                  id="button"
                  name="button"
                  checked={buttonWhatsapp}
                  onCheckedChange={(checked) =>
                    setButtonWhatsapp(Boolean(checked))
                  }
                />
                <Label htmlFor="button" className="ml-2">
                  Button Whatsapp (Optional)
                </Label>
              </div>
              {buttonWhatsapp && (
                <div className="pl-6 mt-2">
                  <Label className="text-gray-500">~ Link</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <Input placeholder="Display Text" />
                    <Input placeholder="Link Web Inv (Personal)" />
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <Label>Image / Attachment (Optional)</Label>
              <RadioGroup
                value={imageAttachment || ""}
                onValueChange={setImageAttachment}
                className="grid grid-cols-3 gap-x-4 gap-y-2 mt-2"
              >
                {[
                  "QR Code",
                  "Photo Selfie (vselfie only)",
                  "Photo Selfie + Frame (vselfie only)",
                  "No Image",
                  "QR Code Card",
                  "Customize",
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem
                      key={option}
                      value={option.toLowerCase().replace(/ /g, "-")}
                      id={option.toLowerCase().replace(/ /g, "-")}
                    />
                    <Label htmlFor={option.toLowerCase().replace(/ /g, "-")}>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {imageAttachment === "customize" && (
                <div className="mt-4">
                  <Label className="text-gray-600">
                    Upload your custom image here
                  </Label>
                  <Input
                    type="file"
                    name="image"
                    className="mt-1"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              )}
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            <div className="bg-white p-4 rounded-lg shadow w-auto">
              <h3 className="font-bold mb-2 text-sm text-center text-gray-500">
                Action
              </h3>
              <div className="flex justify-center gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => router.push("/admin/broadcast")}
                >
                  Back
                </Button>
                <Button type="submit" form="broadcast-form">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
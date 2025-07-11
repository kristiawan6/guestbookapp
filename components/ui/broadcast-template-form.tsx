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
  "name",
  "email",
  "phoneNumber",
  "guestCategoryId",
  "status",
];

export default function BroadcastTemplateForm({ template }: { template?: any }) {
  const { selectedEventId } = useStatistics();
  const [activeTab, setActiveTab] = useState(template?.type || "whatsapp");
  const [content, setContent] = useState(
    template?.content ||
      `Yth Bapak/Ibu
*##_GUEST_NAME_##*
*##_GUEST_ADDRESS_##*

Kami dari Titik Titik Event Organizer sebagai perwakilan dari PT. Bank Terbesar Indonesia, Tbk. Mengirimkan QR code undangan sebagai peserta

BANK TRADING TRENDS 2023
Hari/Tanggal: Hari / 01 Januari 2023
Waktu: 11.30 s/d 16.00 WIB
Tempat: Ballroom I, Ritz Carlton Hotel Pacific Place, Jakarta

=================

Tunjukkan QR code berikut pada saat registrasi ulang

=================
CATATAN:
• Mohon perlihatkan QR Code terlampir kepada panitia untuk memasuki venue acara di hari H.
• 1 QR Code hanya berlaku untuk satu orang.
• Undangan diharapkan tetap menggunakan masker dan mematuhi protokol kesehatan selama acara berlangsung.

=================

Kami nantikan kehadiran Bapak/Ibu dalam acara BANK Trading Trends 2023 Atas perhatian dan kerjasamanya kami ucapkan terima kasih.

Hormat kami,
Titik Titik EO`
  );
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedEventId) {
      console.error("Event ID is not available.");
      return;
    }
    const formData = new FormData(event.currentTarget);
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
      body: JSON.stringify({ ...data, type: activeTab, content }),
    });

    router.push("/admin/broadcast");
  };

  const handleVariableClick = (variable: string) => {
    setContent(content + `##_${variable.toUpperCase()}_##`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">
          {template ? "Edit" : "Add"} Template for{" "}
          {activeTab === "whatsapp" ? "Whatsapp" : "Email"}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="font-bold mb-4">
            Variable you can use for this template
          </h3>
          <ul>
            {GUEST_FIELDS.map((field) => (
              <li
                key={field}
                className="cursor-pointer"
                onClick={() => handleVariableClick(field)}
              >
                + {field}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Template Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={template?.name}
                  className="col-span-3"
                />
              </div>
              <div className="col-span-4">
                <Label htmlFor="content">Content</Label>
                <SunEditor
                  setContents={content}
                  onChange={setContent}
                  setOptions={{
                    height: "400",
                    buttonList: [
                      ["undo", "redo"],
                      ["bold", "italic", "underline", "strike"],
                      ["removeFormat"],
                      ["outdent", "indent"],
                      ["fullScreen", "showBlocks", "codeView"],
                    ],
                  }}
                />
              </div>
              {activeTab === "whatsapp" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="footer" className="text-right">
                      Footer
                    </Label>
                    <Input
                      id="footer"
                      name="footer"
                      defaultValue={template?.footer}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Button Whatsapp</Label>
                    <div className="col-span-3">
                      <Checkbox
                        id="button"
                        name="button"
                        defaultChecked={template?.button}
                      />
                      <Label htmlFor="button" className="ml-2">
                        Link
                      </Label>
                    </div>
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Image / Attachment</Label>
                <div className="col-span-3">
                  <RadioGroup
                    defaultValue={template?.imageAttachment || "no-image"}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="qr-code" id="qr-code" />
                      <Label htmlFor="qr-code">QR Code</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="photo-selfie"
                        id="photo-selfie"
                      />
                      <Label htmlFor="photo-selfie">
                        Photo Selfie (vselfie only)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="photo-selfie-frame"
                        id="photo-selfie-frame"
                      />
                      <Label htmlFor="photo-selfie-frame">
                        Photo Selfie + Frame (vselfie only)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-image" id="no-image" />
                      <Label htmlFor="no-image">No Image</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="qr-code-card"
                        id="qr-code-card"
                      />
                      <Label htmlFor="qr-code-card">QR Code Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customize" id="customize" />
                      <Label htmlFor="customize">Customize</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/broadcast")}
              >
                Back
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
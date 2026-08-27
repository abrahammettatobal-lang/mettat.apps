"use client";

import { TemplateGallery } from "@/components/templates/template-gallery";
import { WhatsAppInquiry } from "@/components/contact/whatsapp-inquiry";
import { styleSuggestionNote, type TemplateKind } from "@/data/templates";

export function DemoShowcase({
  defaultKind = "all",
}: {
  compact?: boolean;
  defaultKind?: TemplateKind | "all";
}) {
  return (
    <div className="grid gap-10">
      <p className="text-muted-foreground max-w-2xl text-sm">{styleSuggestionNote}</p>
      <TemplateGallery defaultKind={defaultKind} />
      <WhatsAppInquiry />
    </div>
  );
}

"use client";

import { StylePreviewFrame } from "@/components/templates/style-preview-frame";
import type { SiteTemplate } from "@/data/templates";

export function TemplatePreview({ template }: { template: SiteTemplate }) {
  return <StylePreviewFrame template={template} />;
}

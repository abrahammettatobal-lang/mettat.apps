import { site } from "@/data/site";
import type { SiteTemplate } from "@/data/templates";

export function whatsappUrl(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function inquiryMessage(want: string, template?: SiteTemplate | null) {
  const detail = want.trim();
  if (/^Hola,\s*quiero una/i.test(detail)) {
    return detail;
  }

  const kind = template?.kind === "app" ? "app" : template ? "página" : "página o app";
  const lines = [`Hola, quiero una ${kind}.`];
  if (template) {
    lines.push(`Vi la sugerencia de estilo «${template.styleName}». Si quiero otro, te lo digo.`);
  }
  if (detail) {
    lines.push("", "Lo que quiero:", detail);
  }
  return lines.join("\n");
}

/** Abre WhatsApp una sola vez. No usar window.open + location.href: duplica el texto. */
export function openWhatsApp(text: string) {
  const url = whatsappUrl(text);
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();
}

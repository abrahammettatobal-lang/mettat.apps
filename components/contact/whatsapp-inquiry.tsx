"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inquiryMessage, openWhatsApp } from "@/lib/whatsapp";
import { site } from "@/data/site";
import type { SiteTemplate } from "@/data/templates";
import { MessageCircle } from "lucide-react";

export function WhatsAppInquiry({
  template = null,
  onClearTemplate,
}: {
  template?: SiteTemplate | null;
  onClearTemplate?: () => void;
}) {
  const [want, setWant] = useState("");

  return (
    <form
      id="whatsapp"
      className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        const detail = want.trim();
        if (!detail) return;
        openWhatsApp(inquiryMessage(detail, template));
      }}
    >
      <h2 className="font-display text-xl font-semibold">Escríbeme por WhatsApp</h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Las páginas de arriba son sugerencias de estilo. Puedes pedir el tuyo. Cuéntame qué quieres que sea la
        página o la app. Chat: {site.whatsappDisplay}.
      </p>
      {template ? (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="size-2 rounded-full" style={{ background: template.accent }} />
          <span>
            Sugerencia: <span className="font-medium">{template.styleName}</span>
          </span>
          {onClearTemplate ? (
            <button
              type="button"
              className="text-muted-foreground underline-offset-4 hover:underline"
              onClick={onClearTemplate}
            >
              Quitar
            </button>
          ) : null}
        </p>
      ) : (
        <p className="text-muted-foreground mt-3 text-sm">
          No hace falta elegir una demo. Si quieres otro estilo, descríbelo aquí.
        </p>
      )}
      <div className="mt-4 grid gap-1.5">
        <Label htmlFor="want">¿Qué quieres que sea?</Label>
        <Textarea
          id="want"
          name="want"
          rows={5}
          required
          value={want}
          onChange={(event) => setWant(event.target.value)}
          placeholder="Ej. Una página para mi clínica en Puebla, con citas y WhatsApp. O una app para anotar pedidos del taller."
        />
      </div>
      <Button type="submit" className="mt-4" disabled={!want.trim()}>
        <MessageCircle className="size-4" aria-hidden="true" />
        Enviar por WhatsApp
      </Button>
    </form>
  );
}

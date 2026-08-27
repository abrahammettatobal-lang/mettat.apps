"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProjectBriefField } from "@/components/quote-builder/project-brief-field";
import { useQuote } from "@/components/providers/quote-provider";
import { site } from "@/data/site";
import { buildQuoteMessage } from "@/lib/quote-message";

export function ContactForm() {
  const { state, result, quoteId } = useQuote();
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const whatsapp = String(data.get("whatsapp") ?? "");
    const description = String(data.get("description") ?? state.brief);
    const budget = String(data.get("budget") ?? "");
    const desiredDate = String(data.get("desiredDate") ?? "");
    const quote = buildQuoteMessage(state, result, quoteId);
    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      whatsapp ? `WhatsApp: ${whatsapp}` : "",
      budget ? `Presupuesto: ${budget}` : "",
      desiredDate ? `Fecha deseada: ${desiredDate}` : "",
      "",
      description,
      "",
      quote,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Proyecto ${quoteId}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  const quote = buildQuoteMessage(state, result, quoteId);
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent([state.brief, "", quote].filter(Boolean).join("\n"))}`;

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
        <Input id="whatsapp" name="whatsapp" autoComplete="tel" />
      </div>
      <ProjectBriefField required />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="budget">Presupuesto aproximado</Label>
          <Input id="budget" name="budget" placeholder="$1,700 – $6,000 MXN" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="desiredDate">Fecha deseada</Label>
          <Input id="desiredDate" name="desiredDate" type="date" />
        </div>
      </div>
      <fieldset className="rounded-xl border p-4">
        <legend className="px-1 text-sm font-medium">Pedido incluido</legend>
        <pre className="text-muted-foreground max-h-48 overflow-auto text-xs whitespace-pre-wrap">{quote}</pre>
      </fieldset>
      {sent ? (
        <p role="status" className="text-sm text-primary">
          Se abrió tu cliente de correo con el proyecto listo para enviar.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Enviar proyecto</Button>
        <Button type="button" variant="outline" asChild>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            Contactar por WhatsApp
          </a>
        </Button>
      </div>
    </form>
  );
}

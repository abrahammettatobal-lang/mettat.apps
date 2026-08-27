"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuote } from "@/components/providers/quote-provider";

export function ProjectBriefField({
  id = "project-brief",
  rows = 5,
  required = false,
}: {
  id?: string;
  rows?: number;
  required?: boolean;
}) {
  const { state, setBrief } = useQuote();

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>¿Qué quieres?</Label>
      <Textarea
        id={id}
        name="description"
        rows={rows}
        required={required}
        value={state.brief}
        onChange={(event) => setBrief(event.target.value)}
        placeholder="Ej. Soy una clínica en Puebla. Necesito citas, WhatsApp y un color verde. Ya tengo logo y fotos del consultorio."
      />
      <p className="text-muted-foreground text-xs">
        Las demos son solo el estilo de UI. Aquí escribes páginas, funciones, textos o lo que se te ocurra.
      </p>
    </div>
  );
}

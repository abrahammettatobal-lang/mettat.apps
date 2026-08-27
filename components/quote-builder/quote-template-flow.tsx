"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplatePreview } from "@/components/templates/template-preview";
import { PriceCompare } from "@/components/catalog/price-compare";
import { ProjectBriefField } from "@/components/quote-builder/project-brief-field";
import { useQuote } from "@/components/providers/quote-provider";
import { getTemplate } from "@/data/templates";

export function QuoteTemplateFlow() {
  const { state, reset } = useQuote();
  const template = getTemplate(state.templateId);

  if (!template) {
    return (
      <section aria-labelledby="pick-template">
        <h2 id="pick-template" className="font-display mb-2 text-2xl font-semibold">
          Elige un estilo de UI
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl text-sm">
          Las demos son visuales. Abajo escribes qué necesitas de verdad.
        </p>
        <div className="mb-8 max-w-xl">
          <ProjectBriefField />
        </div>
        <TemplateGallery />
      </section>
    );
  }

  return (
    <section className="grid gap-6" aria-labelledby="chosen-template">
      <div>
        <p className="text-sm font-medium" style={{ color: template.accent }}>
          Demo de UI · {template.styleName}
        </p>
        <h2 id="chosen-template" className="font-display mt-1 text-2xl font-semibold">
          {template.name}
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">{template.description}</p>
        <div className="mt-4 h-56 overflow-hidden rounded-2xl border">
          <TemplatePreview template={template} />
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          Secciones de ejemplo: {template.pages.join(" · ")}
        </p>
        <div className="mt-6 max-w-xl">
          <ProjectBriefField />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contacto">Enviar pedido</Link>
          </Button>
          <Button type="button" variant="outline" onClick={reset}>
            Elegir otro estilo
          </Button>
        </div>
      </div>
      <aside className="h-fit rounded-2xl border bg-card p-4 lg:hidden">
        <PriceCompare price={template.price} layout="stack" />
        <p className="text-muted-foreground mt-1 text-xs">Entrega {template.deliveryLabel}</p>
      </aside>
    </section>
  );
}

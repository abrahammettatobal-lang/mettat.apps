"use client";

import Link from "next/link";
import { templates, stylePath } from "@/data/templates";
import { StylePreviewFrame } from "@/components/templates/style-preview-frame";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function HeroTemplates() {
  const featured = templates.filter((item) => item.highlight);
  const extra = templates.find((item) => item.id === "tpl-landing");
  const cards = extra ? [extra, ...featured] : featured;

  return (
    <div className="rounded-3xl border bg-card/90 p-5 shadow-lg">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
        Sugerencias de estilo
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.slice(0, 2).map((template) => (
          <Link
            key={template.id}
            href={stylePath(template)}
            className="group overflow-hidden rounded-2xl border text-left transition hover:border-primary/30 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={`Abrir ${template.brand}`}
          >
            <div className="relative h-44 overflow-hidden">
              <StylePreviewFrame template={template} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pt-8 pb-2">
                <p className="flex items-center gap-1 text-[11px] font-medium text-white">
                  <span className="size-2 rounded-full" style={{ background: template.accent }} />
                  {template.styleName}
                  <ArrowUpRight className="ml-auto size-3 opacity-80" aria-hidden="true" />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Button asChild className="mt-4 w-full" variant="outline">
        <Link href="/plantillas">Ver las 10 sugerencias</Link>
      </Button>
    </div>
  );
}

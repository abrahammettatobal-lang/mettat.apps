"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TemplatePreview } from "@/components/templates/template-preview";
import { stylePath } from "@/data/templates";
import type { SiteTemplate } from "@/data/templates";

export function TemplateCard({ template }: { template: SiteTemplate }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:border-primary/30 hover:shadow-md">
      <Link
        href={stylePath(template)}
        className="relative block h-72 overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label={`Abrir ${template.brand}`}
      >
        <div className="h-full transition duration-500 group-hover:scale-[1.02]">
          <TemplatePreview template={template} />
        </div>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2.5">
          <span className="rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-medium shadow-sm backdrop-blur-sm">
            Sugerencia
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-medium shadow-sm backdrop-blur-sm">
            <span className="size-2 rounded-full" style={{ background: template.accent }} />
            {template.styleName}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 pt-10 pb-3">
          <p className="font-display text-sm font-medium text-white">{template.brand}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/80">
            Abrir sitio
            <ArrowUpRight className="size-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </p>
        </div>
      </Link>
    </article>
  );
}

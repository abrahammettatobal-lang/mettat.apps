"use client";

import { stylePath, type SiteTemplate } from "@/data/templates";

/** Miniatura del sitio real: escala una ruta /ui/[slug] dentro de un marco tipo navegador. */
export function StylePreviewFrame({ template }: { template: SiteTemplate }) {
  const host = template.brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 14);

  return (
    <div className="pointer-events-none flex h-full flex-col bg-neutral-200" aria-hidden="true">
      <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-black/5 bg-neutral-100 px-2.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-1 min-w-0 flex-1 truncate rounded-md bg-white px-2 text-[9px] leading-4 text-neutral-500">
          {host || "sitio"}.mx
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-neutral-100">
        <iframe
          src={`${stylePath(template)}?embed=1`}
          title={`Vista previa de ${template.brand}`}
          loading="lazy"
          tabIndex={-1}
          className="absolute top-0 left-0 h-[720px] w-[1280px] origin-top-left scale-[0.28] border-0 sm:scale-[0.32]"
        />
      </div>
    </div>
  );
}

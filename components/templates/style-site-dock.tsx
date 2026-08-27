"use client";

import Link from "next/link";
import { inquiryMessage, openWhatsApp } from "@/lib/whatsapp";
import type { SiteTemplate } from "@/data/templates";

export function StyleSiteDock({ template }: { template: SiteTemplate }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-4">
      <nav
        aria-label="Sugerencia de estilo"
        className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1.5 text-xs text-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-md"
      >
        <span
          className="hidden max-w-44 truncate px-3 py-1.5 font-medium sm:inline"
          style={{ color: template.accent }}
        >
          {template.styleName}
        </span>
        <button
          type="button"
          onClick={() =>
            openWhatsApp(
              inquiryMessage(
                "Me gusta este estilo. Quiero una página o app a partir de él, o uno propio.",
                template,
              ),
            )
          }
          className="rounded-full px-4 py-2 font-medium text-white transition hover:brightness-110"
          style={{ background: template.accent }}
        >
          Pedir el mío
        </button>
        <Link
          href="/plantillas"
          className="rounded-full px-3 py-2 text-neutral-600 transition hover:bg-neutral-100"
        >
          Más estilos
        </Link>
      </nav>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutTemplate } from "lucide-react";
import { useQuote } from "@/components/providers/quote-provider";
import { formatMXN } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function QuoteDock() {
  const pathname = usePathname();
  const { result, hydrated, state } = useQuote();
  const count = result.lineItems.filter((line) => line.price > 0).length;
  const hidden =
    !hydrated ||
    pathname.startsWith("/cotizador") ||
    pathname.startsWith("/admin") ||
    count === 0;

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 print:hidden">
      <div className="pointer-events-auto flex max-w-lg items-center gap-3 rounded-2xl border bg-card/95 px-3 py-2 shadow-lg backdrop-blur">
        <LayoutTemplate className="size-4 text-primary" aria-hidden="true" />
        <p className="text-sm">
          <span className="font-medium tabular-nums">{formatMXN(result.subtotal)} MXN</span>
          <span className="text-muted-foreground">
            {state.templateId ? " · plantilla elegida" : ` · ${count} partidas`}
          </span>
        </p>
        <Button asChild size="sm">
          <Link href="/cotizador">Ver pedido</Link>
        </Button>
      </div>
    </div>
  );
}

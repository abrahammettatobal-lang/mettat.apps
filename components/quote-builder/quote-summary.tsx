"use client";

import Link from "next/link";
import { Copy, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { QuoteItem } from "@/components/quote-builder/quote-item";
import { DownloadQuoteButton } from "@/components/quote-builder/download-quote-button";
import { useQuote } from "@/components/providers/quote-provider";
import { ESTIMATE_DISCLAIMER } from "@/data/pricing-config";
import { TEMPLATE_DISCLAIMER } from "@/data/templates";
import { formatMXN } from "@/lib/format";
import { formatWeekRange } from "@/lib/pricing-engine";
import { cn } from "@/lib/utils";

export function QuoteSummary({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { result, quoteId, reset, shareUrl, hydrated, state, setRushDelivery } = useQuote();
  const developmentLines = result.lineItems.filter((item) => item.billingType !== "monthly");
  const isTemplate = Boolean(state.templateId);

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Enlace copiado");
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "Cotización Metta T. Apps", url: shareUrl });
      return;
    }
    await copyLink();
  }

  return (
    <aside className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold">{isTemplate ? "Tu plantilla" : "Tu proyecto"}</h2>
          <p className="text-muted-foreground font-mono text-xs">{hydrated ? quoteId : "…"}</p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Reiniciar
        </Button>
      </div>
      {developmentLines.length === 0 ? (
        <p className="text-muted-foreground text-sm">Aún no hay plantilla. Elige una a la izquierda.</p>
      ) : (
        <ul className={cn("divide-y", compact && "max-h-64 overflow-y-auto")}>
          {developmentLines.map((item) => (
            <QuoteItem key={item.id} item={item} />
          ))}
        </ul>
      )}
      <Separator className="my-4" />
      <p className="text-muted-foreground text-sm">{isTemplate ? "Precio cerrado" : "Desarrollo estimado"}</p>
      <p className="font-display text-3xl font-semibold tabular-nums tracking-tight">
        {formatMXN(result.subtotal)} <span className="text-base font-medium">MXN</span>
      </p>
      {result.savings > 0 ? (
        <p className="mt-1 text-sm text-primary">
          Individual {formatMXN(result.listTotal)} · Paquete {formatMXN(result.subtotal)} · Ahorras{" "}
          {formatMXN(result.savings)} MXN
        </p>
      ) : null}
      <p className="text-muted-foreground mt-2 text-sm">Tiempo estimado {formatWeekRange(result)}</p>
      {result.monthlyItems.length ? (
        <div className="mt-4">
          <p className="text-muted-foreground text-sm">Mantenimiento (mensual)</p>
          <ul className="mt-1 divide-y">
            {result.monthlyItems.map((item) => (
              <QuoteItem key={item.id} item={item} />
            ))}
          </ul>
          <p className="mt-2 text-sm tabular-nums">{formatMXN(result.monthlyTotal)} MXN / mes</p>
        </div>
      ) : null}
      {result.externalNotes.length ? (
        <div className="mt-4">
          <p className="text-muted-foreground text-sm">Servicios externos</p>
          <ul className="text-muted-foreground mt-1 space-y-1 text-xs">
            {result.externalNotes.map((note) => (
              <li key={note.id}>
                {note.name}: {note.summary}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {isTemplate && state.brief.trim() ? (
        <p className="text-muted-foreground mt-3 line-clamp-4 text-xs whitespace-pre-wrap">{state.brief}</p>
      ) : null}
      {isTemplate ? null : (
        <label className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span>Entrega urgente (recargo)</span>
          <Switch
            checked={state.rushDelivery}
            onCheckedChange={setRushDelivery}
            aria-label="Activar entrega urgente"
          />
        </label>
      )}
      <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
        {isTemplate ? TEMPLATE_DISCLAIMER : ESTIMATE_DISCLAIMER}
      </p>
      <div className="mt-4 grid gap-2">
        <Button asChild>
            <Link href="/contacto">{isTemplate ? "Enviar pedido" : "Solicitar cotización"}</Link>
        </Button>
        <DownloadQuoteButton />
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" onClick={copyLink}>
            <Copy className="size-4" aria-hidden="true" />
            Copiar URL
          </Button>
          <Button type="button" variant="outline" onClick={share}>
            <Share2 className="size-4" aria-hidden="true" />
            Compartir
          </Button>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { QuoteHydrator } from "@/components/quote-builder/quote-hydrator";
import { QuoteSummary } from "@/components/quote-builder/quote-summary";
import { QuoteWizard } from "@/components/quote-builder/quote-wizard";
import { QuoteTemplateFlow } from "@/components/quote-builder/quote-template-flow";
import { useQuote } from "@/components/providers/quote-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatMXN } from "@/lib/format";

export function QuoteWorkspace() {
  return (
    <Suspense fallback={<p className="text-muted-foreground text-sm">Cargando cotización…</p>}>
      <QuoteWorkspaceInner />
    </Suspense>
  );
}

function QuoteWorkspaceInner() {
  const { result, state, reset } = useQuote();
  const searchParams = useSearchParams();
  const router = useRouter();
  const custom = searchParams.get("custom") === "1" && !state.templateId;

  return (
    <>
      <QuoteHydrator />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        {custom ? <QuoteWizard /> : <QuoteTemplateFlow />}
        <div className="hidden lg:sticky lg:top-24 lg:block">
          <QuoteSummary />
        </div>
      </div>
      {!custom ? (
        <p className="text-muted-foreground mt-10 text-center text-sm">
          ¿Nada de esto te sirve?{" "}
          <button
            type="button"
            className="text-foreground underline-offset-4 hover:underline"
            onClick={() => {
              reset();
              router.push("/cotizador?custom=1");
            }}
          >
            Cotizar a medida
          </button>
          <span> — sale más caro y tarda más.</span>
        </p>
      ) : (
        <p className="text-muted-foreground mt-10 text-center text-sm">
          <Link href="/plantillas" className="text-foreground underline-offset-4 hover:underline">
            Volver a las plantillas
          </Link>
        </p>
      )}
      <div className="h-20 lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 p-3 backdrop-blur lg:hidden print:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" className="w-full justify-between" variant="default">
              <span>
                {formatMXN(result.subtotal)} MXN
                {result.savings > 0 ? (
                  <span className="ml-2 font-normal opacity-80">Ahorro paquete {formatMXN(result.savings)}</span>
                ) : null}
              </span>
              <ChevronUp className="size-4" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="sr-only">Resumen de cotización</SheetTitle>
            </SheetHeader>
            <QuoteSummary className="border-0 shadow-none" compact />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

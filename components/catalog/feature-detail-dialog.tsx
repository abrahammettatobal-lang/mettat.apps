"use client";

import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PriceCompare } from "@/components/catalog/price-compare";
import { useQuote } from "@/components/providers/quote-provider";
import { getItemPricing } from "@/data/pricing";
import { calculateServicePrice } from "@/lib/service-price";
import { collectSelectedIds } from "@/lib/pricing-engine";
import { getExternalCost } from "@/data/external-costs";
import type { CatalogItem } from "@/types/catalog";

export function FeatureDetailDialog({
  item,
  open,
  onOpenChange,
}: {
  item: CatalogItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { isSelected, toggleItem, state } = useQuote();
  if (!item) return null;
  const selectedIds = collectSelectedIds(state);
  const priced = getItemPricing(item.id, selectedIds);
  const calculated = calculateServicePrice(item.id, { selectedIds });
  const selected = isSelected(item.id);
  const monthly = calculated.billingType === "monthly";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 text-sm">
          <section>
            <h3 className="mb-2 font-medium">Incluye</h3>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5">
              {item.includes.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </section>
          {calculated.assumptions.length ? (
            <section>
              <h3 className="mb-2 font-medium">Supuestos de esta cotización</h3>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                {calculated.assumptions.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {item.optional?.length ? (
            <section>
              <h3 className="mb-2 font-medium">Opcional</h3>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                {item.optional.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {calculated.externalCostIds.length ? (
            <section>
              <h3 className="mb-2 font-medium">Servicios externos (los paga el cliente)</h3>
              <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                {calculated.externalCostIds.map((id) => {
                  const cost = getExternalCost(id);
                  return (
                    <li key={id}>
                      {cost ? `${cost.name}: ${cost.summary}` : id}
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
          {item.compatibility?.length ? (
            <p className="text-muted-foreground">
              Compatibilidad: {item.compatibility.join(", ")}
            </p>
          ) : null}
          <div>
            <PriceCompare
              price={priced.price}
              fromPrice={priced.fromPrice}
              suffix={monthly ? "/mes" : undefined}
              layout="stack"
            />
          </div>
          <Button type="button" onClick={() => toggleItem(item)} aria-pressed={selected}>
            {selected ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
            {selected ? "Quitar del proyecto" : "Agregar al proyecto"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

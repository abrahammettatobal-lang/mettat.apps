"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMXN } from "@/lib/format";
import { catalogById } from "@/data/catalog";
import { useQuote } from "@/components/providers/quote-provider";
import type { QuoteLineItem } from "@/types/catalog";

export function QuoteItem({ item }: { item: QuoteLineItem }) {
  const { removeItem } = useQuote();
  const catalogItem = catalogById.get(item.id);
  const removable = Boolean(catalogItem);
  const monthly = item.billingType === "monthly";

  return (
    <li className="flex items-start justify-between gap-3 py-2 text-sm">
      <div className="min-w-0">
        <p className="truncate">{item.label}</p>
        {item.fromPrice ? <p className="text-muted-foreground text-[11px]">Desde</p> : null}
      </div>
      <div className="flex items-center gap-1">
        <span className="tabular-nums whitespace-nowrap">
          {formatMXN(item.price)}
          {monthly ? " /mes" : ""}
        </span>
        {removable && catalogItem ? (
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            aria-label={`Quitar ${item.label}`}
            onClick={() => removeItem(catalogItem)}
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
          </Button>
        ) : null}
      </div>
    </li>
  );
}

"use client";

import { useState } from "react";
import { features } from "@/data/features";
import { projectTypes } from "@/data/project-types";
import { pricing, getItemPricing } from "@/data/pricing";
import { Button } from "@/components/ui/button";
import { formatMXN } from "@/lib/format";
import { calculateQuote } from "@/lib/pricing-engine";
import { cn } from "@/lib/utils";
import type { ProjectTypeId, QuoteState } from "@/types/catalog";
import Link from "next/link";

const demoFeatures = ["auth-login", "db-postgres", "ai-gemini"];

export function HeroConfigurator() {
  const [typeId, setTypeId] = useState<ProjectTypeId>("webapp");
  const [ids, setIds] = useState<string[]>(["auth-login"]);

  const state: QuoteState = {
    projectTypeId: typeId,
    designLevel: "custom",
    featureIds: ids,
    integrationIds: [],
    extraIds: [],
    uiItemIds: [],
    rushDelivery: false,
    templateId: null,
    brief: "",
  };
  const result = calculateQuote(state);

  return (
    <div className="rounded-3xl border bg-card/90 p-5 shadow-lg">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">Configurador en vivo</p>
      <div className="flex flex-wrap gap-2">
        {projectTypes.slice(0, 5).map((type) => (
          <button
            type="button"
            key={type.id}
            onClick={() => setTypeId(type.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              typeId === type.id && "border-primary bg-accent text-accent-foreground",
            )}
            aria-pressed={typeId === type.id}
          >
            {type.name}
          </button>
        ))}
      </div>
      <ul className="mt-4 grid gap-2">
        {demoFeatures.map((id) => {
          const item = features.find((entry) => entry.id === id);
          if (!item) return null;
          const on = ids.includes(id);
          const price = getItemPricing(id, ids);
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => setIds((list) => (on ? list.filter((x) => x !== id) : [...list, id]))}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm",
                  on && "border-primary bg-accent/60",
                )}
                aria-pressed={on}
              >
                <span>{item.name}</span>
                <span className="tabular-nums text-copper">
                  {on ? `+ ${formatMXN(price.price)}` : formatMXN(price.price)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-xs">Estimación</p>
          <p className="font-display text-2xl font-semibold tabular-nums">{formatMXN(result.subtotal)} MXN</p>
          <p className="text-muted-foreground text-xs">
            Incluye diseño personalizado ({formatMXN(pricing.design.custom.price)})
          </p>
        </div>
        <Button asChild size="sm">
          <Link href={`/cotizador?project=${typeId}&design=custom&features=${ids.join(",")}`}>
            Abrir cotizador
          </Link>
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { extras } from "@/data/extras";
import { features } from "@/data/features";
import { integrations } from "@/data/integrations";
import { designOptions, projectTypes } from "@/data/project-types";
import { uiItems } from "@/data/ui-items";
import { featureCategoryLabels } from "@/data/labels";
import { pricing } from "@/data/pricing";
import { CatalogCard } from "@/components/catalog/catalog-card";
import { SearchInput } from "@/components/catalog/search-input";
import { FeatureDetailDialog } from "@/components/catalog/feature-detail-dialog";
import { useQuote } from "@/components/providers/quote-provider";
import { Button } from "@/components/ui/button";
import { formatMXN } from "@/lib/format";
import { CatalogIcon } from "@/components/catalog/catalog-icon";
import { PriceCompare } from "@/components/catalog/price-compare";
import { cn } from "@/lib/utils";
import type { CatalogItem } from "@/types/catalog";

const steps = [
  "Tipo",
  "Diseño",
  "Funcionalidades",
  "Integraciones",
  "Extras",
  "Resumen",
] as const;

export function QuoteWizard() {
  const { state, setProjectType, setDesignLevel } = useQuote();
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<CatalogItem | null>(null);

  const filteredFeatures = useMemo(
    () =>
      features.filter((item) =>
        `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div>
      <ol className="mb-8 flex flex-wrap gap-2" aria-label="Pasos del cotizador">
        {steps.map((label, index) => (
          <li key={label}>
            <Button
              type="button"
              size="sm"
              variant={step === index ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setStep(index)}
              aria-current={step === index ? "step" : undefined}
            >
              {index + 1}. {label}
            </Button>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <section aria-labelledby="step-type">
          <h2 id="step-type" className="font-display mb-4 text-2xl font-semibold">
            ¿Qué quieres construir?
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {projectTypes.map((type) => {
              const selected = state.projectTypeId === type.id;
              const price = pricing.base[type.id];
              return (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={cn(
                    "rounded-2xl border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5",
                    selected && "border-primary ring-2 ring-primary/20",
                  )}
                  aria-pressed={selected}
                >
                  <CatalogIcon name={type.icon} className="mb-3 size-5 text-primary" />
                  <p className="font-display font-semibold">{type.name}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{type.description}</p>
                  <p className="mt-3 text-sm">
                    <PriceCompare price={price.price} fromPrice={price.fromPrice} layout="inline" />
                    <span className="text-muted-foreground"> base</span>
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section aria-labelledby="step-design">
          <h2 id="step-design" className="font-display mb-4 text-2xl font-semibold">
            Nivel de diseño
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {designOptions.map((option) => {
              const selected = state.designLevel === option.id;
              const price = pricing.design[option.id];
              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => setDesignLevel(option.id)}
                  className={cn(
                    "rounded-2xl border bg-card p-5 text-left shadow-sm",
                    selected && "border-primary ring-2 ring-primary/20",
                  )}
                  aria-pressed={selected}
                >
                  <p className="font-display text-lg font-semibold">{option.name}</p>
                  <p className="text-muted-foreground mt-2 text-sm">{option.description}</p>
                  <div className="mt-3 text-sm">
                    {price.price === 0 ? (
                      "Incluido"
                    ) : (
                      <PriceCompare price={price.price} fromPrice={price.fromPrice} layout="inline" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <FeatureGrid
          title="Lógica y funcionalidades"
          items={filteredFeatures}
          query={query}
          onQuery={setQuery}
          onOpen={setDetail}
        />
      ) : null}

      {step === 3 ? (
        <FeatureGrid title="Integraciones" items={integrations} onOpen={setDetail} />
      ) : null}

      {step === 4 ? (
        <FeatureGrid title="Extras" items={extras} onOpen={setDetail} />
      ) : null}

      {step === 5 ? <QuoteClose /> : null}

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Atrás
        </Button>
        <Button type="button" disabled={step === steps.length - 1} onClick={() => setStep((s) => s + 1)}>
          Siguiente
        </Button>
      </div>

      <FeatureDetailDialog item={detail} open={Boolean(detail)} onOpenChange={(open) => !open && setDetail(null)} />
    </div>
  );
}

function FeatureGrid({
  title,
  items,
  query,
  onQuery,
  onOpen,
}: {
  title: string;
  items: CatalogItem[];
  query?: string;
  onQuery?: (value: string) => void;
  onOpen: (item: CatalogItem) => void;
}) {
  const groups = new Map<string, CatalogItem[]>();
  for (const item of items) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }

  return (
    <section>
      <h2 className="font-display mb-4 text-2xl font-semibold">{title}</h2>
      {onQuery ? (
        <SearchInput value={query ?? ""} onChange={onQuery} className="mb-6 max-w-md" />
      ) : null}
      {[...groups.entries()].map(([category, group]) => (
        <div key={category} className="mb-8">
          <h3 className="mb-3 text-sm font-medium">{featureCategoryLabels[category] ?? category}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.map((item) => (
              <CatalogCard key={item.id} item={item} onOpen={() => onOpen(item)} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function QuoteClose() {
  const { result, state } = useQuote();
  const names = [
    ...state.uiItemIds,
    ...state.featureIds,
    ...state.integrationIds,
    ...state.extraIds,
  ]
    .map((id) => {
      const item = [...features, ...integrations, ...extras, ...uiItems].find((entry) => entry.id === id);
      return item?.name;
    })
    .filter(Boolean);

  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="font-display text-2xl font-semibold">Tu proyecto</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        {state.projectTypeId ? projectTypes.find((t) => t.id === state.projectTypeId)?.name : "Sin tipo todavía"}
      </p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
        {names.length ? names.map((name) => <li key={name}>{name}</li>) : <li>Sin módulos extra</li>}
      </ul>
      {result.savings > 0 ? (
        <p className="mt-6 text-sm text-primary">
          Individual {formatMXN(result.listTotal)} · Paquete {formatMXN(result.subtotal)}
        </p>
      ) : (
        <div className="mt-6" />
      )}
      <p className="font-display text-3xl">{formatMXN(result.subtotal)} MXN</p>
      {result.savings > 0 ? (
        <p className="mt-1 text-sm text-primary">Ahorras {formatMXN(result.savings)} MXN al tomar el paquete</p>
      ) : null}
    </section>
  );
}

"use client";

import { Check, Eye, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PriceBadge } from "@/components/catalog/price-badge";
import { useQuote } from "@/components/providers/quote-provider";
import { featureCategoryLabels } from "@/data/labels";
import { getItemPricing } from "@/data/pricing";
import { CatalogIcon } from "@/components/catalog/catalog-icon";
import { cn } from "@/lib/utils";
import type { CatalogItem } from "@/types/catalog";
import { calculateServicePrice } from "@/lib/service-price";
import { collectSelectedIds } from "@/lib/pricing-engine";

type CatalogCardProps = {
  item: CatalogItem;
  onOpen?: () => void;
  preview?: React.ReactNode;
};

export function CatalogCard({ item, onOpen, preview }: CatalogCardProps) {
  const { isSelected, toggleItem, state } = useQuote();
  const selected = isSelected(item.id);
  const selectedIds = collectSelectedIds(state);
  const priced = getItemPricing(item.id, selectedIds);
  const calculated = calculateServicePrice(item.id, { selectedIds });
  const category = featureCategoryLabels[item.category] ?? item.category;

  return (
    <motion.article
      layout
      whileHover={preview ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border bg-card/80 shadow-sm transition-shadow",
          selected && "border-primary ring-2 ring-primary/20",
        )}
      >
        {preview ? (
          <div className="relative h-72 overflow-hidden border-b bg-muted/20">
            {preview}
            <span className="pointer-events-none absolute right-2 bottom-2 z-10 rounded-full bg-background/95 px-2 py-0.5 text-[10px] font-medium shadow-sm">
              Pruébala
            </span>
          </div>
        ) : (
          <CardHeader className="flex flex-row items-start gap-3 pb-2">
            <span className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-xl">
              <CatalogIcon name={item.icon} className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display truncate text-base font-semibold">{item.name}</h3>
                {selected ? (
                  <Check className="size-4 shrink-0 text-primary" aria-label="Seleccionado" />
                ) : null}
              </div>
              <p className="text-muted-foreground text-xs">{category}</p>
            </div>
          </CardHeader>
        )}
        <CardContent className={cn("flex flex-1 flex-col gap-3", preview && "pt-4")}>
          {preview ? (
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-base font-semibold">{item.name}</h3>
                <p className="text-muted-foreground text-xs">{category}</p>
              </div>
              {selected ? <Check className="size-4 text-primary" aria-label="Seleccionado" /> : null}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
          )}
          {preview ? (
            <p className="text-muted-foreground line-clamp-2 text-sm">{item.description}</p>
          ) : null}
          <div className="mt-auto flex flex-wrap items-center gap-2">
            <PriceBadge
              price={priced.price}
              fromPrice={priced.fromPrice}
              suffix={calculated.billingType === "monthly" ? "/mes" : undefined}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[11px] font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            type="button"
            variant={selected ? "secondary" : "default"}
            className="flex-1"
            onClick={() => toggleItem(item)}
            aria-pressed={selected}
          >
            {selected ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
            {selected ? "Quitar" : "Agregar al proyecto"}
          </Button>
          {onOpen ? (
            <Button type="button" variant="outline" onClick={onOpen} aria-label={`${item.kind === "ui" ? "Ver demo" : "Ver detalle"} de ${item.name}`}>
              <Eye className="size-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only sm:inline">
                {item.kind === "ui" ? "Ver demo" : "Ver detalle"}
              </span>
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </motion.article>
  );
}

export function FeatureCard(props: CatalogCardProps) {
  return <CatalogCard {...props} />;
}

export function IntegrationCard(props: CatalogCardProps) {
  return <CatalogCard {...props} />;
}

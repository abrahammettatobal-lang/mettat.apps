"use client";

import { useMemo, useState } from "react";
import { allCatalogItems } from "@/data/catalog";
import { getItemPricing } from "@/data/pricing";
import { CatalogCard } from "@/components/catalog/catalog-card";
import {
  CatalogFilters,
  defaultFilters,
  matchesFilters,
  type CatalogFilterState,
} from "@/components/catalog/catalog-filters";
import { SearchInput } from "@/components/catalog/search-input";
import { FeatureDetailDialog } from "@/components/catalog/feature-detail-dialog";
import { UIDemoCard } from "@/components/ui-demos/ui-demo-card";
import type { CatalogItem } from "@/types/catalog";

export function CatalogExplorer({
  items = allCatalogItems,
  searchPlaceholder = "Buscar funcionalidades...",
}: {
  items?: CatalogItem[];
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<CatalogFilterState>(defaultFilters);
  const [detail, setDetail] = useState<CatalogItem | null>(null);

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((item) => {
      const priced = getItemPricing(item.id);
      const text = `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
      if (q && !text.includes(q)) return false;
      return matchesFilters(priced.price, item.domains, filters);
    });
  }, [items, query, filters]);

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} placeholder={searchPlaceholder} className="mb-4 max-w-xl" />
      <CatalogFilters value={filters} onChange={setFilters} />
      <p className="text-muted-foreground mt-6 mb-4 text-sm">{visible.length} resultados</p>
      {visible.length === 0 ? (
        <p>No hay coincidencias. Prueba otro filtro o término.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) =>
            item.kind === "ui" ? (
              <UIDemoCard key={item.id} item={item} />
            ) : (
              <CatalogCard key={item.id} item={item} onOpen={() => setDetail(item)} />
            ),
          )}
        </div>
      )}
      <FeatureDetailDialog item={detail} open={Boolean(detail)} onOpenChange={(open) => !open && setDetail(null)} />
    </div>
  );
}

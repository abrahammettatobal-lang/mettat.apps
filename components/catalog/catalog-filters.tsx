"use client";

import { domainFilters } from "@/data/labels";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterDomain } from "@/types/catalog";
import { cn } from "@/lib/utils";

export type CatalogFilterState = {
  domain: FilterDomain | "all";
  price: "all" | "lt4" | "4to10" | "gt10";
};

export const defaultFilters: CatalogFilterState = {
  domain: "all",
  price: "all",
};

export function CatalogFilters({
  value,
  onChange,
}: {
  value: CatalogFilterState;
  onChange: (next: CatalogFilterState) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Categoría">
        {domainFilters.map((filter) => (
          <Button
            key={filter.id}
            type="button"
            size="sm"
            variant={value.domain === filter.id ? "default" : "outline"}
            className={cn("rounded-full", value.domain === filter.id && "shadow-sm")}
            onClick={() => onChange({ ...value, domain: filter.id })}
            aria-pressed={value.domain === filter.id}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="max-w-xs">
        <div className="grid gap-1.5">
          <Label htmlFor="filter-price">Precio</Label>
          <Select
            value={value.price}
            onValueChange={(price) => onChange({ ...value, price: price as CatalogFilterState["price"] })}
          >
            <SelectTrigger id="filter-price" className="w-full rounded-xl bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquiera</SelectItem>
              <SelectItem value="lt4">Hasta $4,000</SelectItem>
              <SelectItem value="4to10">$4,000 – $10,000</SelectItem>
              <SelectItem value="gt10">Más de $10,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export function matchesFilters(price: number, domains: FilterDomain[], filters: CatalogFilterState) {
  if (filters.domain !== "all" && !domains.includes(filters.domain)) return false;
  if (filters.price === "lt4" && price >= 4000) return false;
  if (filters.price === "4to10" && (price < 4000 || price > 10000)) return false;
  if (filters.price === "gt10" && price <= 10000) return false;
  return true;
}

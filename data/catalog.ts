import { extras } from "@/data/extras";
import { features } from "@/data/features";
import { integrations } from "@/data/integrations";
import { packages } from "@/data/packages";
import { getItemPricing } from "@/lib/service-price";
import { projectTypes } from "@/data/project-types";
import { uiItems } from "@/data/ui-items";
import type {
  CatalogItem,
  CatalogKind,
  FilterDomain,
  PriceEntry,
  QuoteState,
  ServicePackage,
} from "@/types/catalog";

export const allCatalogItems: CatalogItem[] = [
  ...uiItems,
  ...features,
  ...integrations,
  ...extras,
];

export const catalogById = new Map(allCatalogItems.map((item) => [item.id, item]));

export function getCatalogItem(id: string): CatalogItem | undefined {
  return catalogById.get(id);
}

export function withPricing(item: CatalogItem): CatalogItem & PriceEntry {
  return { ...item, ...getItemPricing(item.id) };
}

export function itemsByKind(kind: CatalogKind) {
  return allCatalogItems.filter((item) => item.kind === kind).map(withPricing);
}

export const defaultQuoteState: QuoteState = {
  projectTypeId: null,
  designLevel: "basic",
  featureIds: [],
  integrationIds: [],
  extraIds: [],
  uiItemIds: [],
  rushDelivery: false,
  templateId: null,
  brief: "",
};

export function packageToQuote(pkg: ServicePackage): QuoteState {
  return {
    projectTypeId: pkg.projectTypeId,
    designLevel: pkg.designLevel,
    featureIds: [...pkg.featureIds],
    integrationIds: [...pkg.integrationIds],
    extraIds: [...pkg.extraIds],
    uiItemIds: [...pkg.uiItemIds],
    rushDelivery: false,
    templateId: null,
    brief: "",
  };
}

export function matchesDomain(item: CatalogItem, domain: FilterDomain | "all") {
  if (domain === "all") return true;
  return item.domains.includes(domain);
}

export function getProjectType(id: string) {
  return projectTypes.find((type) => type.id === id);
}

export function getPackage(id: string) {
  return packages.find((pkg) => pkg.id === id);
}

export function emptyPrice(): PriceEntry {
  return { listPrice: 0, price: 0, rawPrice: 0, estimatedHours: 0 };
}

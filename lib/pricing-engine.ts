import { extras } from "@/data/extras";
import { features } from "@/data/features";
import { integrations } from "@/data/integrations";
import { pricingConfig } from "@/data/pricing-config";
import { uiItems } from "@/data/ui-items";
import { catalogById, getPackage } from "@/data/catalog";
import { getTemplate } from "@/data/templates";
import { getServiceWork } from "@/data/service-work";
import { externalCostsById } from "@/data/external-costs";
import {
  calculateServicePrice,
  getBasePricing,
  getDesignPricing,
  getItemPricing,
  roundCommercialPrice,
  toPriceEntry,
} from "@/lib/service-price";
import type {
  PriceEntry,
  QuoteLineItem,
  QuoteResult,
  QuoteState,
  ServicePackage,
} from "@/types/catalog";
import type { QuoteExternalNote } from "@/types/pricing";

export {
  calculateServicePrice,
  getItemPricing,
  isPricingStale,
  roundCommercialPrice,
} from "@/lib/service-price";

export const HOURS_PER_DAY = pricingConfig.hoursPerDay;
export const DAYS_PER_WEEK = pricingConfig.daysPerWeek;
export const WEEK_BUFFER = pricingConfig.weekBuffer;

function pushItem(
  lines: QuoteLineItem[],
  id: string,
  group: QuoteLineItem["group"],
  skip: Set<string>,
  selectedIds: string[],
) {
  if (skip.has(id)) return;
  const item = catalogById.get(id);
  const calculated = calculateServicePrice(id, { selectedIds });
  if (!item && calculated.finalPrice === 0 && calculated.estimatedHours === 0) return;
  lines.push({
    id,
    label: item?.name ?? id,
    group,
    price: calculated.finalPrice,
    listPrice: calculated.finalPrice,
    estimatedHours: calculated.estimatedHours,
    billingType: calculated.billingType,
    fromPrice: calculated.fromPrice,
  });
  for (const bundled of item?.bundledIds ?? []) {
    skip.add(bundled);
  }
}

export function collectSelectedIds(state: QuoteState): string[] {
  return [
    ...state.uiItemIds,
    ...state.featureIds,
    ...state.integrationIds,
    ...state.extraIds,
  ];
}

function quoteFromTemplate(template: NonNullable<ReturnType<typeof getTemplate>>): QuoteResult {
  const hours = template.estimatedHours;
  const days = Math.max(1, Math.ceil(hours / HOURS_PER_DAY));
  return {
    lineItems: [
      {
        id: template.id,
        label: `Plantilla · ${template.name}`,
        group: "base",
        price: template.price,
        listPrice: template.price,
        estimatedHours: hours,
        billingType: "once",
      },
    ],
    subtotal: template.price,
    listTotal: template.price,
    savings: 0,
    hours,
    days,
    weeksMin: template.weeksMin,
    weeksMax: template.weeksMax,
    skippedBundledIds: [],
    monthlyTotal: 0,
    monthlyItems: [],
    externalNotes: [
      {
        id: "ext-domain-mx",
        name: "Dominio",
        summary: "Se paga por separado",
        owner: "client",
        billingType: "annual",
      },
      {
        id: "ext-vercel",
        name: "Hosting",
        summary: "Plan del cliente; no va en este precio",
        owner: "client",
        billingType: "monthly",
      },
    ],
  };
}

function collectExternalNotes(ids: string[]): QuoteExternalNote[] {
  const seen = new Set<string>();
  const notes: QuoteExternalNote[] = [];
  for (const id of ids) {
    const calculated = calculateServicePrice(id);
    for (const costId of calculated.externalCostIds) {
      if (seen.has(costId)) continue;
      seen.add(costId);
      const cost = externalCostsById.get(costId);
      if (!cost) continue;
      notes.push({
        id: cost.id,
        name: cost.name,
        summary: cost.summary,
        owner: cost.owner,
        billingType: cost.billingType,
      });
    }
  }
  return notes;
}

export function calculateQuote(state: QuoteState, packageId?: string | null): QuoteResult {
  if (state.templateId) {
    const template = getTemplate(state.templateId);
    if (template) return quoteFromTemplate(template);
  }

  const lineItems: QuoteLineItem[] = [];
  const skip = new Set<string>();
  const selectedIds = collectSelectedIds(state);

  if (state.projectTypeId) {
    const baseId = `base-${state.projectTypeId}`;
    const base = calculateServicePrice(baseId);
    lineItems.push({
      id: baseId,
      label: labelForBase(state.projectTypeId),
      group: "base",
      price: base.finalPrice,
      listPrice: base.finalPrice,
      estimatedHours: base.estimatedHours,
      billingType: "once",
      fromPrice: base.fromPrice,
    });
  }

  const design = calculateServicePrice(`design-${state.designLevel}`);
  if (design.finalPrice > 0 || design.estimatedHours > 0) {
    lineItems.push({
      id: `design-${state.designLevel}`,
      label: labelForDesign(state.designLevel),
      group: "design",
      price: design.finalPrice,
      listPrice: design.finalPrice,
      estimatedHours: design.estimatedHours,
      billingType: "once",
    });
  }

  for (const id of state.uiItemIds) pushItem(lineItems, id, "ui", skip, selectedIds);
  for (const id of state.featureIds) pushItem(lineItems, id, "feature", skip, selectedIds);
  for (const id of state.integrationIds) pushItem(lineItems, id, "integration", skip, selectedIds);
  for (const id of state.extraIds) pushItem(lineItems, id, "extra", skip, selectedIds);

  const skippedBundledIds = [...skip].filter((id) => selectedIds.includes(id));

  const monthlyItems = lineItems.filter((line) => line.billingType === "monthly");
  const developmentItems = lineItems.filter((line) => line.billingType !== "monthly");

  let developmentTotal = developmentItems.reduce((sum, line) => sum + line.price, 0);
  const monthlyTotal = monthlyItems.reduce((sum, line) => sum + line.price, 0);
  const hours = lineItems.reduce((sum, line) => sum + line.estimatedHours, 0);
  const individualDevelopment = developmentTotal;

  if (packageId) {
    const pkg = getPackage(packageId);
    if (pkg && isPackageCovered(state, pkg)) {
      const discountRate = pricingConfig.packageDiscount[pkg.id] ?? 0;
      const closed = roundCommercialPrice(individualDevelopment * (1 - discountRate));
      const discount = Math.max(0, individualDevelopment - closed);
      if (discount > 0) {
        lineItems.push({
          id: `pkg-discount-${pkg.id}`,
          label: `Paquete ${pkg.name} (gestión y QA compartidos)`,
          group: "extra",
          price: -discount,
          listPrice: 0,
          estimatedHours: 0,
          billingType: "once",
        });
        developmentTotal -= discount;
      }
    }
  }

  if (state.rushDelivery) {
    const rush = roundCommercialPrice(developmentTotal * (pricingConfig.rushMultiplier - 1));
    if (rush > 0) {
      lineItems.push({
        id: "rush-delivery",
        label: "Entrega urgente",
        group: "extra",
        price: rush,
        listPrice: rush,
        estimatedHours: 0,
        billingType: "once",
      });
      developmentTotal += rush;
    }
  }

  const days = hours === 0 ? 0 : Math.max(1, Math.ceil(hours / HOURS_PER_DAY));
  const rawWeeks = days / DAYS_PER_WEEK;
  const weeksMin = hours === 0 ? 0 : Math.max(1, Math.floor(rawWeeks) || 1);
  const weeksMax = hours === 0 ? 0 : Math.max(weeksMin, Math.ceil(rawWeeks * WEEK_BUFFER));

  const subtotal = Math.max(0, developmentTotal);
  const savings = Math.max(0, individualDevelopment - subtotal);

  return {
    lineItems,
    subtotal,
    listTotal: individualDevelopment,
    savings,
    hours,
    days,
    weeksMin,
    weeksMax,
    skippedBundledIds,
    monthlyTotal,
    monthlyItems,
    externalNotes: collectExternalNotes([
      state.projectTypeId ? `base-${state.projectTypeId}` : "",
      `design-${state.designLevel}`,
      ...selectedIds,
    ].filter(Boolean)),
  };
}

export function packageIndividualTotal(pkg: ServicePackage): number {
  return packageCoveredTotals(pkg).price;
}

export function packageIndividualListTotal(pkg: ServicePackage): number {
  return packageCoveredTotals(pkg).price;
}

export function getPackagePricing(pkg: ServicePackage | string): PriceEntry {
  const resolved = typeof pkg === "string" ? getPackage(pkg) : pkg;
  if (!resolved) {
    return { price: 0, listPrice: 0, rawPrice: 0, estimatedHours: 0 };
  }
  const individual = packageCoveredTotals(resolved);
  const discountRate = pricingConfig.packageDiscount[resolved.id] ?? 0;
  const raw = individual.price * (1 - discountRate);
  const closed = roundCommercialPrice(raw);
  return {
    price: closed,
    listPrice: individual.price,
    rawPrice: raw,
    estimatedHours: individual.hours,
    fromPrice: resolved.projectTypeId === "saas" || resolved.projectTypeId === "webapp",
  };
}

function packageCoveredTotals(pkg: ServicePackage): { price: number; hours: number } {
  const quote = calculateQuote(
    {
      projectTypeId: pkg.projectTypeId,
      designLevel: pkg.designLevel,
      featureIds: [...pkg.featureIds],
      integrationIds: [...pkg.integrationIds],
      extraIds: [...pkg.extraIds],
      uiItemIds: [...pkg.uiItemIds],
      rushDelivery: false,
      templateId: null,
      brief: "",
    },
    null,
  );
  return { price: quote.subtotal, hours: quote.hours };
}

function isPackageCovered(state: QuoteState, pkg: ServicePackage): boolean {
  if (state.projectTypeId !== pkg.projectTypeId) return false;
  if (state.designLevel !== pkg.designLevel) return false;
  const hasAll = (required: string[], selected: string[]) =>
    required.every((id) => selected.includes(id));
  return (
    hasAll(pkg.featureIds, state.featureIds) &&
    hasAll(pkg.integrationIds, state.integrationIds) &&
    hasAll(pkg.extraIds, state.extraIds) &&
    hasAll(pkg.uiItemIds, state.uiItemIds)
  );
}

function labelForBase(id: QuoteState["projectTypeId"]): string {
  switch (id) {
    case "landing":
      return "Landing page (base del proyecto)";
    case "website":
      return "Sitio web (base del proyecto)";
    case "webapp":
      return "Aplicación web (base del proyecto)";
    case "dashboard":
      return "Dashboard (base del proyecto)";
    case "ecommerce":
      return "E-commerce (base del proyecto)";
    case "saas":
      return "SaaS (base del proyecto)";
    case "desktop":
      return "App de escritorio (base del proyecto)";
    case "other":
      return "Proyecto a medida (base)";
    default:
      return "Proyecto";
  }
}

function labelForDesign(level: QuoteState["designLevel"]): string {
  switch (level) {
    case "basic":
      return "Diseño básico";
    case "custom":
      return "Diseño personalizado";
    case "premium":
      return "Diseño premium";
    default:
      return "Diseño";
  }
}

export function formatWeekRange(result: QuoteResult): string {
  if (result.hours === 0) return "Por definir";
  if (result.weeksMin === result.weeksMax) {
    return result.weeksMin === 1 ? "1 semana" : `${result.weeksMin} semanas`;
  }
  return `${result.weeksMin}–${result.weeksMax} semanas`;
}

export function withPricing<T extends { id: string }>(item: T) {
  return { ...item, ...getItemPricing(item.id) };
}

export const catalogForPricing = [...uiItems, ...features, ...integrations, ...extras];

export function allPricedServices() {
  const ids = [
    ...Object.keys(pricingConfig.minimumProjectPrice).map((id) => `base-${id}`),
    "design-basic",
    "design-custom",
    "design-premium",
    ...catalogForPricing.map((item) => item.id),
  ];
  return ids.map((id) => {
    const item = catalogForPricing.find((entry) => entry.id === id);
    const calculated = calculateServicePrice(id);
    const specCategory = item?.category ?? getServiceWork(id)?.category ?? calculated.complexity;
    return {
      ...calculated,
      name: item?.name ?? labelFallback(id),
      category: specCategory,
    };
  });
}

function labelFallback(id: string): string {
  if (id.startsWith("base-")) return labelForBase(id.replace("base-", "") as QuoteState["projectTypeId"]);
  if (id.startsWith("design-")) return labelForDesign(id.replace("design-", "") as QuoteState["designLevel"]);
  return id;
}

export { getBasePricing, getDesignPricing, toPriceEntry };

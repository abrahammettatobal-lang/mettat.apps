import { pricingConfig } from "@/data/pricing-config";
import { pricingOverrides } from "@/data/pricing-overrides";
import { getServiceWork, sumHours } from "@/data/service-work";
import type { PriceEntry, ProjectTypeId } from "@/types/catalog";
import type {
  BillingType,
  CalculatedServicePrice,
  PriceRange,
  WorkEstimate,
} from "@/types/pricing";

export function roundCommercialPrice(amount: number): number {
  if (amount <= 0) return 0;
  if (amount < 1_000) return Math.ceil(amount / 50) * 50;
  if (amount < 50_000) return Math.ceil(amount / 100) * 100;
  return Math.ceil(amount / 500) * 500;
}

export function isPricingStale(lastReviewedAt: string, now = new Date()): boolean {
  const reviewed = new Date(`${lastReviewedAt}T00:00:00`);
  if (Number.isNaN(reviewed.getTime())) return true;
  const stale = new Date(reviewed);
  stale.setMonth(stale.getMonth() + pricingConfig.staleAfterMonths);
  return now >= stale;
}

function requirementsMet(
  spec: { requires?: string[]; requiresAny?: string[] },
  selectedIds: string[],
): boolean {
  if (spec.requires?.length) {
    return spec.requires.every((id) => selectedIds.includes(id));
  }
  if (spec.requiresAny?.length) {
    return spec.requiresAny.some((id) => selectedIds.includes(id));
  }
  return false;
}

function projectTypeFromBaseId(id: string): ProjectTypeId | null {
  if (!id.startsWith("base-")) return null;
  return id.slice(5) as ProjectTypeId;
}

function priceRangeFrom(raw: number, recommended: number, fromPrice: boolean): PriceRange {
  if (fromPrice) {
    return {
      min: recommended,
      recommended,
      max: roundCommercialPrice(Math.max(recommended * 1.4, raw * 1.4)),
    };
  }
  return {
    min: roundCommercialPrice(raw * 0.9),
    recommended,
    max: roundCommercialPrice(raw * 1.15),
  };
}

export function calculateServicePrice(
  id: string,
  options?: { selectedIds?: string[] },
): CalculatedServicePrice {
  const spec = getServiceWork(id);
  const selected = (options?.selectedIds ?? []).filter((item) => item !== id);
  const billingType: BillingType = spec?.billingType ?? "once";

  if (!spec) {
    return {
      id,
      mode: "standalone",
      complexity: "standard",
      rateType: "standard",
      hourlyRate: pricingConfig.hourlyRate.standard,
      workBreakdown: {
        analysis: 0,
        ui: 0,
        frontend: 0,
        backend: 0,
        database: 0,
        integration: 0,
        testing: 0,
        deployment: 0,
      },
      estimatedHours: 0,
      laborCost: 0,
      riskCost: 0,
      calculatedPrice: 0,
      rawPrice: 0,
      roundedPrice: 0,
      finalPrice: 0,
      fromPrice: false,
      priceRange: { min: 0, recommended: 0, max: 0 },
      assumptions: ["Sin estimación registrada para este id."],
      sourceIds: [],
      lastReviewedAt: pricingConfig.researchDate,
      stale: true,
      hasManualOverride: false,
      billingType,
      externalCostIds: [],
      includedRevisions: pricingConfig.includedRevisions,
      pricingExplanation: {
        estimatedHours: 0,
        hourlyRate: 0,
        laborCost: 0,
        riskCost: 0,
        calculatedPrice: 0,
        roundedPrice: 0,
        finalPrice: 0,
        sourceIds: [],
        derivedFromEffort: true,
      },
    };
  }

  const included =
    spec.includedWith?.some((other) => selected.includes(other)) ?? false;
  const addon = Boolean(spec.addonWork) && requirementsMet(spec, selected);
  const mode = included ? "included" : addon ? "addon" : "standalone";

  const work: WorkEstimate = included
    ? {
        analysis: 0,
        ui: 0,
        frontend: 0,
        backend: 0,
        database: 0,
        integration: 0,
        testing: 0,
        deployment: 0,
      }
    : addon && spec.addonWork
      ? spec.addonWork
      : spec.work;

  const estimatedHours = sumHours(work);
  const hourlyRate = pricingConfig.hourlyRate[spec.rateType];
  const laborCost = estimatedHours * hourlyRate;
  const riskCost = laborCost * (spec.riskBuffer ?? 0);
  let calculatedPrice = laborCost + riskCost;

  const projectType = projectTypeFromBaseId(id);
  if (projectType) {
    calculatedPrice = Math.max(calculatedPrice, pricingConfig.minimumProjectPrice[projectType]);
  }

  const roundedPrice = roundCommercialPrice(calculatedPrice);
  const override = spec.manualOverride ?? pricingOverrides[id];
  const hasManualOverride = typeof override === "number";
  const finalPrice = hasManualOverride ? override : roundedPrice;

  const explanation = {
    estimatedHours,
    hourlyRate,
    laborCost,
    riskCost,
    calculatedPrice,
    roundedPrice,
    finalPrice,
    sourceIds: spec.sourceIds,
    derivedFromEffort: true,
  };

  return {
    id,
    mode,
    complexity: spec.complexity,
    rateType: spec.rateType,
    hourlyRate,
    workBreakdown: work,
    estimatedHours,
    laborCost,
    riskCost,
    calculatedPrice,
    rawPrice: calculatedPrice,
    roundedPrice,
    finalPrice,
    fromPrice: Boolean(spec.fromPrice),
    priceRange: spec.marketRange
      ? {
          min: spec.marketRange.min,
          recommended: finalPrice,
          max: spec.marketRange.max,
        }
      : priceRangeFrom(calculatedPrice, finalPrice, Boolean(spec.fromPrice)),
    marketRange: spec.marketRange,
    assumptions: spec.assumptions,
    sourceIds: spec.sourceIds,
    lastReviewedAt: spec.lastReviewedAt,
    stale: isPricingStale(spec.lastReviewedAt),
    hasManualOverride,
    billingType,
    externalCostIds: spec.externalCostIds ?? [],
    includedRevisions: spec.includedRevisions ?? pricingConfig.includedRevisions,
    pricingExplanation: explanation,
    requires: spec.requires,
    requiresAny: spec.requiresAny,
  };
}

export function toPriceEntry(calculated: CalculatedServicePrice): PriceEntry {
  return {
    price: calculated.finalPrice,
    listPrice: calculated.finalPrice,
    rawPrice: calculated.rawPrice,
    estimatedHours: calculated.estimatedHours,
    fromPrice: calculated.fromPrice,
  };
}

export function getItemPricing(id: string, selectedIds: string[] = []): PriceEntry {
  return toPriceEntry(calculateServicePrice(id, { selectedIds }));
}

export function getBasePricing(id: ProjectTypeId): PriceEntry {
  return getItemPricing(`base-${id}`);
}

export function getDesignPricing(level: "basic" | "custom" | "premium"): PriceEntry {
  return getItemPricing(`design-${level}`);
}

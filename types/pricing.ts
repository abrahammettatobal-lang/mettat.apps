export type RateType = "standard" | "advanced" | "specialist";

export type PricingComplexity = "basic" | "standard" | "advanced" | "specialist";

export type CostOwner = "included" | "client" | "developer";

export type BillingType = "once" | "monthly" | "annual" | "usage";

export type ExternalBillingKind = "fixed" | "variable" | "hybrid";

export interface WorkEstimate {
  analysis: number;
  ui: number;
  frontend: number;
  backend: number;
  database: number;
  integration: number;
  testing: number;
  deployment: number;
}

export interface PriceRange {
  min: number;
  recommended: number;
  max: number;
}

export interface MarketRange {
  min: number;
  typical: number;
  max: number;
}

export interface PricingExplanation {
  estimatedHours: number;
  hourlyRate: number;
  laborCost: number;
  riskCost: number;
  calculatedPrice: number;
  roundedPrice: number;
  finalPrice: number;
  sourceIds: string[];
  derivedFromEffort: boolean;
}

export interface ServiceWorkSpec {
  complexity: PricingComplexity;
  rateType: RateType;
  work: WorkEstimate;
  addonWork?: WorkEstimate;
  requires?: string[];
  requiresAny?: string[];
  includedWith?: string[];
  /** Fracción de la mano de obra, solo con riesgo técnico justificado. */
  riskBuffer?: number;
  fromPrice?: boolean;
  marketRange?: MarketRange;
  assumptions: string[];
  sourceIds: string[];
  lastReviewedAt: string;
  manualOverride?: number;
  billingType?: BillingType;
  externalCostIds?: string[];
  includedRevisions?: number;
  category: string;
}

export interface CalculatedServicePrice {
  id: string;
  name?: string;
  mode: "standalone" | "addon" | "included";
  complexity: PricingComplexity;
  rateType: RateType;
  hourlyRate: number;
  workBreakdown: WorkEstimate;
  estimatedHours: number;
  laborCost: number;
  riskCost: number;
  calculatedPrice: number;
  rawPrice: number;
  roundedPrice: number;
  finalPrice: number;
  fromPrice: boolean;
  priceRange: PriceRange;
  marketRange?: MarketRange;
  assumptions: string[];
  sourceIds: string[];
  lastReviewedAt: string;
  stale: boolean;
  hasManualOverride: boolean;
  billingType: BillingType;
  externalCostIds: string[];
  includedRevisions: number;
  pricingExplanation: PricingExplanation;
  requires?: string[];
  requiresAny?: string[];
}

export interface PricingSource {
  id: string;
  name: string;
  url: string;
  accessedAt: string;
  market: string;
  notes: string;
}

export interface ExternalCost {
  id: string;
  name: string;
  url: string;
  billingType: BillingType;
  kind: ExternalBillingKind;
  owner: CostOwner;
  /** Texto público. Nunca fingir un fijo si el cobro es por uso. */
  summary: string;
  amountUsd?: number;
  amountMxn?: number;
  unit?: string;
  notes: string;
  accessedAt: string;
}

export interface QuoteExternalNote {
  id: string;
  name: string;
  summary: string;
  owner: CostOwner;
  billingType: BillingType;
}

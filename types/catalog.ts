export type Complexity = "low" | "medium" | "high";

export type ProjectTypeId =
  | "landing"
  | "website"
  | "webapp"
  | "dashboard"
  | "ecommerce"
  | "saas"
  | "desktop"
  | "other";

export type DesignLevel = "basic" | "custom" | "premium";

export type CatalogKind = "ui" | "feature" | "integration" | "extra";

export type FeatureCategory =
  | "authentication"
  | "database"
  | "admin"
  | "payments"
  | "ai"
  | "api"
  | "files"
  | "realtime"
  | "email"
  | "search"
  | "extras";

export type UiCategory =
  | "navbar"
  | "hero"
  | "cards"
  | "forms"
  | "dashboard"
  | "ecommerce";

export type FilterDomain =
  | "ui"
  | "backend"
  | "database"
  | "ai"
  | "ecommerce"
  | "auth"
  | "apis"
  | "integraciones"
  | "extras";

export interface PriceEntry {
  /** Precio público recomendado en MXN. */
  price: number;
  /**
   * Referencia para mostrar ahorro real de paquete (suma individual).
   * En ítems sueltos coincide con `price`.
   */
  listPrice: number;
  /** Cálculo interno antes de redondeo comercial. */
  rawPrice: number;
  estimatedHours: number;
  fromPrice?: boolean;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  kind: CatalogKind;
  tags: string[];
  icon: string;
  complexity: Complexity;
  includes: string[];
  optional?: string[];
  compatibility?: string[];
  domains: FilterDomain[];
  bundledIds?: string[];
  demoId?: string;
}

export interface ProjectType {
  id: ProjectTypeId;
  name: string;
  description: string;
  examples: string[];
  commonFeatures: string[];
  icon: string;
  future?: boolean;
}

export interface DesignOption {
  id: DesignLevel;
  name: string;
  description: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  projectTypeId: ProjectTypeId;
  designLevel: DesignLevel;
  featureIds: string[];
  integrationIds: string[];
  extraIds: string[];
  uiItemIds: string[];
  highlight?: boolean;
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  type: string;
  technologies: string[];
  image: string;
  href?: string;
  github?: string;
}

export interface QuoteState {
  projectTypeId: ProjectTypeId | null;
  designLevel: DesignLevel;
  featureIds: string[];
  integrationIds: string[];
  extraIds: string[];
  uiItemIds: string[];
  rushDelivery: boolean;
  templateId: string | null;
  /** Lo que el cliente quiere, en sus palabras. */
  brief: string;
}

export interface QuoteLineItem {
  id: string;
  label: string;
  group: "base" | "design" | "ui" | "feature" | "integration" | "extra";
  price: number;
  listPrice: number;
  estimatedHours: number;
  billingType?: "once" | "monthly" | "annual" | "usage";
  fromPrice?: boolean;
}

export interface QuoteResult {
  lineItems: QuoteLineItem[];
  /** Subtotal de desarrollo (pago único). */
  subtotal: number;
  /** Suma individual de desarrollo antes de descuento de paquete. */
  listTotal: number;
  /** Ahorro real de paquete (gestión compartida), nunca un “precio de mercado” ficticio. */
  savings: number;
  hours: number;
  days: number;
  weeksMin: number;
  weeksMax: number;
  skippedBundledIds: string[];
  monthlyTotal: number;
  monthlyItems: QuoteLineItem[];
  externalNotes: import("@/types/pricing").QuoteExternalNote[];
}

export interface ContactPayload {
  name: string;
  email: string;
  whatsapp?: string;
  description: string;
  budget?: string;
  desiredDate?: string;
}

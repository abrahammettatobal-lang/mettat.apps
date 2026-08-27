import { PRICING_RESEARCH_DATE } from "@/data/pricing-sources";
import type { MarketRange, RateType } from "@/types/pricing";
import type { ProjectTypeId } from "@/types/catalog";

/**
 * Tarifas de un desarrollador independiente profesional en México (no agencia, no Fiverr).
 *
 * Equivalente aproximado al FIX Banxico del 26 ago 2026 (~16.96 MXN/USD):
 * - 500 MXN/h ≈ 29.5 USD/h → mid local (ProLatamWork mid 22–40, Universepage 350–600)
 * - 650 MXN/h ≈ 38 USD/h → semi-senior/senior local (iTechDev 400–700 / Lemon mid-high)
 * - 850 MXN/h ≈ 50 USD/h → especialista (iTechDev senior 700–1,200; aún bajo vs Lemon senior US)
 */
export const pricingConfig = {
  currency: "MXN" as const,
  researchDate: PRICING_RESEARCH_DATE,
  usdMxn: 16.96,
  includedRevisions: 2,
  staleAfterMonths: 6,
  hoursPerDay: 6,
  daysPerWeek: 5,
  weekBuffer: 1.3,
  rushEnabledDefault: false,
  rushMultiplier: 1.25,
  hourlyRate: {
    standard: 500,
    advanced: 650,
    specialist: 850,
  } satisfies Record<RateType, number>,
  /**
   * Piso por tipo de proyecto (solo la partida base).
   * Evita landings de “3 h × tarifa” sin setup, QA, deploy ni revisiones.
   */
  minimumProjectPrice: {
    landing: 8_000,
    website: 12_000,
    webapp: 25_000,
    dashboard: 20_000,
    ecommerce: 18_000,
    saas: 45_000,
    desktop: 35_000,
    other: 12_000,
  } satisfies Record<ProjectTypeId, number>,
  /**
   * Descuento de paquete = menos gestión, un solo kickoff y QA compartido.
   * No es una “oferta” sobre un precio de mercado inventado.
   */
  packageDiscount: {
    "landing-starter": 0.08,
    "web-business": 0.08,
    "web-app": 0.1,
    saas: 0.1,
  } as Record<string, number>,
  projectMarket: {
    landing: { min: 8_000, typical: 14_000, max: 25_000 },
    website: { min: 12_000, typical: 28_000, max: 45_000 },
    webapp: { min: 45_000, typical: 85_000, max: 180_000 },
    dashboard: { min: 35_000, typical: 70_000, max: 140_000 },
    ecommerce: { min: 18_000, typical: 38_000, max: 90_000 },
    saas: { min: 80_000, typical: 140_000, max: 250_000 },
    desktop: { min: 40_000, typical: 90_000, max: 180_000 },
    other: { min: 15_000, typical: 40_000, max: 120_000 },
  } satisfies Record<ProjectTypeId, MarketRange>,
} as const;

export const ESTIMATE_DISCLAIMER =
  "Precio estimado. El precio final puede cambiar después de revisar los requisitos exactos, alcance e integraciones del proyecto.";

export const PRICING_UPDATED_LABEL = "Precios actualizados: agosto 2026";

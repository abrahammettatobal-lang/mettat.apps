/**
 * Punto de acceso a precios públicos.
 * La fuente de verdad es el motor: horas × tarifa + redondeo comercial.
 */

import { pricingConfig } from "@/data/pricing-config";
import {
  getBasePricing,
  getDesignPricing,
  getItemPricing,
} from "@/lib/service-price";
import type { DesignLevel, PriceEntry, ProjectTypeId } from "@/types/catalog";

export const CURRENCY = pricingConfig.currency;
export const HOURS_PER_DAY = pricingConfig.hoursPerDay;
export const DAYS_PER_WEEK = pricingConfig.daysPerWeek;
export const WEEK_BUFFER = pricingConfig.weekBuffer;

export { getItemPricing, getBasePricing, getDesignPricing };
export { calculateServicePrice, roundCommercialPrice, isPricingStale } from "@/lib/service-price";

export const pricing = {
  base: {
    landing: getBasePricing("landing"),
    website: getBasePricing("website"),
    webapp: getBasePricing("webapp"),
    dashboard: getBasePricing("dashboard"),
    ecommerce: getBasePricing("ecommerce"),
    saas: getBasePricing("saas"),
    desktop: getBasePricing("desktop"),
    other: getBasePricing("other"),
  } satisfies Record<ProjectTypeId, PriceEntry>,

  design: {
    basic: getDesignPricing("basic"),
    custom: getDesignPricing("custom"),
    premium: getDesignPricing("premium"),
  } satisfies Record<DesignLevel, PriceEntry>,
};

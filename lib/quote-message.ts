import { catalogById } from "@/data/catalog";
import { ESTIMATE_DISCLAIMER } from "@/data/pricing-config";
import { projectTypes, designOptions } from "@/data/project-types";
import { getTemplate, TEMPLATE_DISCLAIMER } from "@/data/templates";
import { formatMXN } from "@/lib/format";
import { formatWeekRange } from "@/lib/pricing-engine";
import type { QuoteResult, QuoteState } from "@/types/catalog";

export function buildQuoteMessage(state: QuoteState, result: QuoteResult, quoteId: string): string {
  const template = getTemplate(state.templateId);
  if (template) {
    return [
      `Cotización ${quoteId}`,
      `Estilo de UI: ${template.name} · ${template.styleName}`,
      `Tipo: ${template.kind === "website" ? "Página web" : "App"}`,
      "",
      `Precio de partida: ${formatMXN(template.price)} MXN`,
      `Entrega: ${template.deliveryLabel}`,
      "",
      "Qué quiere la persona:",
      state.brief.trim() || "(aún no escribió el brief)",
      "",
      TEMPLATE_DISCLAIMER,
    ].join("\n");
  }

  const typeName = projectTypes.find((item) => item.id === state.projectTypeId)?.name ?? "Sin tipo";
  const designName = designOptions.find((item) => item.id === state.designLevel)?.name ?? state.designLevel;
  const development = result.lineItems
    .filter((item) => item.billingType !== "monthly")
    .map((item) => `- ${item.label}: ${formatMXN(item.price)} MXN`)
    .join("\n");
  const monthly = result.monthlyItems
    .map((item) => `- ${item.label}: ${formatMXN(item.price)} MXN / mes`)
    .join("\n");
  const externals = result.externalNotes
    .map((note) => `- ${note.name}: ${note.summary}`)
    .join("\n");
  return [
    `Cotización ${quoteId}`,
    `Tipo: ${typeName}`,
    `Diseño: ${designName}`,
    "",
    "Desarrollo estimado:",
    development || "- (vacío)",
    "",
    `Total desarrollo: ${formatMXN(result.subtotal)} MXN`,
    result.savings > 0
      ? `Individual: ${formatMXN(result.listTotal)} MXN · Ahorro de paquete: ${formatMXN(result.savings)} MXN`
      : null,
    `Tiempo estimado: ${formatWeekRange(result)}`,
    monthly ? `\nMantenimiento:\n${monthly}` : null,
    externals ? `\nServicios externos (cliente):\n${externals}` : null,
    "",
    ESTIMATE_DISCLAIMER,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function selectedNames(state: QuoteState): string[] {
  return [...state.uiItemIds, ...state.featureIds, ...state.integrationIds, ...state.extraIds]
    .map((id) => catalogById.get(id)?.name)
    .filter((name): name is string => Boolean(name));
}

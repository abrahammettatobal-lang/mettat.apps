import { defaultQuoteState } from "@/data/catalog";
import { getTemplate, templateToQuote } from "@/data/templates";
import type { DesignLevel, ProjectTypeId, QuoteState } from "@/types/catalog";

const PROJECT_IDS: ProjectTypeId[] = [
  "landing",
  "website",
  "webapp",
  "dashboard",
  "ecommerce",
  "saas",
  "desktop",
  "other",
];

const DESIGN_LEVELS: DesignLevel[] = ["basic", "custom", "premium"];

function splitList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function quoteToSearchParams(state: QuoteState, packageId?: string | null): URLSearchParams {
  const params = new URLSearchParams();
  if (state.templateId) {
    params.set("template", state.templateId);
    return params;
  }
  if (state.projectTypeId) params.set("project", state.projectTypeId);
  if (state.designLevel !== "basic") params.set("design", state.designLevel);
  if (state.featureIds.length) params.set("features", state.featureIds.join(","));
  if (state.integrationIds.length) params.set("integrations", state.integrationIds.join(","));
  if (state.extraIds.length) params.set("extras", state.extraIds.join(","));
  if (state.uiItemIds.length) params.set("ui", state.uiItemIds.join(","));
  if (state.rushDelivery) params.set("rush", "1");
  if (packageId) params.set("package", packageId);
  return params;
}

export function quoteFromSearchParams(params: URLSearchParams): QuoteState {
  const template = getTemplate(params.get("template"));
  if (template) return templateToQuote(template);

  const project = params.get("project");
  const design = params.get("design");
  return {
    projectTypeId: PROJECT_IDS.includes(project as ProjectTypeId)
      ? (project as ProjectTypeId)
      : defaultQuoteState.projectTypeId,
    designLevel: DESIGN_LEVELS.includes(design as DesignLevel)
      ? (design as DesignLevel)
      : "basic",
    featureIds: splitList(params.get("features")),
    integrationIds: splitList(params.get("integrations")),
    extraIds: splitList(params.get("extras")),
    uiItemIds: splitList(params.get("ui")),
    rushDelivery: params.get("rush") === "1",
    templateId: null,
    brief: "",
  };
}

export function hasQuoteQuery(params: URLSearchParams): boolean {
  return (
    params.has("template") ||
    params.has("project") ||
    params.has("features") ||
    params.has("integrations") ||
    params.has("extras") ||
    params.has("ui") ||
    params.has("package") ||
    params.has("design") ||
    params.has("rush") ||
    params.has("custom")
  );
}

"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { toast } from "sonner";
import { catalogById, defaultQuoteState, packageToQuote } from "@/data/catalog";
import { getItemPricing } from "@/data/pricing";
import { templateToQuote, type SiteTemplate } from "@/data/templates";
import { formatMXN, formatMXNDelta } from "@/lib/format";
import { createQuoteId } from "@/lib/quote-id";
import { calculateQuote, collectSelectedIds } from "@/lib/pricing-engine";
import { quoteToSearchParams } from "@/lib/quote-url";
import { persistQuote, useIsClient, useQuoteSnapshot } from "@/lib/quote-store";
import { toggleId, uniqueIds } from "@/lib/utils";
import { site } from "@/data/site";
import type {
  CatalogItem,
  CatalogKind,
  DesignLevel,
  ProjectTypeId,
  QuoteResult,
  QuoteState,
  ServicePackage,
} from "@/types/catalog";

type QuoteContextValue = {
  state: QuoteState;
  quoteId: string;
  packageId: string | null;
  result: QuoteResult;
  hydrated: boolean;
  setProjectType: (id: ProjectTypeId | null) => void;
  setDesignLevel: (level: DesignLevel) => void;
  setRushDelivery: (value: boolean) => void;
  setBrief: (brief: string) => void;
  toggleItem: (item: CatalogItem) => void;
  addItem: (item: CatalogItem) => void;
  removeItem: (item: CatalogItem) => void;
  isSelected: (id: string) => boolean;
  applyPackage: (pkg: ServicePackage) => void;
  applyTemplate: (template: SiteTemplate) => void;
  hydrateFromState: (next: QuoteState, nextPackageId?: string | null) => void;
  reset: () => void;
  sharePath: string;
  shareUrl: string;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

function kindKey(kind: CatalogKind): keyof Pick<
  QuoteState,
  "featureIds" | "integrationIds" | "extraIds" | "uiItemIds"
> {
  if (kind === "ui") return "uiItemIds";
  if (kind === "integration") return "integrationIds";
  if (kind === "extra") return "extraIds";
  return "featureIds";
}

function selectedIds(state: QuoteState): string[] {
  return [...state.uiItemIds, ...state.featureIds, ...state.integrationIds, ...state.extraIds];
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const snapshot = useQuoteSnapshot();
  const hydrated = useIsClient();
  const { state, quoteId, packageId } = snapshot;

  const result = useMemo(() => calculateQuote(state, packageId), [state, packageId]);

  const sharePath = useMemo(() => {
    const params = quoteToSearchParams(state, packageId);
    const query = params.toString();
    return query ? `/cotizador?${query}` : "/cotizador";
  }, [state, packageId]);

  const shareUrl = `${site.url}${sharePath}`;

  const commit = useCallback(
    (next: Partial<typeof snapshot>) => {
      persistQuote({ ...snapshot, ...next });
    },
    [snapshot],
  );

  const isSelected = useCallback((id: string) => selectedIds(state).includes(id), [state]);

  const setProjectType = useCallback(
    (id: ProjectTypeId | null) => {
      commit({ packageId: null, state: { ...state, projectTypeId: id, templateId: null } });
    },
    [commit, state],
  );

  const setDesignLevel = useCallback(
    (level: DesignLevel) => {
      commit({ packageId: null, state: { ...state, designLevel: level } });
    },
    [commit, state],
  );

  const setRushDelivery = useCallback(
    (value: boolean) => {
      commit({ state: { ...state, rushDelivery: value } });
    },
    [commit, state],
  );

  const setBrief = useCallback(
    (brief: string) => {
      commit({ state: { ...state, brief } });
    },
    [commit, state],
  );

  const toggleItem = useCallback(
    (item: CatalogItem) => {
      const key = kindKey(item.kind);
      const adding = !state[key].includes(item.id);
      const nextSelected = adding
        ? [...collectSelectedIds(state), item.id]
        : collectSelectedIds(state).filter((id) => id !== item.id);
      const priced = getItemPricing(item.id, nextSelected);
      commit({
        packageId: null,
        state: { ...state, templateId: null, [key]: toggleId(state[key], item.id) },
      });
      if (adding) {
        toast.success("Agregado a tu proyecto", {
          description: `${item.name} · ${formatMXNDelta(priced.price)} MXN`,
        });
      } else {
        toast("Eliminado del proyecto", { description: item.name });
      }
    },
    [commit, state],
  );

  const addItem = useCallback(
    (item: CatalogItem) => {
      const key = kindKey(item.kind);
      if (state[key].includes(item.id)) return;
      const priced = getItemPricing(item.id, [...collectSelectedIds(state), item.id]);
      commit({
        packageId: null,
        state: { ...state, templateId: null, [key]: [...state[key], item.id] },
      });
      toast.success("Agregado a tu proyecto", {
        description: `${item.name} · ${formatMXNDelta(priced.price)} MXN`,
      });
    },
    [commit, state],
  );

  const removeItem = useCallback(
    (item: CatalogItem) => {
      const key = kindKey(item.kind);
      commit({
        packageId: null,
        state: { ...state, templateId: null, [key]: state[key].filter((id) => id !== item.id) },
      });
      toast("Eliminado del proyecto", { description: item.name });
    },
    [commit, state],
  );

  const applyPackage = useCallback(
    (pkg: ServicePackage) => {
      commit({ state: packageToQuote(pkg), packageId: pkg.id });
      toast.success(`${pkg.name} aplicado`, {
        description: "El cotizador se llenó con este paquete.",
      });
    },
    [commit],
  );

  const applyTemplate = useCallback(
    (template: SiteTemplate) => {
      commit({ state: templateToQuote(template, state.brief), packageId: null });
      toast.success(`${template.name} elegida`, {
        description: `${formatMXN(template.price)} MXN · demo de UI`,
      });
    },
    [commit, state.brief],
  );

  const hydrateFromState = useCallback(
    (next: QuoteState, nextPackageId?: string | null) => {
      commit({
        state: {
          ...defaultQuoteState,
          ...next,
          featureIds: uniqueIds(next.featureIds),
          integrationIds: uniqueIds(next.integrationIds),
          extraIds: uniqueIds(next.extraIds),
          uiItemIds: uniqueIds(next.uiItemIds),
          rushDelivery: Boolean(next.rushDelivery),
          templateId: next.templateId ?? null,
          brief: typeof next.brief === "string" ? next.brief : "",
        },
        packageId: nextPackageId === undefined ? snapshot.packageId : nextPackageId,
      });
    },
    [commit, snapshot.packageId],
  );

  const reset = useCallback(() => {
    commit({
      state: defaultQuoteState,
      packageId: null,
      quoteId: createQuoteId(),
    });
    toast("Proyecto reiniciado");
  }, [commit]);

  const value = useMemo<QuoteContextValue>(
    () => ({
      state,
      quoteId,
      packageId,
      result,
      hydrated,
      setProjectType,
      setDesignLevel,
      setRushDelivery,
      setBrief,
      toggleItem,
      addItem,
      removeItem,
      isSelected,
      applyPackage,
      applyTemplate,
      hydrateFromState,
      reset,
      sharePath,
      shareUrl,
    }),
    [
      state,
      quoteId,
      packageId,
      result,
      hydrated,
      setProjectType,
      setDesignLevel,
      setRushDelivery,
      setBrief,
      toggleItem,
      addItem,
      removeItem,
      isSelected,
      applyPackage,
      applyTemplate,
      hydrateFromState,
      reset,
      sharePath,
      shareUrl,
    ],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote debe usarse dentro de QuoteProvider");
  return ctx;
}

export function useCatalogItem(id: string) {
  return catalogById.get(id);
}

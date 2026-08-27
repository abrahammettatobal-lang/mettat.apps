"use client";

import { useSyncExternalStore } from "react";
import { defaultQuoteState } from "@/data/catalog";
import { createQuoteId } from "@/lib/quote-id";
import { uniqueIds } from "@/lib/utils";
import type { QuoteState } from "@/types/catalog";

const STORAGE_KEY = "metta-quote-v2";
const ID_KEY = "metta-quote-id-v1";
const PKG_KEY = "metta-package-id-v1";

export type QuoteSnapshot = {
  state: QuoteState;
  quoteId: string;
  packageId: string | null;
};

const listeners = new Set<() => void>();

const empty: QuoteSnapshot = {
  state: defaultQuoteState,
  quoteId: "MTA-DRAFT",
  packageId: null,
};

let snapshot: QuoteSnapshot = empty;
let booted = false;

function normalize(state: QuoteState): QuoteState {
  return {
    ...defaultQuoteState,
    ...state,
    featureIds: uniqueIds(state.featureIds ?? []),
    integrationIds: uniqueIds(state.integrationIds ?? []),
    extraIds: uniqueIds(state.extraIds ?? []),
    uiItemIds: uniqueIds(state.uiItemIds ?? []),
    rushDelivery: Boolean(state.rushDelivery),
    templateId: typeof state.templateId === "string" ? state.templateId : null,
    brief: typeof state.brief === "string" ? state.brief : "",
  };
}

function readFromStorage(): QuoteSnapshot {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const state = raw ? normalize(JSON.parse(raw) as QuoteState) : defaultQuoteState;
    let quoteId = localStorage.getItem(ID_KEY);
    if (!quoteId) {
      quoteId = createQuoteId();
      localStorage.setItem(ID_KEY, quoteId);
    }
    return {
      state,
      quoteId,
      packageId: localStorage.getItem(PKG_KEY),
    };
  } catch {
    return { ...empty, quoteId: createQuoteId() };
  }
}

function boot() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  snapshot = readFromStorage();
}

function emit() {
  snapshot = { ...snapshot };
  for (const listener of listeners) listener();
}

export function subscribeQuote(listener: () => void) {
  boot();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getQuoteSnapshot() {
  boot();
  return snapshot;
}

export function getQuoteServerSnapshot() {
  return empty;
}

export function persistQuote(next: QuoteSnapshot) {
  boot();
  snapshot = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next.state));
  localStorage.setItem(ID_KEY, next.quoteId);
  if (next.packageId) localStorage.setItem(PKG_KEY, next.packageId);
  else localStorage.removeItem(PKG_KEY);
  emit();
}

export function useQuoteSnapshot() {
  return useSyncExternalStore(subscribeQuote, getQuoteSnapshot, getQuoteServerSnapshot);
}

export function useIsClient() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

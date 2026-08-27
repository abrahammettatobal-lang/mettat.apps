"use client";

import { createContext, useContext, type ReactNode } from "react";

const EmbedContext = createContext(false);

export function EmbedProvider({ embedded, children }: { embedded?: boolean; children: ReactNode }) {
  return <EmbedContext.Provider value={Boolean(embedded)}>{children}</EmbedContext.Provider>;
}

export function useEmbedded() {
  return useContext(EmbedContext);
}

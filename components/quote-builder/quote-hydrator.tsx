"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useQuote } from "@/components/providers/quote-provider";
import { packages } from "@/data/packages";
import { defaultQuoteState, packageToQuote } from "@/data/catalog";
import { getTemplate, templateToQuote } from "@/data/templates";
import { hasQuoteQuery, quoteFromSearchParams } from "@/lib/quote-url";

export function QuoteHydrator() {
  const searchParams = useSearchParams();
  const { hydrated, hydrateFromState, state } = useQuote();
  const applied = useRef(false);

  useEffect(() => {
    if (!hydrated || applied.current) return;
    applied.current = true;
    if (!hasQuoteQuery(searchParams)) return;

    const template = getTemplate(searchParams.get("template"));
    if (template) {
      hydrateFromState(templateToQuote(template, state.brief), null);
      return;
    }

    if (searchParams.get("custom") === "1" && !searchParams.get("package") && !searchParams.get("features")) {
      hydrateFromState(defaultQuoteState, null);
      return;
    }

    const packageId = searchParams.get("package");
    const pkg = packages.find((item) => item.id === packageId);
    if (pkg && !searchParams.get("features") && !searchParams.get("ui")) {
      hydrateFromState(packageToQuote(pkg), pkg.id);
      return;
    }
    hydrateFromState(quoteFromSearchParams(searchParams), packageId);
  }, [hydrated, searchParams, hydrateFromState, state.brief]);

  return null;
}

"use client";

import { allPricedServices } from "@/lib/pricing-engine";
import { evaluateSanityCases } from "@/lib/pricing-cases";
import { pricingConfig, PRICING_UPDATED_LABEL } from "@/data/pricing-config";
import { pricingSources } from "@/data/pricing-sources";
import { formatMXN } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export function PricingAdmin() {
  const rows = [...allPricedServices()].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  const cases = evaluateSanityCases();
  const missing = rows.filter((row) => row.estimatedHours === 0 && row.finalPrice === 0 && !row.id.endsWith("basic") && row.id !== "extra-source" && row.id !== "design-basic");

  return (
    <div className="grid gap-10">
      <header>
        <p className="text-sm text-primary">Uso interno · noindex</p>
        <h1 className="font-display text-3xl font-semibold">Precios</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          {PRICING_UPDATED_LABEL}. Tarifas: estándar {formatMXN(pricingConfig.hourlyRate.standard)}/h · avanzada{" "}
          {formatMXN(pricingConfig.hourlyRate.advanced)}/h · especialista {formatMXN(pricingConfig.hourlyRate.specialist)}/h.
        </p>
      </header>

      <section>
        <h2 className="font-display text-xl font-semibold">Casos de validación</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2">Caso</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Banda</th>
                <th className="px-3 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-3 py-2">
                    <p className="font-medium">{item.id}. {item.name}</p>
                    <p className="text-muted-foreground text-xs">{item.marketNote}</p>
                  </td>
                  <td className="px-3 py-2 tabular-nums">{formatMXN(item.total)}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {formatMXN(item.expectedBand.min)}–{formatMXN(item.expectedBand.max)}
                  </td>
                  <td className="px-3 py-2">
                    <Badge variant={item.inBand ? "secondary" : "destructive"}>{item.inBand ? "Dentro de banda" : "Revisar"}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {missing.length ? (
        <p className="text-sm text-destructive">Sin horas registradas: {missing.map((item) => item.id).join(", ")}</p>
      ) : (
        <p className="text-muted-foreground text-sm">Todos los servicios del catálogo tienen estimación.</p>
      )}

      <section>
        <h2 className="font-display text-xl font-semibold">Catálogo calculado</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[70rem] text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2">Servicio</th>
                <th className="px-3 py-2">Categoría</th>
                <th className="px-3 py-2">Horas</th>
                <th className="px-3 py-2">Tarifa</th>
                <th className="px-3 py-2">Calculado</th>
                <th className="px-3 py-2">Final</th>
                <th className="px-3 py-2">Complejidad</th>
                <th className="px-3 py-2">Override</th>
                <th className="px-3 py-2">Fuentes</th>
                <th className="px-3 py-2">Revisado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t align-top">
                  <td className="px-3 py-2">
                    <p className="font-medium">{row.name}</p>
                    <p className="text-muted-foreground font-mono text-[11px]">{row.id}</p>
                  </td>
                  <td className="px-3 py-2">{row.category}</td>
                  <td className="px-3 py-2 tabular-nums">{row.estimatedHours}</td>
                  <td className="px-3 py-2 tabular-nums">{formatMXN(row.hourlyRate)}/h</td>
                  <td className="px-3 py-2 tabular-nums">{formatMXN(Math.round(row.calculatedPrice))}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {row.fromPrice ? "Desde " : null}
                    {formatMXN(row.finalPrice)}
                    {row.billingType === "monthly" ? " /mes" : ""}
                  </td>
                  <td className="px-3 py-2">{row.complexity}</td>
                  <td className="px-3 py-2">{row.hasManualOverride ? "Sí" : "—"}</td>
                  <td className="px-3 py-2 font-mono text-[11px]">{row.sourceIds.join(", ")}</td>
                  <td className="px-3 py-2">
                    {row.lastReviewedAt}
                    {row.stale ? <Badge className="ml-2" variant="destructive">Desactualizado</Badge> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">Fuentes</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          {pricingSources.map((source) => (
            <li key={source.id}>
              <a className="text-primary underline-offset-2 hover:underline" href={source.url}>
                {source.name}
              </a>
              <span className="text-muted-foreground"> · {source.accessedAt} · {source.market}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

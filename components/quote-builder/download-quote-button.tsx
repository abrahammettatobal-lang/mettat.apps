"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/providers/quote-provider";
import { formatMXN } from "@/lib/format";
import { formatWeekRange } from "@/lib/pricing-engine";
import { ESTIMATE_DISCLAIMER } from "@/data/pricing-config";
import { getTemplate, TEMPLATE_DISCLAIMER } from "@/data/templates";
import { site } from "@/data/site";

export function DownloadQuoteButton() {
  const { result, quoteId, state } = useQuote();
  const template = getTemplate(state.templateId);

  function download() {
    const issued = new Date().toLocaleDateString("es-MX");
    const rows = result.lineItems
      .filter((item) => item.billingType !== "monthly")
      .map((item) => {
        return `<tr><td>${escapeHtml(item.label)}</td><td style="text-align:right">${formatMXN(item.price)} MXN</td></tr>`;
      })
      .join("");
    const monthly = result.monthlyItems
      .map(
        (item) =>
          `<tr><td>${escapeHtml(item.label)}</td><td style="text-align:right">${formatMXN(item.price)} MXN / mes</td></tr>`,
      )
      .join("");
    const externals = result.externalNotes
      .map((note) => `<li>${escapeHtml(note.name)}: ${escapeHtml(note.summary)}</li>`)
      .join("");
    const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Cotización ${quoteId}</title>
  <style>
    body { font-family: Georgia, serif; color: #1c1917; padding: 48px; max-width: 720px; margin: 0 auto; }
    h1 { font-size: 28px; margin: 0 0 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    td { padding: 8px 0; border-bottom: 1px solid #e7e5e4; }
    .muted { color: #57534e; font-size: 13px; }
    .total { font-size: 28px; margin-top: 8px; }
    th { text-align: left; font-size: 12px; color: #57534e; padding: 8px 0; border-bottom: 1px solid #e7e5e4; }
    .save { color: #0f766e; font-size: 14px; }
  </style>
</head>
<body>
  <p class="muted">${site.name} · ${issued} · ${quoteId}</p>
  <h1>Cotización estimada</h1>
  <p>Tipo: ${escapeHtml(template ? `${template.name} · ${template.styleName}` : (state.projectTypeId ?? "—"))}${template ? "" : ` · Diseño: ${escapeHtml(state.designLevel)}`}</p>
  ${state.brief.trim() ? `<h2>Qué quiere</h2><p>${escapeHtml(state.brief)}</p>` : ""}
  <table>
    <thead><tr><th>Partida</th><th style="text-align:right">Precio</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="total">${formatMXN(result.subtotal)} MXN</p>
  ${result.savings > 0 ? `<p class="save">Paquete: ahorras ${formatMXN(result.savings)} MXN respecto a contratar las piezas por separado</p>` : ""}
  <p class="muted">Tiempo estimado: ${formatWeekRange(result)}</p>
  ${monthly ? `<h2>Mantenimiento</h2><table><tbody>${monthly}</tbody></table>` : ""}
  ${externals ? `<h2>Servicios externos</h2><ul>${externals}</ul>` : ""}
  <p class="muted">${template ? TEMPLATE_DISCLAIMER : ESTIMATE_DISCLAIMER}</p>
  <script>window.onload = () => window.print()</script>
</body>
</html>`;
    const popup = window.open("", "_blank", "noopener,noreferrer");
    if (!popup) return;
    popup.document.write(html);
    popup.document.close();
  }

  return (
    <Button type="button" variant="outline" onClick={download}>
      <Download className="size-4" aria-hidden="true" />
      Descargar cotización
    </Button>
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

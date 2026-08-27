import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/catalog/catalog-explorer";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Explora UI, funcionalidades, integraciones y extras con precios en MXN.",
};

export default function CatalogoPage() {
  return (
    <main id="main-content" className="container-page py-12">
      <h1 className="font-display text-3xl font-semibold">Catálogo</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Cada pieza tiene un precio de desarrollo en MXN, calculado con horas reales y tarifa profesional.
      </p>
      <p className="text-muted-foreground mt-1 text-xs">Precios actualizados: agosto 2026</p>
      <div className="mt-8">
        <CatalogExplorer />
      </div>
    </main>
  );
}

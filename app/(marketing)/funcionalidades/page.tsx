import type { Metadata } from "next";
import { features } from "@/data/features";
import { CatalogExplorer } from "@/components/catalog/catalog-explorer";

export const metadata: Metadata = {
  title: "Funcionalidades",
  description: "Lógica, autenticación, bases de datos, IA, APIs y más.",
};

export default function FuncionalidadesPage() {
  return (
    <main id="main-content" className="container-page py-12">
      <h1 className="font-display text-3xl font-semibold">Lógica y funcionalidades</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Sistemas que puedes sumar al proyecto. Abre el detalle para ver qué incluye cada uno.
      </p>
      <div className="mt-8">
        <CatalogExplorer items={features} />
      </div>
    </main>
  );
}

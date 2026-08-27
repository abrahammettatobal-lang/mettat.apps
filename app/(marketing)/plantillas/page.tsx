import type { Metadata } from "next";
import { howItWorks } from "@/data/templates";
import { DemoShowcase } from "@/components/templates/demo-showcase";
import { BrandLogo } from "@/components/layout/brand-logo";

export const metadata: Metadata = {
  title: "Sugerencias de estilo",
  description:
    "Diez sitios de UI a pantalla completa. Son sugerencias: puedes pedir tu propio estilo por WhatsApp.",
};

export default function PlantillasPage() {
  return (
    <main id="main-content" className="container-page py-12">
      <BrandLogo size="md" />
      <h1 className="font-display mt-6 text-3xl font-semibold md:text-4xl">Sugerencias de estilo</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg leading-relaxed">
        Cada tarjeta es una captura del sitio real. Entra, navega, tócalo. Si quieres otro color u otra onda, lo
        pedimos por WhatsApp.
      </p>

      <ol className="mt-10 mb-12 grid gap-4 md:grid-cols-3">
        {howItWorks.map((step, index) => (
          <li key={step} className="rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-primary">0{index + 1}</p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>

      <DemoShowcase />
    </main>
  );
}

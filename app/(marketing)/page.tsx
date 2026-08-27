import Link from "next/link";
import { howItWorks } from "@/data/templates";
import { DemoShowcase } from "@/components/templates/demo-showcase";
import { HeroTemplates } from "@/components/home/hero-templates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandLogo } from "@/components/layout/brand-logo";

const pills = ["Sitios reales", "Pide el tuyo", "WhatsApp"];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <BrandLogo size="lg" />
          <h1 className="font-display mt-6 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Estilos de UI. Tú pides el tuyo.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg leading-relaxed">
            Entra a un sitio completo. Tócalo como si ya fuera tuyo. Si ninguna onda te queda, pide la tuya por
            WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#sugerencias">Ver sugerencias</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#whatsapp">Escribir por WhatsApp</Link>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <li key={pill}>
                <Badge variant="secondary">{pill}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <HeroTemplates />
      </section>

      <section className="container-page py-16" aria-labelledby="how-heading">
        <h2 id="how-heading" className="font-display text-3xl font-semibold">
          Cómo funciona
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {howItWorks.map((step, index) => (
            <li key={step} className="rounded-2xl border bg-card p-6">
              <p className="text-sm font-medium text-primary">0{index + 1}</p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page py-16" aria-labelledby="sugerencias">
        <h2 id="sugerencias" className="font-display scroll-mt-24 text-3xl font-semibold">
          Sugerencias de estilo
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
          Cada tarjeta muestra el sitio real en miniatura. Abre cualquiera a pantalla completa — son ideas, no un
          catálogo cerrado.
        </p>
        <div className="mt-8">
          <DemoShowcase />
        </div>
      </section>
    </main>
  );
}

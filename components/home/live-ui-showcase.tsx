"use client";

import Link from "next/link";
import { NavbarAnimatedDemo } from "@/components/ui-demos/navbars";
import { HeroProductDemo } from "@/components/ui-demos/heroes";
import { EcommerceKitDemo } from "@/components/ui-demos/ecommerce";
import { Button } from "@/components/ui/button";

const showcases = [
  { title: "Navegación", Demo: NavbarAnimatedDemo },
  { title: "Producto", Demo: HeroProductDemo },
  { title: "Tienda", Demo: EcommerceKitDemo },
];

export function LiveUiShowcase() {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3">
        {showcases.map(({ title, Demo }) => (
          <article key={title} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <p className="text-sm font-medium">{title}</p>
              <p className="text-muted-foreground text-[11px]">Interactiva</p>
            </div>
            <div className="relative h-80 overflow-hidden">
              <Demo />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <Button asChild>
          <Link href="/ui">Abrir catálogo UI</Link>
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { stylePhotos } from "@/data/style-photos";
import { Frame, Photo, Swap } from "@/components/templates/sites/shared";

const items = [
  { id: "casa", name: "Casa Norte", meta: "280 m² · Polanco · 4 recámaras", kind: "Casa", photo: stylePhotos.casa.norte },
  { id: "depto", name: "Depto Alba", meta: "92 m² · Condesa · 2 recámaras", kind: "Depto", photo: stylePhotos.casa.alba },
  { id: "local", name: "Local Centro", meta: "64 m² · Juárez · planta baja", kind: "Local", photo: stylePhotos.casa.centro },
  { id: "lote", name: "Lote Sur", meta: "420 m² · Coyoacán · uso mixto", kind: "Lote", photo: stylePhotos.casa.lote },
];

export function CatalogPlay() {
  const [filter, setFilter] = useState("Todos");
  const [open, setOpen] = useState<string | null>(null);
  const [asked, setAsked] = useState(false);
  const current = items.find((item) => item.id === open);
  const visible = filter === "Todos" ? items : items.filter((item) => item.kind === filter);

  return (
    <Frame className="bg-[#f7f1e6] text-[#3f3426]">
      <header className="flex items-center justify-between border-b border-[#c4a574] px-6 py-4">
        <button
          type="button"
          className="font-display text-xl"
          onClick={() => {
            setOpen(null);
            setAsked(false);
          }}
        >
          Casa Norte
        </button>
        <p className="text-xs tracking-widest text-[#c4a574] uppercase">{current ? "Ficha" : "Propiedades"}</p>
      </header>
      <Swap id={current ? current.id : `list-${filter}`}>
        {current ? (
          <section className="grid flex-1 lg:grid-cols-2">
            <Photo id={current.photo} alt={current.name} className="min-h-80" priority />
            <div className="flex flex-col justify-center p-6 md:p-12">
              <h2 className="font-display text-3xl">{current.name}</h2>
              <p className="mt-2 text-sm text-[#6b5a45]">{current.meta}</p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#6b5a45]">
                Luz de tarde, patio interior y acabados de cantera. Visitas de martes a sábado, con cita.
              </p>
              {asked ? (
                <p className="mt-8 text-sm">Recibimos tu interés. Te confirmamos horario por WhatsApp.</p>
              ) : (
                <button
                  type="button"
                  onClick={() => setAsked(true)}
                  className="mt-8 w-fit bg-[#3f3426] px-5 py-2.5 text-sm text-[#f7f1e6]"
                >
                  Agendar visita
                </button>
              )}
              <button type="button" onClick={() => setOpen(null)} className="mt-4 w-fit text-sm underline underline-offset-4">
                Volver al listado
              </button>
            </div>
          </section>
        ) : (
          <section className="flex-1 p-6 md:p-12">
            <div className="mb-6 flex flex-wrap gap-2">
              {["Todos", "Casa", "Depto", "Local", "Lote"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm",
                    filter === item ? "bg-[#3f3426] text-[#f7f1e6]" : "border border-[#c4a574]/50",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {visible.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setOpen(item.id);
                    setAsked(false);
                  }}
                  className="group overflow-hidden rounded-lg border border-[#c4a574]/40 text-left"
                >
                  <Photo id={item.photo} alt={item.name} className="h-48" />
                  <div className="px-4 py-3">
                    <p className="font-display text-lg">{item.name}</p>
                    <p className="mt-1 text-xs text-[#6b5a45]">{item.meta}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </Swap>
      <footer className="border-t border-[#c4a574]/50 px-6 py-5 text-xs text-[#6b5a45]">Casa Norte Inmobiliaria · Masaryk 201</footer>
    </Frame>
  );
}

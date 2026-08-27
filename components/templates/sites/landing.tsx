"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { stylePhotos } from "@/data/style-photos";
import { Frame, Photo, Rise, Swap } from "@/components/templates/sites/shared";

export function LandingPlay() {
  const pieces = [
    { id: "lamp", title: "Pieza única", copy: "Una lámpara, un plato, un objeto que no se repite.", photo: stylePhotos.atelier.lamp },
    { id: "series", title: "Serie corta", copy: "Doce unidades. Mismo gesto, distinta pátina.", photo: stylePhotos.atelier.copper },
    { id: "order", title: "Encargo", copy: "Medidas, metal y tiempo. Lo hablamos por carta.", photo: stylePhotos.atelier.wood },
  ];
  const [page, setPage] = useState<"inicio" | "oficio" | "escribir">("inicio");
  const [sent, setSent] = useState(false);
  const [piece, setPiece] = useState<(typeof pieces)[number] | null>(null);

  return (
    <Frame className="bg-[#f6efe4] text-[#3b2a1a]">
      <header className="z-10 flex items-center justify-between px-6 py-5 md:px-16">
        <button type="button" className="text-xs tracking-[0.32em] uppercase" onClick={() => setPage("inicio")}>
          Atelier
        </button>
        <nav className="flex gap-1 text-sm">
          {(
            [
              ["inicio", "Inicio"],
              ["oficio", "Oficio"],
              ["escribir", "Escribir"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setPage(id);
                setSent(false);
                setPiece(null);
              }}
              className={cn(
                "rounded-sm px-3 py-1.5 transition",
                page === id ? "bg-[#b45309] text-[#f6efe4]" : "hover:bg-[#ead9c4]",
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
      <Swap id={piece ? piece.id : page}>
        {page === "inicio" ? (
          <section className="grid flex-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-12 md:px-16">
              <Rise>
                <p className="font-display max-w-xl text-5xl leading-[0.92] font-semibold md:text-7xl">Hecho a mano</p>
              </Rise>
              <Rise delay={0.08}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-[#7a5c45]">
                  Objetos de cobre y madera. Encargos desde el taller en Roma Norte, Ciudad de México.
                </p>
              </Rise>
              <Rise delay={0.16}>
                <button
                  type="button"
                  onClick={() => setPage("escribir")}
                  className="mt-10 w-fit rounded-sm bg-[#b45309] px-6 py-3 text-sm text-[#f6efe4] transition hover:bg-[#9a4208]"
                >
                  Escribir al estudio
                </button>
              </Rise>
            </div>
            <button
              type="button"
              className="group relative min-h-80 overflow-hidden lg:min-h-full"
              onClick={() => setPage("oficio")}
              aria-label="Ver oficio"
            >
              <Photo id={stylePhotos.atelier.hero} alt="Cerámica en el taller" className="absolute inset-0 min-h-full" priority />
            </button>
          </section>
        ) : null}
        {page === "oficio" && !piece ? (
          <section className="flex-1 px-6 py-12 md:px-16">
            <p className="text-xs tracking-[0.28em] text-[#b45309] uppercase">Líneas</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {pieces.map((item, index) => (
                <Rise key={item.id} delay={index * 0.08}>
                  <button
                    type="button"
                    onClick={() => setPiece(item)}
                    className="group overflow-hidden rounded-sm border border-[#d7b48a] bg-[#fbf6ee] text-left transition hover:border-[#b45309]"
                  >
                    <Photo id={item.photo} alt={item.title} className="h-52" />
                    <div className="p-5">
                      <p className="font-display text-2xl">{item.title}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#7a5c45]">{item.copy}</p>
                    </div>
                  </button>
                </Rise>
              ))}
            </div>
          </section>
        ) : null}
        {piece ? (
          <section className="grid flex-1 lg:grid-cols-2">
            <Photo id={piece.photo} alt={piece.title} className="min-h-80" />
            <div className="flex flex-col justify-center px-6 py-12 md:px-16">
              <p className="text-xs tracking-[0.28em] text-[#b45309] uppercase">Oficio</p>
              <h2 className="font-display mt-3 text-4xl">{piece.title}</h2>
              <p className="mt-4 max-w-md text-[#7a5c45]">{piece.copy}</p>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  className="bg-[#b45309] px-5 py-2.5 text-sm text-[#f6efe4]"
                  onClick={() => {
                    setPiece(null);
                    setPage("escribir");
                  }}
                >
                  Encargar
                </button>
                <button type="button" className="px-5 py-2.5 text-sm underline" onClick={() => setPiece(null)}>
                  Volver
                </button>
              </div>
            </div>
          </section>
        ) : null}
        {page === "escribir" && !piece ? (
          <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
            {sent ? (
              <Rise>
                <p className="font-display text-3xl">Llegó. Gracias.</p>
                <p className="mt-3 text-sm text-[#7a5c45]">Respondemos en el transcurso de la semana.</p>
              </Rise>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <p className="font-display text-3xl">Escribir</p>
                <label className="grid gap-1 text-sm">
                  Nombre
                  <input className="border-b border-[#b45309] bg-transparent px-1 py-2 outline-none" required />
                </label>
                <label className="grid gap-1 text-sm">
                  Mensaje
                  <textarea className="min-h-24 resize-none border-b border-[#b45309] bg-transparent px-1 py-2 outline-none" required />
                </label>
                <button type="submit" className="mt-2 bg-[#b45309] py-3 text-sm text-[#f6efe4]">
                  Enviar
                </button>
              </form>
            )}
          </section>
        ) : null}
      </Swap>
      <footer className="mt-auto border-t border-[#d7b48a]/60 px-6 py-6 text-xs text-[#7a5c45] md:px-16">
        Atelier · Colima 42, Roma Norte · CDMX
      </footer>
    </Frame>
  );
}

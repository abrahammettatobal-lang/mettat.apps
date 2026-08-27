"use client";

import { useState } from "react";
import { stylePhotos } from "@/data/style-photos";
import { Frame, Photo, Rise, Swap } from "@/components/templates/sites/shared";

const items = [
  {
    title: "Diagnóstico",
    copy: "Dos semanas. Entrevistas, mapa del servicio y una recomendación escrita. Sin implementación.",
  },
  {
    title: "Acompañamiento",
    copy: "Tres meses. Sesiones quincenales con el equipo y ajustes sobre lo que ya opera.",
  },
  {
    title: "Entrega",
    copy: "Un sistema listo: playbooks, tablero y capacitación. Fecha de corte clara.",
  },
];

export function ServicesPlay() {
  const [open, setOpen] = useState(items[0].title);
  const [page, setPage] = useState<"inicio" | "casos" | "contacto">("inicio");
  const [sent, setSent] = useState(false);

  return (
    <Frame className="bg-[#0f2744] text-[#e8eef6]">
      <header className="flex items-center justify-between px-6 py-8 md:px-16">
        <button type="button" onClick={() => setPage("inicio")}>
          <p className="text-xs tracking-[0.25em] text-[#c4a574] uppercase">Estudio Norte</p>
        </button>
        <nav className="flex gap-4 text-sm text-[#c4a574]">
          <button type="button" onClick={() => setPage("casos")}>
            Casos
          </button>
          <button type="button" onClick={() => setPage("contacto")}>
            Contacto
          </button>
        </nav>
      </header>
      <Swap id={page}>
        {page === "inicio" ? (
          <>
            <div className="relative mx-6 h-64 overflow-hidden md:mx-16 md:h-80">
              <Photo id={stylePhotos.norte.hero} alt="Oficina" className="absolute inset-0" priority />
              <div className="absolute inset-0 bg-[#0f2744]/50" />
              <Rise className="absolute inset-0 flex items-end p-6 md:p-10">
                <h1 className="font-display max-w-xl text-4xl md:text-5xl">Tres formas de trabajar</h1>
              </Rise>
            </div>
            <ul className="mt-4 px-6 md:px-16">
              {items.map((item, index) => (
                <li key={item.title} className="border-b border-white/15">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-5 text-left"
                    onClick={() => setOpen(item.title)}
                    aria-expanded={open === item.title}
                  >
                    <span>
                      0{index + 1} {item.title}
                    </span>
                    <span className="text-[#c4a574]">{open === item.title ? "–" : "→"}</span>
                  </button>
                  {open === item.title ? (
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-white/70">{item.copy}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {page === "casos" ? (
          <section className="grid flex-1 gap-0 md:grid-cols-2">
            {[
              [stylePhotos.norte.meeting, "Clínica del Valle", "Rediseño de la operación de citas. De 40 a 12 minutos de espera."],
              [stylePhotos.norte.paper, "Taller Sol", "Playbook de pedidos y un tablero que el dueño sí usa."],
            ].map(([photo, title, copy]) => (
              <button
                key={title}
                type="button"
                className="group relative min-h-72 text-left"
                onClick={() => setPage("contacto")}
              >
                <Photo id={photo} alt={title} className="absolute inset-0" />
                <span className="absolute inset-0 bg-[#0f2744]/40 transition group-hover:bg-[#0f2744]/20" />
                <span className="absolute right-6 bottom-6 left-6">
                  <span className="font-display block text-2xl">{title}</span>
                  <span className="mt-2 block text-sm text-white/80">{copy}</span>
                </span>
              </button>
            ))}
          </section>
        ) : null}
        {page === "contacto" ? (
          <section className="mx-auto w-full max-w-md flex-1 px-6">
            {sent ? (
              <p className="font-display text-3xl">Recibido. Te escribimos esta semana.</p>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <h1 className="font-display text-3xl">Platicar del encargo</h1>
                <label className="grid gap-1 text-sm">
                  Nombre
                  <input className="border-b border-[#c4a574] bg-transparent py-2 outline-none" required />
                </label>
                <label className="grid gap-1 text-sm">
                  Organización
                  <input className="border-b border-[#c4a574] bg-transparent py-2 outline-none" required />
                </label>
                <button type="submit" className="mt-2 bg-[#c4a574] py-3 text-sm text-[#0f2744]">
                  Enviar
                </button>
              </form>
            )}
          </section>
        ) : null}
      </Swap>
      <footer className="mt-auto px-6 py-6 text-xs text-white/40 md:px-16">Estudio Norte · Condesa · CDMX</footer>
    </Frame>
  );
}

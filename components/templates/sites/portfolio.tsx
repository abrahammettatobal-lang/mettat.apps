"use client";

import { useState } from "react";
import { stylePhotos } from "@/data/style-photos";
import { Cover, Frame, Photo } from "@/components/templates/sites/shared";

const works = [
  {
    id: "norte",
    name: "Norte",
    year: "2025",
    copy: "Identidad y sitio para un estudio de arquitectura en Monterrey. Tipografía estrecha, fotos a sangre.",
    photo: stylePhotos.work.norte,
  },
  {
    id: "caja",
    name: "Caja",
    year: "2024",
    copy: "Packaging de café de especialidad. Sello en seco y paleta de un solo verde.",
    photo: stylePhotos.work.caja,
  },
  {
    id: "breve",
    name: "Breve",
    year: "2024",
    copy: "Campaña de tres piezas para una editorial independiente. Impreso y web.",
    photo: stylePhotos.work.breve,
  },
  {
    id: "aula",
    name: "Aula",
    year: "2023",
    copy: "Señalética y materiales para un espacio de talleres en la Doctores.",
    photo: stylePhotos.work.aula,
  },
];

export function PortfolioPlay() {
  const [open, setOpen] = useState<(typeof works)[number] | null>(null);
  const [info, setInfo] = useState(false);

  if (info) {
    return (
      <Frame className="bg-[#111] font-mono text-[#f4f4f0]">
        <Header onIndex={() => setInfo(false)} onInfo={() => setInfo(true)} indexActive={false} />
        <section className="grid min-h-0 flex-1 lg:grid-cols-2">
          <div className="p-8 md:p-16">
            <p className="text-sm text-[#d9f99d]">STUDIO</p>
            <h1 className="mt-4 max-w-xl text-4xl leading-tight md:text-6xl">Diseño gráfico y dirección de arte.</h1>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/70">
              Ciudad de México. Encargos de identidad, editorial y web. Escribe a hola@work.studio
            </p>
          </div>
          <Photo id={stylePhotos.work.portrait} alt="Retrato del estudio" className="min-h-[28rem]" />
        </section>
        <SiteFooter />
      </Frame>
    );
  }

  if (open) {
    return (
      <Frame className="bg-[#111] font-mono text-[#f4f4f0]">
        <Header
          onIndex={() => {
            setOpen(null);
            setInfo(false);
          }}
          onInfo={() => setInfo(true)}
          indexActive={false}
        />
        <section className="grid min-h-0 flex-1 lg:grid-cols-2">
          <Cover id={open.photo} alt={open.name} className="min-h-[50vh]" />
          <div className="flex flex-col justify-center p-8 md:p-16">
            <p className="text-sm text-[#d9f99d]">FILE / {open.year}</p>
            <h2 className="mt-2 text-5xl md:text-7xl">{open.name}</h2>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-white/70">{open.copy}</p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="mt-10 w-fit border-2 border-white px-4 py-2 transition hover:bg-[#d9f99d] hover:text-black"
            >
              Volver al índice
            </button>
          </div>
        </section>
        <SiteFooter />
      </Frame>
    );
  }

  return (
    <Frame className="bg-black font-mono text-white">
      <Header onIndex={() => setOpen(null)} onInfo={() => setInfo(true)} indexActive />
      <section className="grid min-h-0 flex-1 grid-cols-2">
        {works.map((work, index) => (
          <button
            key={work.id}
            type="button"
            onClick={() => setOpen(work)}
            className="group relative min-h-[42vh] overflow-hidden border border-white text-left"
          >
            <Cover id={work.photo} alt={work.name} className="absolute inset-0 min-h-full" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition group-hover:from-black/70" />
            <span className="absolute bottom-3 left-3 text-sm tracking-wide text-white">
              P-0{index + 1}
              <span className="mt-0.5 block text-[11px] text-white/80">
                {work.name} · {work.year}
              </span>
            </span>
          </button>
        ))}
      </section>
      <SiteFooter />
    </Frame>
  );
}

function Header({
  onIndex,
  onInfo,
  indexActive,
}: {
  onIndex: () => void;
  onInfo: () => void;
  indexActive: boolean;
}) {
  return (
    <header className="flex items-center justify-between border-b border-white bg-black px-5 py-3">
      <button type="button" className="text-sm tracking-wide" onClick={onIndex}>
        WORK/
      </button>
      <nav className="flex gap-4 text-xs">
        <button type="button" className={indexActive ? "text-[#d9f99d]" : "text-white"} onClick={onIndex}>
          INDEX
        </button>
        <button type="button" className={!indexActive ? "text-[#d9f99d]" : "text-white"} onClick={onInfo}>
          INFO
        </button>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/20 px-5 py-4 text-[10px] tracking-wide text-white/50">
      WORK/STUDIO · CDMX · 2026
    </footer>
  );
}

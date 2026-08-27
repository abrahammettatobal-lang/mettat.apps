"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { stylePhotos } from "@/data/style-photos";
import { Frame, Photo, Swap } from "@/components/templates/sites/shared";

const groups = {
  Entradas: [
    { dish: "Sopa de chile", price: 95, note: "Caldo de chile guajillo, crema y tostada.", photo: stylePhotos.roja.plate },
    { dish: "Guacamole", price: 80, note: "Aguacate, granada y chicharrón de nopal.", photo: stylePhotos.roja.mole },
  ],
  Platos: [
    { dish: "Mole de olla", price: 180, note: "Res, elote y xoconostle. Se sirve en cazuela.", photo: stylePhotos.roja.mole },
    { dish: "Tacos de suadero", price: 140, note: "Tres piezas. Cebolla, cilantro y salsa de chile de árbol.", photo: stylePhotos.roja.tacos },
  ],
  Postres: [
    { dish: "Flan de café", price: 70, note: "Caramelo oscuro y grano de Coatepec.", photo: stylePhotos.roja.dessert },
    { dish: "Nieve de tuna", price: 55, note: "Hecha en casa. Solo de temporada.", photo: stylePhotos.roja.dessert },
  ],
} as const;

export function MenuPlay() {
  const [tab, setTab] = useState<keyof typeof groups>("Entradas");
  const [order, setOrder] = useState<string[]>([]);
  const [page, setPage] = useState<"carta" | "mesa">("carta");
  const [reserved, setReserved] = useState(false);

  return (
    <Frame className="bg-[#3b1212] text-[#f8ead4]">
      <header className="relative h-56 overflow-hidden md:h-72">
        <Photo id={stylePhotos.roja.room} alt="Comedor de Casa Roja" className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-[#3b1212]/55" />
        <div className="absolute inset-0 flex items-end justify-between px-6 py-8">
          <button type="button" onClick={() => setPage("carta")}>
            <p className="font-display text-4xl italic">La Carta</p>
            <p className="mt-1 text-xs tracking-[0.3em] text-[#e8b4b4] uppercase">Casa Roja</p>
          </button>
          <button
            type="button"
            className="rounded-full border border-[#f8ead4]/50 px-4 py-1.5 text-sm backdrop-blur-sm"
            onClick={() => setPage("mesa")}
          >
            Reservar mesa
          </button>
        </div>
      </header>
      <Swap id={page}>
        {page === "carta" ? (
          <>
            <div className="flex justify-center gap-2 py-6">
              {(Object.keys(groups) as Array<keyof typeof groups>).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm transition",
                    tab === key ? "bg-[#f8ead4] text-[#3b1212]" : "border border-[#e8b4b4]/40",
                  )}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="mx-auto grid w-full max-w-3xl flex-1 gap-4 px-6 pb-8">
              {groups[tab].map((item) => (
                <button
                  key={item.dish}
                  type="button"
                  onClick={() => setOrder((list) => [...list, item.dish])}
                  className="grid grid-cols-[7rem_1fr] overflow-hidden rounded-lg bg-[#4a1818] text-left transition hover:bg-[#551c1c] sm:grid-cols-[9rem_1fr]"
                >
                  <Photo id={item.photo} alt={item.dish} className="h-full min-h-24" />
                  <span className="p-4">
                    <span className="flex items-baseline gap-3 text-lg">
                      <span>{item.dish}</span>
                      <span className="flex-1 border-b border-dotted border-[#e8b4b4]/50" />
                      <span>${item.price}</span>
                    </span>
                    <span className="mt-1 block text-sm text-[#e8b4b4]">{item.note}</span>
                  </span>
                </button>
              ))}
              {order.length ? (
                <p className="text-center text-sm text-[#e8b4b4]">
                  Anotamos {order.join(", ")}. Lo confirmas con el mesero al sentarte.
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <section className="mx-auto w-full max-w-md flex-1 px-6 py-10">
            {reserved ? (
              <p className="font-display text-center text-3xl italic">Mesa apartada. Te esperamos.</p>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setReserved(true);
                }}
              >
                <label className="grid gap-1 text-sm">
                  Nombre
                  <input className="border-b border-[#e8b4b4] bg-transparent py-2 outline-none" required />
                </label>
                <label className="grid gap-1 text-sm">
                  Personas
                  <input type="number" min={1} max={12} defaultValue={2} className="border-b border-[#e8b4b4] bg-transparent py-2 outline-none" />
                </label>
                <label className="grid gap-1 text-sm">
                  Hora
                  <select className="border-b border-[#e8b4b4] bg-transparent py-2 outline-none">
                    <option>13:00</option>
                    <option>14:30</option>
                    <option>20:00</option>
                    <option>21:30</option>
                  </select>
                </label>
                <button type="submit" className="mt-2 bg-[#f8ead4] py-3 text-sm text-[#3b1212]">
                  Confirmar
                </button>
              </form>
            )}
          </section>
        )}
      </Swap>
      <footer className="mt-auto py-6 text-center text-xs text-[#e8b4b4]">Casa Roja · Orizaba 32, Roma Norte · Mar–Dom 13:00–23:00</footer>
    </Frame>
  );
}

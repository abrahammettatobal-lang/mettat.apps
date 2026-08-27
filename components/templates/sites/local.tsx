"use client";

import { useState } from "react";
import { stylePhotos } from "@/data/style-photos";
import { Frame, Photo, Swap } from "@/components/templates/sites/shared";

export function LocalPlay() {
  const [page, setPage] = useState<"inicio" | "servicios" | "horario">("inicio");
  const [ping, setPing] = useState("Taller Sol · Centro");
  const [chat, setChat] = useState<"idle" | "open" | "sent">("idle");
  const [message, setMessage] = useState("");

  return (
    <Frame className="bg-[#eef4ee] text-[#24402c]">
      <header className="flex items-center justify-between px-6 py-5">
        <button type="button" className="flex items-center gap-3" onClick={() => setPage("inicio")}>
          <Photo id={stylePhotos.taller.storefront} alt="" className="size-10 rounded-full" />
          <span>
            <span className="block font-semibold">Taller Sol</span>
            <span className="text-sm text-[#5c7a64]">{ping}</span>
          </span>
        </button>
        <nav className="flex gap-2 text-sm">
          <button type="button" className="rounded-full px-3 py-1.5 transition hover:bg-white" onClick={() => setPage("servicios")}>
            Servicios
          </button>
          <button type="button" className="rounded-full px-3 py-1.5 transition hover:bg-white" onClick={() => setPage("horario")}>
            Horario
          </button>
        </nav>
      </header>
      <Swap id={page}>
        {page === "inicio" ? (
          <>
            <div className="relative mx-6 h-80 overflow-hidden rounded-3xl md:h-[28rem]">
              <Photo id={stylePhotos.taller.map} alt="Mapa del centro" className="absolute inset-0" priority />
              {(
                [
                  ["32%", "38%", "Taller Sol · Centro"],
                  ["64%", "58%", "Bodega · Norte"],
                ] as const
              ).map(([left, top, label]) => (
                <button
                  key={label}
                  type="button"
                  className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c2410c] ring-4 ring-[#c2410c]/30 transition hover:scale-125"
                  style={{ left, top }}
                  onClick={() => setPing(label)}
                  aria-label={label}
                />
              ))}
              <p className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs shadow">{ping}</p>
            </div>
            <div className="flex flex-wrap gap-3 px-6 py-6">
              <button
                type="button"
                onClick={() => setPage("horario")}
                className="rounded-full bg-white px-4 py-2 text-sm shadow-sm"
              >
                Ver horario
              </button>
              <button
                type="button"
                className="rounded-full bg-[#4d7c5a] px-4 py-2 text-sm text-white"
                onClick={() => setChat("open")}
              >
                WhatsApp del local
              </button>
            </div>
          </>
        ) : null}
        {page === "servicios" ? (
          <section className="grid flex-1 gap-3 px-6 py-4 md:grid-cols-2">
            {[
              [stylePhotos.taller.tools, "Afilado", "Cuchillos y herramientas. Entrega el mismo día si dejas antes de las 12."],
              [stylePhotos.taller.wood, "Reparación", "Sillas, mesas y marcos. Presupuesto en taller."],
              [stylePhotos.taller.storefront, "Llaves", "Copia de llaves de casa y candado."],
              [stylePhotos.taller.street, "Encargo", "Piezas de madera a medida. Plazo de una o dos semanas."],
            ].map(([photo, title, copy]) => (
              <article key={title} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <Photo id={photo} alt={title} className="h-40" />
                <div className="p-5">
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c7a64]">{copy}</p>
                </div>
              </article>
            ))}
          </section>
        ) : null}
        {page === "horario" ? (
          <section className="mx-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            <Photo id={stylePhotos.taller.storefront} alt="Fachada" className="h-48" />
            <div className="p-6">
              <h2 className="font-semibold">Horario</h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Lunes a viernes</span>
                  <span>9:00 – 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábado</span>
                  <span>9:00 – 14:00</span>
                </li>
                <li className="flex justify-between text-[#5c7a64]">
                  <span>Domingo</span>
                  <span>Cerrado</span>
                </li>
              </ul>
            </div>
          </section>
        ) : null}
      </Swap>
      {chat !== "idle" ? (
        <div className="mx-6 mb-4 overflow-hidden rounded-3xl bg-white shadow-sm">
          <p className="bg-[#4d7c5a] px-4 py-3 text-sm font-medium text-white">Chat · Taller Sol</p>
          <div className="space-y-2 p-4 text-sm">
            <p className="max-w-[80%] rounded-2xl bg-[#eef4ee] px-3 py-2">Hola, ¿en qué te ayudamos hoy?</p>
            {chat === "sent" ? (
              <p className="ml-auto max-w-[80%] rounded-2xl bg-[#4d7c5a] px-3 py-2 text-white">{message || "¿Afilan cuchillos hoy?"}</p>
            ) : null}
          </div>
          {chat === "sent" ? (
            <p className="px-4 pb-4 text-xs text-[#5c7a64]">Listo, te leemos. Respondemos en el local.</p>
          ) : (
            <form
              className="flex gap-2 p-4 pt-0"
              onSubmit={(event) => {
                event.preventDefault();
                setChat("sent");
              }}
            >
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="flex-1 rounded-full bg-[#eef4ee] px-3 py-2 text-sm outline-none"
                placeholder="Hola, ¿afilan cuchillos hoy?"
                required
              />
              <button type="submit" className="rounded-full bg-[#4d7c5a] px-4 py-2 text-sm text-white">
                Enviar
              </button>
            </form>
          )}
        </div>
      ) : null}
      <footer className="mt-auto px-6 py-5 text-xs text-[#5c7a64]">Taller Sol · República de Chile 18, Centro Histórico</footer>
    </Frame>
  );
}

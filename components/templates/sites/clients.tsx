"use client";

import { useState } from "react";
import { stylePhotos } from "@/data/style-photos";
import { AppLogin, Frame, Photo, Swap } from "@/components/templates/sites/shared";

const seed = [
  { name: "Ana Ruiz", tag: "Clínica", note: "Control el 3 de septiembre. Prefiere llamadas por la mañana.", photo: stylePhotos.cielo.ana },
  { name: "Taller Sol", tag: "PyME", note: "Pedido de etiquetas. Pagan a 15 días.", photo: stylePhotos.cielo.sol },
  { name: "Mar López", tag: "Nota", note: "Interesada en el paquete anual. Seguir el jueves.", photo: stylePhotos.cielo.mar },
];

export function ClientsPlay() {
  const [session, setSession] = useState(false);
  const [people, setPeople] = useState(seed);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [adding, setAdding] = useState(false);
  const filtered = people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
  const current = people.find((person) => person.name === open);

  if (!session) {
    return (
      <AppLogin
        brand="Cielo"
        accent="#0284c7"
        onEnter={() => setSession(true)}
        className="bg-[#e8f4fc]"
        photo={stylePhotos.cielo.ana}
      />
    );
  }

  return (
    <Frame className="bg-[#e8f4fc] text-[#0c4a6e]">
      <header className="flex items-center justify-between px-6 py-5">
        <p className="font-semibold">Cielo</p>
        <div className="flex gap-3 text-sm text-[#0284c7]">
          <button type="button" onClick={() => setAdding(true)}>
            Alta
          </button>
          <button type="button" onClick={() => setSession(false)}>
            Salir
          </button>
        </div>
      </header>
      <Swap id={current ? current.name : adding ? "alta" : "lista"}>
        {adding ? (
          <form
            className="mx-6 grid max-w-md gap-3 rounded-2xl bg-white p-5 shadow-sm"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const name = String(data.get("name"));
              setPeople((list) => [
                { name, tag: "Nota", note: String(data.get("note")), photo: stylePhotos.cielo.mar },
                ...list,
              ]);
              setAdding(false);
            }}
          >
            <p className="font-medium">Nuevo cliente</p>
            <input name="name" required placeholder="Nombre" className="h-10 rounded-lg border px-3 text-sm" />
            <input name="note" placeholder="Nota" className="h-10 rounded-lg border px-3 text-sm" />
            <div className="flex gap-2">
              <button type="submit" className="rounded-lg bg-[#0284c7] px-4 py-2 text-sm text-white">
                Guardar
              </button>
              <button type="button" className="text-sm" onClick={() => setAdding(false)}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 px-6">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar cliente…"
              className="h-11 w-full rounded-full bg-white px-4 text-sm shadow-sm outline-none ring-[#0284c7] focus:ring-2"
            />
            <ul className="mt-4 space-y-2">
              {filtered.map((person) => (
                <li key={person.name}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(person.name === open ? null : person.name);
                      setDraft(person.note);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white px-3 py-3 text-left shadow-sm"
                  >
                    <Photo id={person.photo} alt="" className="size-10 rounded-full" />
                    <span>
                      <span className="block font-medium">{person.name}</span>
                      <span className="text-xs text-[#0284c7]">{person.tag}</span>
                    </span>
                  </button>
                  {open === person.name ? (
                    <form
                      className="px-2 py-3"
                      onSubmit={(event) => {
                        event.preventDefault();
                        setPeople((list) =>
                          list.map((item) => (item.name === person.name ? { ...item, note: draft } : item)),
                        );
                      }}
                    >
                      <textarea
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        className="min-h-20 w-full rounded-xl bg-white p-3 text-sm leading-relaxed text-[#0369a1] outline-none"
                      />
                      <button type="submit" className="mt-2 text-xs font-medium text-[#0284c7]">
                        Guardar nota
                      </button>
                    </form>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Swap>
      <footer className="px-6 py-4 text-xs text-[#0284c7]">{people.length} clientes · solo tú ves esta lista</footer>
    </Frame>
  );
}

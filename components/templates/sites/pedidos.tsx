"use client";

import { useMemo, useState } from "react";
import { stylePhotos } from "@/data/style-photos";
import { AppLogin, Frame, Photo, Swap } from "@/components/templates/sites/shared";

const catalog = [
  { name: "Bolsa lino", price: 240, photo: stylePhotos.mostrador.bag },
  { name: "Vela ámbar", price: 180, photo: stylePhotos.mostrador.candle },
  { name: "Jabón rosa", price: 90, photo: stylePhotos.mostrador.soap },
  { name: "Cuaderno", price: 120, photo: stylePhotos.mostrador.notebook },
];

export function PedidosPlay() {
  const [session, setSession] = useState(false);
  const [page, setPage] = useState<"tienda" | "pedido">("tienda");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [order, setOrder] = useState(false);
  const lines = useMemo(
    () => catalog.filter((item) => (qty[item.name] ?? 0) > 0).map((item) => ({ ...item, count: qty[item.name] })),
    [qty],
  );
  const count = lines.reduce((sum, item) => sum + item.count, 0);
  const total = lines.reduce((sum, item) => sum + item.count * item.price, 0);

  if (!session) {
    return (
      <AppLogin
        brand="Mostrador"
        accent="#f43f5e"
        onEnter={() => setSession(true)}
        className="bg-[#fff1f2]"
        photo={stylePhotos.mostrador.bag}
      />
    );
  }

  function add(name: string, delta: number) {
    setQty((current) => {
      const next = Math.max(0, (current[name] ?? 0) + delta);
      return { ...current, [name]: next };
    });
    setOrder(false);
  }

  return (
    <Frame className="bg-[#fff1f2] text-[#881337]">
      <header className="flex items-center justify-between px-6 py-5">
        <button type="button" className="text-lg font-semibold" onClick={() => setPage("tienda")}>
          Mostrador
        </button>
        <nav className="flex gap-3 text-sm">
          <button type="button" onClick={() => setPage("pedido")}>
            Pedido · {count}
          </button>
          <button type="button" onClick={() => setSession(false)}>
            Salir
          </button>
        </nav>
      </header>
      <Swap id={page}>
        {page === "tienda" ? (
          <div className="grid flex-1 gap-3 px-6 sm:grid-cols-2">
            {catalog.map((item) => (
              <article key={item.name} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <Photo id={item.photo} alt={item.name} className="h-40" />
                <div className="flex items-center gap-3 p-3">
                  <span className="flex-1">
                    <span className="block font-medium">{item.name}</span>
                    <span className="text-sm opacity-70">${item.price}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button type="button" className="size-8 rounded-full bg-[#fff1f2]" onClick={() => add(item.name, -1)}>
                      −
                    </button>
                    <span className="w-4 text-center text-sm">{qty[item.name] ?? 0}</span>
                    <button type="button" className="size-8 rounded-full bg-[#f43f5e] text-white" onClick={() => add(item.name, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="flex-1 px-6">
            {order ? (
              <p className="text-lg font-semibold">Pedido enviado al taller. Pagas al recoger o por transferencia.</p>
            ) : lines.length === 0 ? (
              <p className="text-sm opacity-70">El pedido está vacío. Vuelve a la tienda.</p>
            ) : (
              <>
                <ul className="space-y-2">
                  {lines.map((item) => (
                    <li key={item.name} className="flex items-center gap-3 rounded-xl bg-white p-2 text-sm">
                      <Photo id={item.photo} alt="" className="size-12 rounded-lg" />
                      <span className="flex-1">
                        {item.name} × {item.count}
                      </span>
                      <span>${item.count * item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-semibold">Total ${total}</p>
                <button
                  type="button"
                  onClick={() => setOrder(true)}
                  className="mt-4 rounded-full bg-[#f43f5e] px-5 py-2 text-sm text-white"
                >
                  Enviar pedido
                </button>
              </>
            )}
          </section>
        )}
      </Swap>
      <div className="mt-auto flex items-center justify-between bg-[#f43f5e] px-6 py-4 text-white">
        <span>
          {count} en carrito · ${total}
        </span>
        <button
          type="button"
          onClick={() => {
            setQty({});
            setOrder(false);
            setPage("tienda");
          }}
          className="rounded-full bg-white/20 px-3 py-1 text-sm"
        >
          Vaciar
        </button>
      </div>
    </Frame>
  );
}

"use client";

import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { stylePhotos } from "@/data/style-photos";
import { AppLogin, Frame, Photo, Swap } from "@/components/templates/sites/shared";

const chart = [
  { d: "L", v: 12 },
  { d: "M", v: 18 },
  { d: "M", v: 14 },
  { d: "J", v: 22 },
  { d: "V", v: 19 },
  { d: "S", v: 9 },
  { d: "D", v: 4 },
];

const rows = [
  { id: "12", label: "Pedido 12", status: "Abierto", detail: "Cliente: Ana Ruiz. Falta factura." },
  { id: "84", label: "Pedido 84", status: "Hoy", detail: "Entrega en Condesa a las 16:00." },
  { id: "3", label: "Pedido 3", status: "Alerta", detail: "Pago vencido. Hablar mañana." },
];

export function PanelPlay() {
  const [session, setSession] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [open, setOpen] = useState<string | null>(null);
  const visible = filter === "Todos" ? rows : rows.filter((row) => row.status === filter);
  const current = rows.find((row) => row.id === open);

  if (!session) {
    return (
      <AppLogin
        brand="Nexo"
        accent="#34d399"
        onEnter={() => setSession(true)}
        className="bg-[#05080c]"
        photo={stylePhotos.nexo.warehouse}
      />
    );
  }

  return (
    <Frame className="bg-[#05080c] text-[#e2e8f0]">
      <header className="flex items-center justify-between px-6 py-5">
        <p className="font-semibold tracking-wide">NEXO</p>
        <button type="button" className="text-sm text-[#34d399]" onClick={() => setSession(false)}>
          Salir
        </button>
      </header>
      <div className="grid gap-3 px-6 sm:grid-cols-3">
        {[
          ["Abiertos", "12"],
          ["Hoy", "4"],
          ["Alertas", "1"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 px-4 py-4">
            <p className="text-xs text-white/50">{label}</p>
            <p className="mt-1 font-mono text-2xl text-[#34d399]">{value}</p>
          </div>
        ))}
      </div>
      <div className="mx-6 mt-4 h-36 overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chart}>
            <Area type="monotone" dataKey="v" stroke="#34d399" fill="#34d399" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 flex flex-wrap gap-2 px-6">
        {["Todos", "Abierto", "Hoy", "Alerta"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setFilter(item);
              setOpen(null);
            }}
            className={cn(
              "rounded-lg border border-white/10 px-3 py-2 text-sm",
              filter === item && "border-[#34d399] text-[#34d399]",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <Swap id={current ? current.id : filter}>
        <div className="mx-6 mt-4 flex-1 overflow-hidden rounded-xl border border-white/10">
          {current ? (
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <Photo id={stylePhotos.nexo.warehouse} alt="" className="h-40 rounded-lg" />
              <div>
                <p className="text-[#34d399]">{current.status}</p>
                <h2 className="mt-1 text-xl">{current.label}</h2>
                <p className="mt-4 text-sm text-white/70">{current.detail}</p>
                <button type="button" className="mt-6 text-sm underline" onClick={() => setOpen(null)}>
                  Volver a la tabla
                </button>
              </div>
            </div>
          ) : (
            visible.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => setOpen(row.id)}
                className="flex w-full items-center justify-between border-b border-white/10 px-4 py-3 text-left last:border-0 hover:bg-white/5"
              >
                <span>{row.label}</span>
                <span className="text-[#34d399]">{row.status}</span>
              </button>
            ))
          )}
        </div>
      </Swap>
    </Frame>
  );
}

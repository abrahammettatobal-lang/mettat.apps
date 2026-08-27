"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Bell, LayoutDashboard, Search, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DemoAvatar, DemoMark, DemoShell } from "@/components/ui-demos/frame";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";

const week = [
  { name: "Lun", value: 12 },
  { name: "Mar", value: 18 },
  { name: "Mié", value: 14 },
  { name: "Jue", value: 22 },
  { name: "Vie", value: 28 },
  { name: "Sáb", value: 16 },
  { name: "Dom", value: 11 },
];

const month = [
  { name: "S1", value: 42 },
  { name: "S2", value: 51 },
  { name: "S3", value: 48 },
  { name: "S4", value: 61 },
];

const people = [
  { name: "Ana Lira", role: "Admin", status: "Activa" },
  { name: "Iván Mora", role: "Editor", status: "Activo" },
  { name: "Sofía Ríos", role: "Invitada", status: "Pendiente" },
];

type View = "home" | "team" | "alerts" | "settings";

export function DashboardKitDemo() {
  const [view, setView] = useState<View>("home");
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [selected, setSelected] = useState("Ana Lira");
  const [query, setQuery] = useState("");
  const [unread, setUnread] = useState([
    { id: "1", title: "Pago recibido", copy: "Caja Clara · $8,400 MXN" },
    { id: "2", title: "Nuevo comentario", copy: "Norte · Ana en el brief" },
    { id: "3", title: "Invitación", copy: "Sofía aún no acepta" },
  ]);
  const [weekly, setWeekly] = useState(true);
  const [compact, setCompact] = useState(false);
  const data = range === "7d" ? week : month;
  const revenue = range === "7d" ? 84200 : 241000;

  const nav = useMemo(
    () =>
      [
        ["home", LayoutDashboard, "Resumen"],
        ["team", Users, "Equipo"],
        ["alerts", Bell, "Avisos"],
        ["settings", Settings, "Ajustes"],
      ] as const,
    [],
  );

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <DemoShell className="min-h-[420px]">
      <div className="grid min-h-[420px] grid-cols-[64px_1fr] sm:grid-cols-[92px_1fr]">
        <aside className="flex flex-col items-center gap-2 border-r py-4">
          <DemoMark className="mb-2 scale-90" />
          {nav.map(([id, Icon, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => setView(id)}
              className={cn(
                "flex w-[76px] flex-col items-center gap-1 rounded-xl py-2 text-[10px]",
                view === id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={view === id ? "page" : undefined}
              aria-label={label}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </aside>
        <div className={cn("min-w-0 p-3", compact && "p-2")}>
          {view === "home" ? (
            <div className="grid gap-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">Resumen</p>
                  <p className="text-muted-foreground text-[11px]">Atelier · operación en vivo</p>
                </div>
                <div className="flex gap-1">
                  {(["7d", "30d"] as const).map((item) => (
                    <Button
                      key={item}
                      size="xs"
                      type="button"
                      variant={range === item ? "default" : "outline"}
                      onClick={() => setRange(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Ingresos", formatMXN(revenue)],
                  ["Sesiones", range === "7d" ? "8.2k" : "24.1k"],
                  ["Conversión", range === "7d" ? "3.4%" : "3.1%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border p-2 text-left">
                    <p className="text-muted-foreground text-[10px]">{label}</p>
                    <p className="text-sm font-semibold tabular-nums">{value}</p>
                  </div>
                ))}
              </div>
              <div className="h-36 rounded-xl border p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <Tooltip
                      formatter={(value) => [`${value}`, "Actividad"]}
                      labelStyle={{ fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--primary)" fill="var(--accent)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : null}
          {view === "team" ? (
            <div className="grid gap-3">
              <div className="relative">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar persona"
                  className="h-8 pl-7 text-xs"
                  aria-label="Buscar persona"
                />
              </div>
              <table className="w-full text-left text-xs">
                <caption className="sr-only">Equipo</caption>
                <thead>
                  <tr className="text-muted-foreground">
                    <th scope="col" className="pb-2 font-medium">
                      Persona
                    </th>
                    <th scope="col" className="pb-2 font-medium">
                      Rol
                    </th>
                    <th scope="col" className="pb-2 font-medium">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPeople.map((user) => (
                    <tr
                      key={user.name}
                      className={cn("cursor-pointer border-t", selected === user.name && "bg-accent/50")}
                    >
                      <td className="py-2">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-left"
                          onClick={() => setSelected(user.name)}
                        >
                          <DemoAvatar name={user.name} size="sm" />
                          {user.name}
                        </button>
                      </td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPeople.length === 0 ? (
                <p className="text-muted-foreground text-xs">Nadie coincide con “{query}”.</p>
              ) : (
                <p className="text-muted-foreground text-[11px]">Seleccionado: {selected}</p>
              )}
            </div>
          ) : null}
          {view === "alerts" ? (
            <ul className="grid gap-2">
              {unread.length === 0 ? (
                <li className="text-muted-foreground rounded-xl border px-3 py-6 text-center text-sm">
                  Sin avisos nuevos.
                </li>
              ) : null}
              {unread.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full rounded-xl border px-3 py-2 text-left text-sm hover:bg-accent"
                    onClick={() => setUnread((list) => list.filter((entry) => entry.id !== item.id))}
                  >
                    {item.title}
                    <span className="text-muted-foreground mt-0.5 block text-xs">{item.copy}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {view === "settings" ? (
            <div className="grid gap-2 text-sm">
              <label className="flex items-center justify-between rounded-xl border p-3">
                Resúmenes del viernes
                <Switch checked={weekly} onCheckedChange={setWeekly} aria-label="Resúmenes del viernes" />
              </label>
              <label className="flex items-center justify-between rounded-xl border p-3">
                Modo compacto
                <Switch checked={compact} onCheckedChange={setCompact} aria-label="Modo compacto" />
              </label>
              <p className="text-muted-foreground px-1 text-xs">
                {weekly ? "Te avisamos cada viernes." : "Sin digest."} {compact ? "Vista densa." : "Vista cómoda."}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </DemoShell>
  );
}

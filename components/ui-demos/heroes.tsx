"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DemoShell, useDemoInView } from "@/components/ui-demos/frame";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";

export function HeroMinimalDemo() {
  const [mode, setMode] = useState<"estudio" | "producto">("estudio");
  return (
    <DemoShell className="flex min-h-[380px] flex-col items-center justify-center gap-5 px-6 py-10 text-center">
      <div className="flex rounded-full bg-muted p-1 text-xs">
        {(["estudio", "producto"] as const).map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setMode(item)}
            className={cn("rounded-full px-3 py-1 capitalize", mode === item && "bg-background shadow-sm")}
          >
            {item}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <h3 className="font-display text-3xl font-semibold tracking-tight">
            {mode === "estudio" ? "Menos interfaz. Más producto." : "Una pieza. Un mensaje."}
          </h3>
          <p className="text-muted-foreground mx-auto mt-3 max-w-sm text-sm">
            {mode === "estudio"
              ? "Hero que respira: titular, una idea, dos acciones."
              : "Cambia el interruptor: el copy se reescribe sin recargar."}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2">
        <Button size="sm">{mode === "estudio" ? "Ver trabajo" : "Comprar pieza"}</Button>
        <Button size="sm" variant="outline">
          Brief
        </Button>
      </div>
    </DemoShell>
  );
}

const teams = [
  { name: "Ventas", value: 86 },
  { name: "Ops", value: 104 },
  { name: "Design", value: 128 },
];

export function HeroSaasDemo() {
  const { ref, inView } = useDemoInView();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [metric, setMetric] = useState(128);
  const [team, setTeam] = useState("Design");

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setMetric((n) => n + (Math.random() > 0.55 ? 1 : 0)), 1600);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <DemoShell>
      <div ref={ref} className="grid min-h-[380px] items-center gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs font-medium text-primary">Lista de espera · cupos limitados</p>
          <h3 className="font-display text-2xl font-semibold">Opera el equipo en un solo tablero.</h3>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.includes("@")) {
                setError("Usa un correo válido.");
                return;
              }
              setError("");
              setDone(true);
            }}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tú@estudio.com"
              aria-label="Correo"
              type="email"
            />
            <Button type="submit" size="sm" disabled={done}>
              {done ? "Listo" : "Unirme"}
            </Button>
          </form>
          {error ? <p className="text-destructive text-xs">{error}</p> : null}
          {done ? <p className="text-xs text-primary">Te avisamos al abrir cupos.</p> : null}
          <p className="text-muted-foreground text-[11px]">Usado por estudios en CDMX, GDL y MTY.</p>
        </div>
        <div className="rounded-2xl border bg-card p-4 shadow-sm">
          <p className="text-muted-foreground text-xs">Equipos activos · {team}</p>
          <p className="font-display text-3xl tabular-nums">{metric}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {teams.map((item) => (
              <button
                type="button"
                key={item.name}
                className={cn(
                  "rounded-xl bg-muted px-2 py-3 text-left text-xs hover:bg-accent",
                  team === item.name && "ring-2 ring-primary/30",
                )}
                onClick={() => {
                  setTeam(item.name);
                  setMetric(item.value);
                }}
              >
                {item.name}
                <span className="mt-1 block font-medium tabular-nums">{item.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

const colors = [
  { id: "ink", label: "Tinta", className: "bg-stone-800", ring: "ring-stone-800" },
  { id: "sand", label: "Arena", className: "bg-amber-200", ring: "ring-amber-400" },
  { id: "pine", label: "Pino", className: "bg-teal-800", ring: "ring-teal-800" },
];

export function HeroProductDemo() {
  const [color, setColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState(false);

  return (
    <DemoShell>
      <div className="grid min-h-[380px] items-center gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-wide uppercase">Auriculares Nube</p>
          <h3 className="font-display text-2xl font-semibold">Se olvidan de estar ahí.</h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>24 h de batería</li>
            <li>Cancelación adaptativa</li>
            <li>Estuche de viaje incluido</li>
          </ul>
          <div className="flex gap-2" role="radiogroup" aria-label="Color">
            {colors.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-label={item.label}
                aria-checked={color.id === item.id}
                role="radio"
                onClick={() => setColor(item)}
                className={cn(
                  "size-7 rounded-full ring-offset-2 ring-offset-background",
                  item.className,
                  color.id === item.id && "ring-2 ring-primary",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border">
              <button
                type="button"
                className="px-2.5 py-1 text-sm"
                aria-label="Menos"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
              >
                −
              </button>
              <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
              <button
                type="button"
                className="px-2.5 py-1 text-sm"
                aria-label="Más"
                onClick={() => setQty((n) => n + 1)}
              >
                +
              </button>
            </div>
            <Button size="sm" type="button" onClick={() => setCart(true)}>
              {cart
                ? `En el carrito · ${qty} ${color.label}`
                : `Añadir · ${formatMXN(2480 * qty)}`}
            </Button>
          </div>
        </div>
        <div className="grid h-44 place-items-center rounded-3xl bg-muted">
          <motion.div
            key={color.id}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "relative size-28 rounded-full shadow-[inset_-18px_-12px_28px_rgba(0,0,0,0.25)]",
              color.className,
            )}
          >
            <span className="absolute top-5 left-7 size-6 rounded-full bg-white/25 blur-[2px]" />
          </motion.div>
        </div>
      </div>
    </DemoShell>
  );
}

const rotating = ["producto", "tablero", "tienda", "sistema"];

export function HeroAnimatedDemo() {
  const { ref, inView } = useDemoInView();
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setCount((n) => (n >= 48 ? 48 : n + 2)), 70);
    return () => window.clearInterval(id);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setWord((n) => (n + 1) % rotating.length), 2200);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <DemoShell tone="studio">
      <div ref={ref} className="relative min-h-[380px] overflow-hidden px-6 py-10">
        <motion.div
          className="bg-primary/20 pointer-events-none absolute -top-10 left-10 size-44 rounded-full blur-3xl"
          animate={inView ? { x: [0, 20, 0], y: [0, 12, 0] } : undefined}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-muted-foreground relative text-sm">De idea a</p>
        <h3 className="font-display relative text-3xl font-semibold">
          <AnimatePresence mode="wait">
            <motion.span
              key={rotating[word]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-primary inline-block"
            >
              {rotating[word]}
            </motion.span>
          </AnimatePresence>
          <span className="block">sin el trimestre de por medio.</span>
        </h3>
        <div className="relative mt-8 flex gap-8">
          <div>
            <p className="font-display text-4xl font-semibold tabular-nums text-primary">{count}</p>
            <p className="text-muted-foreground text-xs">piezas en el catálogo</p>
          </div>
          <div>
            <p className="font-display text-4xl font-semibold tabular-nums">4</p>
            <p className="text-muted-foreground text-xs">paquetes listos</p>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

export function HeroVideoDemo() {
  const { ref, inView } = useDemoInView();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(18);
  const chapters = [
    { t: 0, label: "Apertura" },
    { t: 35, label: "Oficio" },
    { t: 72, label: "Cierre" },
  ];

  useEffect(() => {
    if (!playing || !inView) return;
    const id = window.setInterval(() => setProgress((n) => (n >= 100 ? 0 : n + 1)), 120);
    return () => window.clearInterval(id);
  }, [playing, inView]);

  return (
    <DemoShell tone="ink">
      <div ref={ref} className="relative min-h-[380px] overflow-hidden">
        <div
          className="absolute inset-0 bg-[length:220%_220%] bg-gradient-to-br from-teal-800 via-stone-900 to-amber-800"
          style={{ animation: playing && inView ? "demo-pan 10s linear infinite" : "none" }}
        />
        <style>{`@keyframes demo-pan { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }`}</style>
        <div className="relative flex min-h-[380px] flex-col justify-end bg-black/40 p-5 text-white">
          <p className="text-[11px] tracking-wide uppercase text-white/70">Reel 2026</p>
          <h3 className="font-display text-2xl font-semibold">Historias que se ven.</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chapters.map((chapter) => (
              <button
                type="button"
                key={chapter.label}
                className={cn(
                  "rounded-full border border-white/25 px-2 py-0.5 text-[11px]",
                  progress >= chapter.t && progress < chapter.t + 34 && "bg-white text-stone-900",
                )}
                onClick={() => setProgress(chapter.t)}
              >
                {chapter.label}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" variant="secondary" type="button" onClick={() => setPlaying((v) => !v)}>
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {playing ? "Pausar" : "Play"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              type="button"
              aria-label={muted ? "Activar sonido" : "Silenciar"}
              onClick={() => setMuted((v) => !v)}
            >
              {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            </Button>
            <button
              type="button"
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25"
              aria-label="Progreso"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setProgress(Math.round(((event.clientX - rect.left) / rect.width) * 100));
              }}
            >
              <div className="h-full bg-white" style={{ width: `${progress}%` }} />
            </button>
            <span className="w-8 text-right text-[11px] tabular-nums">{progress}%</span>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

const screens = [
  {
    name: "Hoy",
    kpis: [
      ["Cobrado", "$84k"],
      ["Pendiente", "$12k"],
    ],
  },
  {
    name: "Equipo",
    kpis: [
      ["Activos", "12"],
      ["Invitados", "3"],
    ],
  },
  {
    name: "Cobros",
    kpis: [
      ["Stripe", "61%"],
      ["MP", "39%"],
    ],
  },
] as const;

export function HeroMockupDemo() {
  const [screen, setScreen] = useState(0);
  const current = screens[screen];
  return (
    <DemoShell>
      <div className="grid min-h-[380px] items-center gap-6 p-6 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-semibold">Tu app, en la mesa del cliente.</h3>
          <p className="text-muted-foreground mt-2 text-sm">Toca el mockup o elige una pantalla.</p>
          <div className="mt-4 flex gap-2">
            {screens.map((item, i) => (
              <Button
                key={item.name}
                size="sm"
                variant={screen === i ? "default" : "outline"}
                type="button"
                onClick={() => setScreen(i)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
        <motion.button
          type="button"
          onClick={() => setScreen((n) => (n + 1) % screens.length)}
          className="origin-center rotate-3 rounded-2xl border bg-card p-4 text-left shadow-lg"
          whileTap={{ scale: 0.98, rotate: 2 }}
          aria-label="Cambiar pantalla del mockup"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="h-2 w-16 rounded-full bg-muted" />
            <span className="text-xs font-medium">{current.name}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="grid grid-cols-2 gap-2"
            >
              {current.kpis.map(([label, value]) => (
                <div key={label} className="rounded-xl bg-muted p-3">
                  <p className="text-muted-foreground text-[10px]">{label}</p>
                  <p className="mt-2 font-display text-lg">{value}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </DemoShell>
  );
}

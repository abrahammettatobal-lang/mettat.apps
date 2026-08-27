"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, MessageCircle, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DemoAvatar, DemoShell } from "@/components/ui-demos/frame";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CardPricingDemo() {
  const [yearly, setYearly] = useState(false);
  const [plan, setPlan] = useState("Pro");
  const plans = [
    { name: "Base", month: 190, year: 152, perks: ["1 asiento", "Sitio", "Soporte correo"] },
    { name: "Pro", month: 490, year: 392, perks: ["5 asientos", "App", "Prioridad"] },
    { name: "Studio", month: 890, year: 712, perks: ["Ilimitado", "SaaS", "Canal directo"] },
  ];

  return (
    <DemoShell className="p-4">
      <div className="mb-4 flex justify-center">
        <div className="flex rounded-full bg-muted p-1 text-xs">
          <button
            type="button"
            className={cn("rounded-full px-3 py-1", !yearly && "bg-background shadow-sm")}
            onClick={() => setYearly(false)}
          >
            Mensual
          </button>
          <button
            type="button"
            className={cn("rounded-full px-3 py-1", yearly && "bg-background shadow-sm")}
            onClick={() => setYearly(true)}
          >
            Anual −20%
          </button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {plans.map((item) => {
          const price = yearly ? item.year : item.month;
          const selected = plan === item.name;
          return (
            <button
              type="button"
              key={item.name}
              onClick={() => setPlan(item.name)}
              className={cn(
                "rounded-2xl border p-3 text-left transition hover:-translate-y-0.5",
                selected && "border-primary ring-2 ring-primary/20",
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.name}</p>
                {item.name === "Pro" ? <Badge>Popular</Badge> : null}
              </div>
              <p className="font-display mt-1 text-2xl tabular-nums">
                {formatMXN(price)}
                <span className="text-muted-foreground text-xs font-normal"> /mes</span>
              </p>
              <ul className="text-muted-foreground mt-2 space-y-1 text-xs">
                {item.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-1.5">
                    <Check className="size-3 text-primary" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      <p className="text-muted-foreground mt-3 text-center text-xs">
        Plan {plan} {yearly ? "anual" : "mensual"} listo para contratar.
      </p>
    </DemoShell>
  );
}

const productViews = ["from-amber-100 to-stone-300", "from-stone-200 to-amber-50", "from-orange-100 to-stone-400"];

export function CardProductDemo() {
  const [view, setView] = useState(0);
  const [count, setCount] = useState(0);
  const [loved, setLoved] = useState(false);
  const [rating, setRating] = useState(5);

  return (
    <DemoShell className="p-4">
      <div className="overflow-hidden rounded-2xl border">
        <div className={cn("relative h-36 bg-gradient-to-br transition-all", productViews[view])}>
          <button
            type="button"
            className="absolute top-3 right-3 rounded-full bg-background/90 p-2"
            aria-label="Wishlist"
            aria-pressed={loved}
            onClick={() => setLoved((v) => !v)}
          >
            <Heart className={cn("size-4", loved && "fill-current text-destructive")} />
          </button>
          <div className="absolute bottom-3 left-3 flex gap-1">
            {productViews.map((_, i) => (
              <button
                type="button"
                key={i}
                aria-label={`Vista ${i + 1}`}
                onClick={() => setView(i)}
                className={cn("size-2 rounded-full bg-white/50", view === i && "bg-white")}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Lámpara Nube</p>
            <span className="tabular-nums">{formatMXN(1280)}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                type="button"
                key={i}
                aria-label={`${i + 1} estrellas`}
                onClick={() => setRating(i + 1)}
              >
                <Star className={cn("size-3.5", i < rating ? "fill-current" : "text-muted-foreground")} />
              </button>
            ))}
            <span className="text-muted-foreground ml-1 text-xs">{rating}.0</span>
          </div>
          <Button size="sm" className="w-full" type="button" onClick={() => setCount((n) => n + 1)}>
            {count ? `Añadida ×${count}` : "Añadir al carrito"}
          </Button>
        </div>
      </div>
    </DemoShell>
  );
}

export function CardFeatureDemo() {
  const [open, setOpen] = useState("Rápido");
  const items = [
    { title: "Rápido", icon: Zap, copy: "Lighthouse alto, imágenes y split de código." },
    { title: "Claro", icon: Star, copy: "Jerarquía, no decoración. Un acento, no un arcoíris." },
    { title: "Sólido", icon: Check, copy: "Estados, errores y teclado. Se siente hecho." },
  ];

  return (
    <DemoShell className="grid min-h-[380px] content-center gap-3 p-4 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        const active = open === item.title;
        return (
          <button
            type="button"
            key={item.title}
            onClick={() => setOpen(item.title)}
            className={cn(
              "rounded-2xl border p-4 text-left transition",
              active && "border-primary bg-accent/40",
            )}
          >
            <Icon className="size-4 text-primary" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium">{item.title}</p>
            <AnimatePresence>
              {active ? (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="text-muted-foreground mt-2 text-xs"
                >
                  {item.copy}
                </motion.p>
              ) : (
                <p className="text-muted-foreground mt-2 text-xs">Toca para leer</p>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </DemoShell>
  );
}

export function CardUserDemo() {
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(184);
  const [msg, setMsg] = useState(false);

  return (
    <DemoShell className="grid min-h-[380px] place-items-center p-4">
      <div className="w-full max-w-sm rounded-2xl border p-4">
        <div className="flex items-center gap-3">
          <DemoAvatar name="Ana Lira" size="lg" />
          <div className="flex-1">
            <p className="font-medium">Ana Lira</p>
            <p className="text-muted-foreground text-xs">Product designer · CDMX</p>
          </div>
        </div>
        <p className="text-muted-foreground mt-3 text-sm">
          Sistemas de diseño y productos que se pueden vender.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <p className="font-display text-base tabular-nums">{followers}</p>
            <p className="text-muted-foreground">seguidores</p>
          </div>
          <div>
            <p className="font-display text-base tabular-nums">36</p>
            <p className="text-muted-foreground">piezas</p>
          </div>
          <div>
            <p className="font-display text-base tabular-nums">12</p>
            <p className="text-muted-foreground">clientes</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            variant={following ? "secondary" : "default"}
            type="button"
            onClick={() => {
              setFollowing((v) => !v);
              setFollowers((n) => (following ? n - 1 : n + 1));
            }}
          >
            {following ? "Siguiendo" : "Seguir"}
          </Button>
          <Button size="sm" variant="outline" type="button" onClick={() => setMsg(true)}>
            <MessageCircle className="size-4" />
            {msg ? "Enviado" : "Mensaje"}
          </Button>
        </div>
      </div>
    </DemoShell>
  );
}

export function CardDashboardDemo() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [metric, setMetric] = useState<"mrr" | "churn">("mrr");
  const mrr = range === "7d" ? 84 : 91;
  const bars = useMemo(
    () => (range === "7d" ? [8, 12, 9, 16, 14, 18, 22] : [10, 11, 14, 13, 17, 19, 21, 18, 20, 24]),
    [range],
  );

  return (
    <DemoShell className="p-4">
      <div className="mb-3 flex gap-2">
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
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setMetric("mrr")}
          className={cn(
            "rounded-2xl border p-4 text-left",
            metric === "mrr" && "border-primary ring-2 ring-primary/15",
          )}
        >
          <p className="text-muted-foreground text-xs">MRR</p>
          <p className="font-display text-2xl">{formatMXN(mrr * 1000)}</p>
          <p className="text-xs text-primary">+12%</p>
          <div className="mt-3 flex h-10 items-end gap-1">
            {bars.map((value, i) => (
              <motion.div
                key={`${range}-${i}`}
                className="bg-primary/70 flex-1 rounded-sm"
                initial={{ height: 4 }}
                animate={{ height: value * 2 }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>
        </button>
        <button
          type="button"
          onClick={() => setMetric("churn")}
          className={cn(
            "rounded-2xl border p-4 text-left",
            metric === "churn" && "border-primary ring-2 ring-primary/15",
          )}
        >
          <p className="text-muted-foreground text-xs">Churn</p>
          <p className="font-display text-2xl">{range === "7d" ? "1.8%" : "1.5%"}</p>
          <p className="text-xs text-primary">−0.4%</p>
          <p className="text-muted-foreground mt-6 text-xs">
            {metric === "churn" ? "Menos baja en el periodo largo." : "Toca para ver churn."}
          </p>
        </button>
      </div>
    </DemoShell>
  );
}

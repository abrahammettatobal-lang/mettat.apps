"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function useDemoInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "64px", threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function DemoShell({
  children,
  className,
  tone = "paper",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "ink" | "studio";
}) {
  return (
    <div
      className={cn(
        "relative isolate min-h-[380px] overflow-hidden",
        tone === "paper" && "bg-background",
        tone === "ink" && "bg-stone-950 text-stone-50",
        tone === "studio" && "demo-mesh bg-background",
        className,
      )}
    >
      <div
        className="demo-grain pointer-events-none absolute inset-0 z-0 opacity-[0.18] mix-blend-multiply dark:opacity-[0.28] dark:mix-blend-overlay"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function DemoMark({
  className,
  name = "Atelier",
  light = false,
}: {
  className?: string;
  name?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-display text-sm font-semibold tracking-tight",
        light && "text-white",
        className,
      )}
    >
      <span
        className={cn("size-2 rounded-full", light ? "bg-white" : "bg-primary")}
        aria-hidden="true"
      />
      {name}
    </span>
  );
}

const avatarTones = [
  "bg-[#c4b5a0] text-[#3f2e1f]",
  "bg-[#7d9a92] text-[#14241f]",
  "bg-[#c17f59] text-[#2a140c]",
  "bg-[#8fa3b8] text-[#15202b]",
  "bg-[#d4c4a8] text-[#3a2f1c]",
];

export function DemoAvatar({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const tone = avatarTones[name.length % avatarTones.length];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-medium",
        size === "sm" && "size-7 text-[10px]",
        size === "md" && "size-10 text-xs",
        size === "lg" && "size-12 text-sm",
        tone,
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function DemoToast({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="absolute inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-xl border bg-card/95 px-3 py-2 text-xs shadow-lg backdrop-blur"
    >
      <p>{message}</p>
      <button type="button" className="text-muted-foreground hover:text-foreground" onClick={onDismiss}>
        Cerrar
      </button>
    </div>
  );
}

export const demoPages = {
  Inicio: {
    kicker: "Estudio",
    title: "Un estudio de producto. Poco ruido, mucho criterio.",
    copy: "Diseñamos interfaces que se pueden vender, operar y mantener.",
  },
  Servicios: {
    kicker: "Oficio",
    title: "Diseño, desarrollo y sistemas que se pueden operar.",
    copy: "De la primera pantalla al tablero que usa el equipo todos los días.",
  },
  Proyectos: {
    kicker: "Archivo",
    title: "Norte, Caja Clara, Mercado Breve, Aula Viva.",
    copy: "Cuatro productos reales, cuatro maneras distintas de verse.",
  },
  Estudio: {
    kicker: "Equipo",
    title: "Trabajamos con equipos que ya saben lo que no quieren.",
    copy: "Menos reuniones, más prototipos que se pueden tocar.",
  },
} as const;

export const demoWorks = [
  { id: "norte", name: "Norte", kind: "SaaS", city: "CDMX", tone: "from-teal-800 to-stone-800" },
  { id: "caja", name: "Caja Clara", kind: "Finanzas", city: "GDL", tone: "from-amber-200 to-stone-400" },
  { id: "breve", name: "Mercado Breve", kind: "Tienda", city: "MTY", tone: "from-orange-200 to-stone-500" },
  { id: "aula", name: "Aula Viva", kind: "Educación", city: "QRO", tone: "from-sky-200 to-stone-400" },
] as const;

export const demoPeople = [
  { name: "Ana Lira", role: "Dirección de producto", city: "CDMX" },
  { name: "Iván Mora", role: "Ingeniería", city: "GDL" },
  { name: "Sofía Ríos", role: "Diseño", city: "MTY" },
] as const;

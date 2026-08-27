"use client";

import { type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { unsplashSrc } from "@/data/style-photos";
import { useEmbedded } from "@/components/templates/embed-context";

export function Frame({ className, children }: { className?: string; children: ReactNode }) {
  const embedded = useEmbedded();
  return (
    <div className={cn("relative flex min-h-dvh flex-col", !embedded && "pb-24", className)}>{children}</div>
  );
}

export function Cover({
  id,
  alt = "",
  className,
  children,
  priority = false,
}: {
  id: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
  priority?: boolean;
}) {
  const src = unsplashSrc(id);
  return (
    <div
      className={cn("relative overflow-hidden bg-neutral-800 bg-cover bg-center", className)}
      style={{ backgroundImage: `url("${src}")` }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        loading={priority ? "eager" : "lazy"}
      />
      {children}
    </div>
  );
}

export function Photo({
  id,
  alt,
  className,
  priority = false,
}: {
  id: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return <Cover id={id} alt={alt} className={className} priority={priority} />;
}

export function Swap({ id, children }: { id: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        className="flex min-h-0 flex-1 flex-col"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function Rise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AppLogin({
  brand,
  accent,
  onEnter,
  className,
  photo,
}: {
  brand: string;
  accent: string;
  onEnter: () => void;
  className?: string;
  photo?: string;
}) {
  return (
    <Frame className={className}>
      {photo ? (
        <>
          <Cover id={photo} className="absolute inset-0" priority />
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : null}
      <form
        className="relative z-10 m-auto grid w-full max-w-sm gap-4 rounded-2xl bg-white/95 p-6 text-neutral-900 shadow-2xl backdrop-blur-sm"
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          onEnter();
        }}
      >
        <p className="text-lg font-semibold">{brand}</p>
        <p className="text-sm text-neutral-500">Entra con tu correo de trabajo.</p>
        <label className="grid gap-1 text-sm">
          Correo
          <input type="email" defaultValue="ana@estudio.mx" className="h-10 rounded-lg border px-3" required />
        </label>
        <label className="grid gap-1 text-sm">
          Contraseña
          <input type="password" defaultValue="••••••••" className="h-10 rounded-lg border px-3" required />
        </label>
        <button
          type="submit"
          className="mt-1 h-11 rounded-lg text-sm text-white transition hover:brightness-110"
          style={{ background: accent }}
        >
          Entrar
        </button>
      </form>
    </Frame>
  );
}

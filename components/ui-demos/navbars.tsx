"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LayoutGrid,
  Menu,
  Search,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DemoAvatar,
  DemoMark,
  DemoShell,
  DemoToast,
  demoPages,
  demoWorks,
} from "@/components/ui-demos/frame";
import { cn } from "@/lib/utils";

const links = Object.keys(demoPages) as (keyof typeof demoPages)[];

const mega = [
  {
    title: "Sitios",
    copy: "Landing y webs de negocio",
    icon: Sparkles,
    items: ["Promocional", "Estudio", "Evento"],
  },
  {
    title: "Productos",
    copy: "Apps con cuentas y datos",
    icon: LayoutGrid,
    items: ["SaaS", "Dashboard", "Interno"],
  },
  {
    title: "Sistemas",
    copy: "Operación y cobros",
    icon: Wallet,
    items: ["Admin", "Pagos", "IA"],
  },
];

export function NavbarBasicDemo() {
  const searchId = useId();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<(typeof links)[number]>("Inicio");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const content = demoPages[page];
  const hits = [...links, ...demoWorks.map((work) => work.name)].filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <DemoShell>
      <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <DemoMark />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Demo">
          {links.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => setPage(link)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                page === link
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={page === link ? "page" : undefined}
            >
              {link}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Buscar"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((value) => !value)}
          >
            <Search className="size-4" />
          </Button>
          <button
            type="button"
            className="hidden rounded-full sm:block"
            aria-label="Cuenta"
            aria-expanded={menu}
            onClick={() => setMenu((value) => !value)}
          >
            <DemoAvatar name="Ana Lira" size="sm" />
          </button>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="md:hidden"
            aria-label="Menú"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </header>
      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b"
          >
            <div className="p-3">
              <LabelledSearch id={searchId} value={query} onChange={setQuery} />
              <ul className="mt-2 grid gap-1">
                {(query ? hits : links).map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent"
                      onClick={() => {
                        if (links.includes(item as (typeof links)[number])) {
                          setPage(item as (typeof links)[number]);
                        }
                        setSearchOpen(false);
                        setQuery("");
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {open ? (
        <div className="grid gap-1 border-b p-3 md:hidden">
          {links.map((link) => (
            <button
              type="button"
              key={link}
              className="rounded-lg px-2 py-2 text-left text-sm hover:bg-accent"
              onClick={() => {
                setPage(link);
                setOpen(false);
              }}
            >
              {link}
            </button>
          ))}
        </div>
      ) : null}
      {menu ? (
        <div className="absolute top-14 right-3 z-20 w-52 rounded-xl border bg-card p-2 shadow-lg">
          <p className="text-muted-foreground px-2 py-1 text-[11px]">Ana Lira</p>
          {["Perfil", "Facturación", "Cerrar sesión"].map((item) => (
            <button
              type="button"
              key={item}
              className="w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent"
              onClick={() => {
                setMenu(false);
                setToast(item === "Cerrar sesión" ? "Sesión de demo cerrada." : `${item} · demo`);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <AnimatePresence mode="wait">
        <motion.section
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="p-5"
        >
          <p className="text-xs font-medium tracking-wide text-primary uppercase">{content.kicker}</p>
          <h3 className="font-display mt-1 max-w-md text-xl font-semibold">{content.title}</h3>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">{content.copy}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {demoWorks.slice(0, 4).map((work) => (
              <button
                type="button"
                key={work.id}
                className="overflow-hidden rounded-xl border text-left"
                onClick={() => setToast(`${work.name} · ${work.kind}`)}
              >
                <div className={cn("h-14 bg-gradient-to-br", work.tone)} />
                <div className="px-2.5 py-2">
                  <p className="text-xs font-medium">{work.name}</p>
                  <p className="text-muted-foreground text-[10px]">
                    {work.kind} · {work.city}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>
      <DemoToast message={toast} onDismiss={() => setToast(null)} />
    </DemoShell>
  );
}

function LabelledSearch({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        Buscar sección
      </label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar sección o proyecto…"
        autoFocus
      />
    </>
  );
}

export function NavbarFloatingDemo() {
  const [page, setPage] = useState<(typeof links)[number]>("Inicio");
  const [elevated, setElevated] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  return (
    <DemoShell tone="studio">
      <div className="p-3">
        <div
          className={cn(
            "mx-auto flex max-w-xl items-center justify-between rounded-full border bg-background/75 px-3 py-2 backdrop-blur-md transition-shadow duration-300",
            elevated && "shadow-lg ring-1 ring-black/5",
          )}
        >
          <DemoMark />
          <nav className="hidden gap-1 md:flex">
            {links.slice(0, 3).map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => setPage(link)}
                className={cn("rounded-full px-2.5 py-1 text-xs", page === link && "bg-accent")}
              >
                {link}
              </button>
            ))}
          </nav>
          <Button size="sm" className="rounded-full" type="button" onClick={() => setBooked(false)}>
            Reservar
          </Button>
        </div>
      </div>
      <div
        className="h-72 overflow-y-auto px-6 pb-8"
        onScroll={(event) => setElevated(event.currentTarget.scrollTop > 8)}
      >
        <h3 className="font-display text-2xl font-semibold">Un estudio que cabe en una píldora.</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Desplaza: la barra gana sombra. Estás en {page}.
        </p>
        <div className="mt-4 grid gap-2">
          {["Mesa de trabajo · jueves 10:00", "Prototipo · viernes 16:30", "Lanzamiento · lunes 9:00"].map(
            (item) => (
              <button
                type="button"
                key={item}
                onClick={() => setSlot(item)}
                className={cn(
                  "rounded-xl border bg-card/80 px-4 py-3 text-left text-sm backdrop-blur hover:border-primary",
                  slot === item && "border-primary ring-2 ring-primary/20",
                )}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <Button
          className="mt-4"
          type="button"
          disabled={!slot}
          onClick={() => setBooked(true)}
        >
          {booked ? "Reservado" : "Confirmar hueco"}
        </Button>
        {booked && slot ? (
          <p className="mt-2 text-xs text-primary">Listo: {slot}</p>
        ) : null}
        <div className="mt-8 h-24 rounded-2xl border bg-card/50" />
      </div>
    </DemoShell>
  );
}

const looks = [
  { id: "lino", name: "Lino", tone: "from-stone-200 via-amber-100 to-stone-400" },
  { id: "tinta", name: "Tinta", tone: "from-stone-900 via-teal-950 to-stone-800" },
  { id: "arcilla", name: "Arcilla", tone: "from-orange-300 via-stone-400 to-amber-800" },
];

export function NavbarTransparentDemo() {
  const [solid, setSolid] = useState(false);
  const [look, setLook] = useState(looks[0]);
  const [booked, setBooked] = useState(false);

  return (
    <DemoShell tone="ink" className="text-white">
      <div className={cn("absolute inset-0 bg-gradient-to-br", look.tone)} />
      <header
        className={cn(
          "relative z-10 flex items-center justify-between px-4 py-3 transition-colors duration-300",
          solid && "bg-black/55 backdrop-blur-md",
        )}
      >
        <DemoMark name="Lumen" light />
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-white/80 sm:inline">Lookbook</span>
          <Button size="sm" variant="secondary" type="button" onClick={() => setBooked(true)}>
            {booked ? "Reservado" : "Agendar"}
          </Button>
        </div>
      </header>
      <div
        className="relative z-10 h-72 overflow-y-auto px-5 pb-10"
        onScroll={(event) => setSolid(event.currentTarget.scrollTop > 20)}
      >
        <p className="mt-8 max-w-sm font-display text-2xl font-semibold leading-tight">
          Luz que se siente, no que se explica.
        </p>
        <p className="mt-3 max-w-sm text-sm text-white/75">
          Desplaza para solidificar la barra. Elige un look y agenda.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {looks.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setLook(item)}
              className={cn(
                "h-20 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br",
                item.tone,
                look.id === item.id && "ring-2 ring-white",
              )}
              aria-pressed={look.id === item.id}
              aria-label={item.name}
            >
              <span className="mt-12 block px-2 text-left text-[11px] font-medium">{item.name}</span>
            </button>
          ))}
        </div>
        {booked ? (
          <p className="mt-4 text-xs text-white/80">Sesión {look.name} anotada en el lookbook.</p>
        ) : null}
        <div className="mt-10 h-28 rounded-2xl border border-white/15 bg-white/5" />
      </div>
    </DemoShell>
  );
}

export function NavbarMegaDemo() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("Sitios · Estudio");

  return (
    <DemoShell>
      <header className="flex items-center gap-5 border-b px-4 py-3">
        <DemoMark />
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          Productos{" "}
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        </button>
        <button type="button" className="text-muted-foreground hidden text-sm md:inline">
          Precios
        </button>
        <span className="text-muted-foreground ml-auto hidden text-xs sm:inline">CDMX · remoto</span>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid gap-3 border-b bg-card/95 p-4 sm:grid-cols-3"
          >
            {mega.map((col) => (
              <div key={col.title}>
                <p className="flex items-center gap-2 text-sm font-medium">
                  <col.icon className="size-3.5 text-primary" aria-hidden="true" />
                  {col.title}
                </p>
                <p className="text-muted-foreground mb-2 text-xs">{col.copy}</p>
                {col.items.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className="block w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent"
                    onClick={() => {
                      setPicked(`${col.title} · ${item}`);
                      setOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <section className="p-6">
        <p className="text-muted-foreground text-xs">Seleccionado</p>
        <h3 className="font-display mt-1 text-xl font-semibold">{picked}</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Abre Productos: tres columnas con oficio, no un menú plano.
        </p>
        <div className="mt-4 h-28 overflow-hidden rounded-2xl border">
          <div
            className={cn(
              "h-full bg-gradient-to-br",
              picked.includes("Pagos")
                ? "from-amber-200 to-stone-500"
                : picked.includes("IA")
                  ? "from-teal-800 to-stone-900"
                  : "from-stone-200 to-teal-900",
            )}
          />
        </div>
      </section>
    </DemoShell>
  );
}

export function NavbarAnimatedDemo() {
  const pillId = useId();
  const [active, setActive] = useState<(typeof links)[number]>("Inicio");
  const [alerts, setAlerts] = useState([
    "Brief de Norte listo para revisar",
    "Caja Clara publicó una nueva versión",
  ]);
  const [openAlerts, setOpenAlerts] = useState(false);
  const content = demoPages[active];

  return (
    <DemoShell className="p-4">
      <div className="flex items-center justify-between gap-3">
        <DemoMark />
        <nav className="relative flex rounded-full bg-muted p-1">
          {links.map((link) => (
            <button type="button" key={link} onClick={() => setActive(link)} className="relative z-10 px-3 py-1.5 text-xs">
              {active === link ? (
                <motion.span
                  layoutId={`nav-pill-${pillId.replaceAll(":", "")}`}
                  className="absolute inset-0 rounded-full bg-background shadow-sm"
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span className="relative">{link}</span>
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="relative rounded-full border p-1.5"
          aria-label="Notificaciones"
          aria-expanded={openAlerts}
          onClick={() => setOpenAlerts((value) => !value)}
        >
          <Bell className="size-4" />
          {alerts.length ? (
            <span className="bg-copper absolute -top-1 -right-1 grid size-4 place-items-center rounded-full text-[9px] text-white">
              {alerts.length}
            </span>
          ) : null}
        </button>
      </div>
      {openAlerts ? (
        <div className="mt-3 rounded-xl border bg-card p-2 shadow-sm">
          {alerts.length === 0 ? (
            <p className="text-muted-foreground px-2 py-3 text-xs">Sin avisos.</p>
          ) : (
            alerts.map((item) => (
              <button
                type="button"
                key={item}
                className="w-full rounded-lg px-2 py-2 text-left text-xs hover:bg-accent"
                onClick={() => setAlerts((list) => list.filter((entry) => entry !== item))}
              >
                {item}
                <span className="text-muted-foreground mt-0.5 block">Marcar como leído</span>
              </button>
            ))
          )}
        </div>
      ) : null}
      <AnimatePresence mode="wait">
        <motion.section
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          <p className="text-xs font-medium tracking-wide text-primary uppercase">{content.kicker}</p>
          <h3 className="font-display mt-1 text-2xl font-semibold">{active}</h3>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">{content.copy}</p>
        </motion.section>
      </AnimatePresence>
    </DemoShell>
  );
}

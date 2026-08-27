"use client";

import { useMemo, useState } from "react";
import { Heart, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DemoMark, DemoShell } from "@/components/ui-demos/frame";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  price: number;
  cat: string;
  city: string;
  tone: string;
};

const products: Product[] = [
  { id: "1", name: "Silla Alba", price: 2400, cat: "Muebles", city: "CDMX", tone: "from-stone-200 to-stone-500" },
  { id: "2", name: "Lámpara Nube", price: 1280, cat: "Iluminación", city: "GDL", tone: "from-amber-100 to-orange-300" },
  { id: "3", name: "Mesa Baja", price: 3100, cat: "Muebles", city: "MTY", tone: "from-teal-100 to-stone-400" },
  { id: "4", name: "Jarrón Arcilla", price: 540, cat: "Decoración", city: "OAX", tone: "from-orange-200 to-stone-400" },
  { id: "5", name: "Lino Norte", price: 890, cat: "Decoración", city: "QRO", tone: "from-stone-100 to-teal-200" },
  { id: "6", name: "Foco Cobre", price: 760, cat: "Iluminación", city: "CDMX", tone: "from-amber-200 to-stone-700" },
];

export function EcommerceKitDemo() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todos");
  const [sort, setSort] = useState<"az" | "price">("az");
  const [cart, setCart] = useState<{ id: string; qty: number; finish: string }[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [finish, setFinish] = useState("Arena");
  const [paid, setPaid] = useState(false);

  const filtered = useMemo(() => {
    const list = products.filter((item) => {
      const matchQuery = `${item.name} ${item.city}`.toLowerCase().includes(query.toLowerCase());
      const matchCat = cat === "Todos" || item.cat === cat;
      return matchQuery && matchCat;
    });
    return [...list].sort((a, b) => (sort === "az" ? a.name.localeCompare(b.name, "es") : a.price - b.price));
  }, [query, cat, sort]);

  const selected = products.find((item) => item.id === open);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);

  function add(id: string) {
    setPaid(false);
    setCart((lines) => {
      const found = lines.find((line) => line.id === id);
      if (found) return lines.map((line) => (line.id === id ? { ...line, qty: line.qty + 1, finish } : line));
      return [...lines, { id, qty: 1, finish }];
    });
    setDrawer(true);
  }

  function setQty(id: string, qty: number) {
    if (qty < 1) {
      setCart((lines) => lines.filter((line) => line.id !== id));
      return;
    }
    setCart((lines) => lines.map((line) => (line.id === id ? { ...line, qty } : line)));
  }

  return (
    <DemoShell className="relative min-h-[420px]">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <DemoMark name="Breve" />
        <Button type="button" size="sm" variant="outline" aria-label="Carrito" onClick={() => setDrawer(true)}>
          <ShoppingBag className="size-3.5" /> {count}
        </Button>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en Breve"
              className="h-8 pl-7 text-xs"
              aria-label="Buscar productos"
            />
          </div>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-1">
          {["Todos", "Muebles", "Iluminación", "Decoración"].map((name) => (
            <Button
              key={name}
              type="button"
              size="xs"
              variant={cat === name ? "default" : "outline"}
              onClick={() => setCat(name)}
            >
              {name}
            </Button>
          ))}
          <Button type="button" size="xs" variant="ghost" onClick={() => setSort((s) => (s === "az" ? "price" : "az"))}>
            {sort === "az" ? "A–Z" : "Precio"}
          </Button>
        </div>
        {selected ? (
          <div className="rounded-2xl border p-4">
            <div className={cn("mb-3 h-28 rounded-xl bg-gradient-to-br", selected.tone)} />
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{selected.name}</p>
                <p className="text-muted-foreground text-xs">
                  {selected.cat} · hecho en {selected.city}
                </p>
              </div>
              <p className="font-display text-lg tabular-nums">{formatMXN(selected.price)}</p>
            </div>
            <div className="mt-3 flex gap-2">
              {["Arena", "Tinta", "Pino"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setFinish(item)}
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[11px]",
                    finish === item && "border-primary bg-accent",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" type="button" onClick={() => add(selected.id)}>
                Añadir · {finish}
              </Button>
              <Button size="sm" variant="outline" type="button" onClick={() => setOpen(null)}>
                Volver
              </Button>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground rounded-xl border px-3 py-8 text-center text-sm">
            Nada coincide. Prueba otra categoría.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {filtered.map((item) => (
              <div key={item.id} className="rounded-xl border p-2">
                <button type="button" className="w-full text-left" onClick={() => setOpen(item.id)}>
                  <div className={cn("mb-2 h-16 rounded-lg bg-gradient-to-br", item.tone)} />
                  <p className="text-xs font-medium">{item.name}</p>
                  <p className="text-xs tabular-nums">{formatMXN(item.price)}</p>
                </button>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="mt-1"
                  aria-label="Wishlist"
                  aria-pressed={wish.includes(item.id)}
                  onClick={() =>
                    setWish((list) =>
                      list.includes(item.id) ? list.filter((id) => id !== item.id) : [...list, item.id],
                    )
                  }
                >
                  <Heart className={cn("size-3.5", wish.includes(item.id) && "fill-current text-destructive")} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {drawer ? (
        <div className="absolute inset-0 z-20 flex justify-end bg-black/30">
          <div className="flex h-full w-72 flex-col overflow-y-auto bg-background p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Carrito</p>
              <Button type="button" size="icon-xs" variant="ghost" aria-label="Cerrar carrito" onClick={() => setDrawer(false)}>
                <X className="size-4" />
              </Button>
            </div>
            {paid ? (
              <p className="text-sm text-primary">Pedido de demo confirmado. Nada se cobró.</p>
            ) : null}
            {cart.length === 0 && !paid ? <p className="text-muted-foreground text-sm">Vacío. Añade una pieza.</p> : null}
            {cart.map((line) => {
              const product = products.find((item) => item.id === line.id);
              if (!product) return null;
              return (
                <div key={line.id} className="mb-3 flex items-start justify-between gap-2 text-sm">
                  <div>
                    <p>{product.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {line.finish} · {formatMXN(product.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button type="button" size="icon-xs" variant="outline" aria-label="Menos" onClick={() => setQty(line.id, line.qty - 1)}>
                      <Minus className="size-3" />
                    </Button>
                    <span className="w-4 text-center text-xs tabular-nums">{line.qty}</span>
                    <Button type="button" size="icon-xs" variant="outline" aria-label="Más" onClick={() => setQty(line.id, line.qty + 1)}>
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
            <p className="font-display mt-auto text-xl tabular-nums">{formatMXN(total)}</p>
            <Button
              className="mt-3 w-full"
              type="button"
              disabled={cart.length === 0}
              onClick={() => {
                setCart([]);
                setPaid(true);
              }}
            >
              Pagar demo
            </Button>
          </div>
        </div>
      ) : null}
    </DemoShell>
  );
}

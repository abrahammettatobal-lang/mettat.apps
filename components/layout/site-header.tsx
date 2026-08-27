"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/plantillas", label: "Sugerencias" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappHref = pathname === "/" || pathname.startsWith("/plantillas") ? "#whatsapp" : "/plantillas#whatsapp";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="Metta T. Apps">
          <BrandLogo size="sm" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const current = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  current
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link href={whatsappHref}>WhatsApp</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menú"
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" id="mobile-nav" className="w-72">
              <SheetHeader>
                <SheetTitle className="sr-only">Navegación</SheetTitle>
                <BrandLogo size="sm" />
              </SheetHeader>
              <nav aria-label="Móvil" className="mt-6 grid gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href={whatsappHref} onClick={() => setOpen(false)}>
                    WhatsApp
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

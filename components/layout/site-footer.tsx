import Link from "next/link";
import { site } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/layout/brand-logo";

const footerLinks = [{ href: "/plantillas", label: "Sugerencias" }];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandLogo size="lg" />
          <p className="text-muted-foreground mt-3 max-w-sm text-sm">{site.description}</p>
        </div>
        <nav aria-label="Pie de página">
          <p className="mb-3 text-sm font-medium">Navegación</p>
          <ul className="grid gap-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-sm font-medium">WhatsApp</p>
          <ul className="text-muted-foreground grid gap-2 text-sm">
            <li>
              <a
                href={whatsappUrl("Hola, quiero una página o app.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <p className="container-page text-muted-foreground py-4 text-xs">© {year} {site.name}.</p>
      </div>
    </footer>
  );
}

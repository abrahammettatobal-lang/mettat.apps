"use client";

import { LandingPlay } from "@/components/templates/sites/landing";
import { PortfolioPlay } from "@/components/templates/sites/portfolio";
import { LocalPlay } from "@/components/templates/sites/local";
import { ServicesPlay } from "@/components/templates/sites/services";
import { MenuPlay } from "@/components/templates/sites/menu";
import { CatalogPlay } from "@/components/templates/sites/catalog";
import { ClientsPlay } from "@/components/templates/sites/clients";
import { ReservasPlay } from "@/components/templates/sites/reservas";
import { PanelPlay } from "@/components/templates/sites/panel";
import { PedidosPlay } from "@/components/templates/sites/pedidos";

/** Sitios a pantalla completa. Las fotos viven en /public/styles. */
export function StylePlayground({ id }: { id: string }) {
  switch (id) {
    case "tpl-landing":
      return <LandingPlay />;
    case "tpl-portafolio":
      return <PortfolioPlay />;
    case "tpl-local":
      return <LocalPlay />;
    case "tpl-servicios":
      return <ServicesPlay />;
    case "tpl-menu":
      return <MenuPlay />;
    case "tpl-catalogo":
      return <CatalogPlay />;
    case "tpl-clientes":
      return <ClientsPlay />;
    case "tpl-reservas":
      return <ReservasPlay />;
    case "tpl-panel":
      return <PanelPlay />;
    case "tpl-pedidos":
      return <PedidosPlay />;
    default:
      return <p className="grid min-h-dvh place-items-center">Página no encontrada.</p>;
  }
}

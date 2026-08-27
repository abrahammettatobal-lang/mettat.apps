import type { ProjectTypeId, QuoteState } from "@/types/catalog";

export type TemplateKind = "website" | "app";

export interface SiteTemplate {
  id: string;
  name: string;
  kind: TemplateKind;
  price: number;
  description: string;
  pages: string[];
  includes: string[];
  deliveryLabel: string;
  estimatedHours: number;
  weeksMin: number;
  weeksMax: number;
  icon: string;
  highlight?: boolean;
  projectTypeId: ProjectTypeId;
  /** Nombre del look. */
  styleName: string;
  /** Marca ficticia del sitio en /ui/[slug]. */
  brand: string;
  /** Color de acento (hex). */
  accent: string;
}

export const howItWorks = [
  "Abre una sugerencia: es un sitio de verdad, en su propia URL.",
  "Si el estilo no es el tuyo, pide otro: color, onda, layout.",
  "Escríbeme por WhatsApp qué quieres que sea la página o la app.",
];

export const styleSuggestionNote =
  "Estas páginas son sugerencias de estilo. Si ninguna te queda, pide la tuya.";

/**
 * Producto actual: plantillas como punto de partida de UI.
 * Web: 1,700–2,300 MXN. Apps: 3,000–6,000 MXN.
 */
export const templates: SiteTemplate[] = [
  {
    id: "tpl-landing",
    name: "Landing de negocio",
    kind: "website",
    price: 1_700,
    description: "Una página para presentarte y que te escriban. Ideal para lanzar rápido.",
    pages: ["Inicio", "Servicios", "Contacto"],
    includes: ["Hero", "Tres bloques de servicios", "Formulario o WhatsApp", "SEO básico"],
    deliveryLabel: "3–7 días",
    estimatedHours: 10,
    weeksMin: 1,
    weeksMax: 1,
    icon: "PanelTop",
    projectTypeId: "landing",
    styleName: "Editorial cobre",
    brand: "Atelier",
    accent: "#b45309",
  },
  {
    id: "tpl-portafolio",
    name: "Portafolio",
    kind: "website",
    price: 1_800,
    description: "Muestra tu trabajo en una grilla clara, con una página de contacto.",
    pages: ["Inicio", "Trabajos", "Sobre mí", "Contacto"],
    includes: ["Galería", "Ficha de proyecto", "Enlaces a redes", "SEO básico"],
    deliveryLabel: "3–7 días",
    estimatedHours: 11,
    weeksMin: 1,
    weeksMax: 1,
    icon: "LayoutGrid",
    projectTypeId: "website",
    styleName: "Galería tinta",
    brand: "WORK/",
    accent: "#d9f99d",
  },
  {
    id: "tpl-local",
    name: "Negocio local",
    kind: "website",
    price: 1_900,
    description: "Horario, mapa y contacto para un local, consultorio o taller.",
    pages: ["Inicio", "Servicios", "Ubicación", "Contacto"],
    includes: ["Horarios", "Mapa embebido", "WhatsApp", "SEO local básico"],
    deliveryLabel: "3–7 días",
    estimatedHours: 12,
    weeksMin: 1,
    weeksMax: 1,
    icon: "MapPinned",
    projectTypeId: "website",
    styleName: "Barrio salvia",
    brand: "Taller Sol",
    accent: "#4d7c5a",
  },
  {
    id: "tpl-servicios",
    name: "Sitio de servicios",
    kind: "website",
    price: 2_100,
    description: "Varias secciones para explicar qué ofreces y pedir una cotización.",
    pages: ["Inicio", "Servicios", "Nosotros", "Contacto"],
    includes: ["Hasta 4 servicios", "Formulario", "Testimonios", "SEO básico"],
    deliveryLabel: "4–8 días",
    estimatedHours: 13,
    weeksMin: 1,
    weeksMax: 2,
    icon: "AppWindow",
    highlight: true,
    projectTypeId: "website",
    styleName: "Estudio marino",
    brand: "Estudio Norte",
    accent: "#1e3a5f",
  },
  {
    id: "tpl-menu",
    name: "Menú / restaurante",
    kind: "website",
    price: 2_200,
    description: "Carta en línea con categorías, fotos y botón a WhatsApp.",
    pages: ["Inicio", "Menú", "Nosotros", "Contacto"],
    includes: ["Categorías de platillos", "Fotos", "Horario", "Pedido por WhatsApp"],
    deliveryLabel: "4–8 días",
    estimatedHours: 13,
    weeksMin: 1,
    weeksMax: 2,
    icon: "Store",
    projectTypeId: "website",
    styleName: "Carta vino",
    brand: "Casa Roja",
    accent: "#7f1d1d",
  },
  {
    id: "tpl-catalogo",
    name: "Catálogo simple",
    kind: "website",
    price: 2_300,
    description: "Listado de productos o inmuebles con ficha y contacto. Sin pagos en línea.",
    pages: ["Inicio", "Catálogo", "Ficha", "Contacto"],
    includes: ["Hasta 20 ítems", "Filtro por categoría", "Ficha con fotos", "WhatsApp"],
    deliveryLabel: "4–8 días",
    estimatedHours: 14,
    weeksMin: 1,
    weeksMax: 2,
    icon: "ShoppingBag",
    projectTypeId: "website",
    styleName: "Arena y oro",
    brand: "Casa Norte",
    accent: "#c4a574",
  },
  {
    id: "tpl-clientes",
    name: "Agenda de clientes",
    kind: "app",
    price: 3_000,
    description: "Lista de clientes con datos de contacto y notas. Un usuario.",
    pages: ["Login", "Clientes", "Detalle", "Notas"],
    includes: ["Acceso con contraseña", "Alta y búsqueda", "Notas", "Un rol"],
    deliveryLabel: "1–2 semanas",
    estimatedHours: 18,
    weeksMin: 1,
    weeksMax: 2,
    icon: "Users",
    projectTypeId: "webapp",
    styleName: "Cielo suave",
    brand: "Cielo",
    accent: "#0284c7",
  },
  {
    id: "tpl-reservas",
    name: "Reservas",
    kind: "app",
    price: 3_800,
    description: "Calendario de citas o mesas. El cliente pide, tú confirmas.",
    pages: ["Inicio", "Calendario", "Nueva reserva", "Listado"],
    includes: ["Horarios", "Confirmación", "Avisos por correo", "Panel simple"],
    deliveryLabel: "1–2 semanas",
    estimatedHours: 22,
    weeksMin: 1,
    weeksMax: 2,
    icon: "CalendarCheck",
    projectTypeId: "webapp",
    styleName: "Calendario lila",
    brand: "Lila",
    accent: "#7c3aed",
  },
  {
    id: "tpl-panel",
    name: "Panel operativo",
    kind: "app",
    price: 4_800,
    description: "Tablero con números, una tabla y altas básicas. Un equipo chico.",
    pages: ["Login", "Inicio", "Registros", "Ajustes"],
    includes: ["Login", "Indicadores", "Tabla con filtros", "Alta / edición"],
    deliveryLabel: "1–2 semanas",
    estimatedHours: 26,
    weeksMin: 1,
    weeksMax: 2,
    icon: "LayoutDashboard",
    highlight: true,
    projectTypeId: "dashboard",
    styleName: "OLED esmeralda",
    brand: "Nexo",
    accent: "#34d399",
  },
  {
    id: "tpl-pedidos",
    name: "Pedidos",
    kind: "app",
    price: 6_000,
    description: "Catálogo interno, carrito y pedidos. El cobro se cierra por WhatsApp o efectivo.",
    pages: ["Catálogo", "Carrito", "Pedido", "Panel de pedidos"],
    includes: ["Hasta 40 productos", "Carrito", "Estatus del pedido", "Login del negocio"],
    deliveryLabel: "1–2 semanas",
    estimatedHours: 32,
    weeksMin: 1,
    weeksMax: 2,
    icon: "ShoppingBag",
    projectTypeId: "ecommerce",
    styleName: "Coral tienda",
    brand: "Mostrador",
    accent: "#f43f5e",
  },
];

export function getTemplate(id: string | null | undefined): SiteTemplate | undefined {
  if (!id) return undefined;
  return templates.find((item) => item.id === id);
}

export function styleSlug(styleName: string) {
  return styleName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTemplateBySlug(slug: string | null | undefined) {
  if (!slug) return undefined;
  return templates.find((item) => styleSlug(item.styleName) === slug);
}

export function stylePath(template: SiteTemplate) {
  return `/ui/${styleSlug(template.styleName)}`;
}

export function templatesByKind(kind: TemplateKind | "all") {
  if (kind === "all") return templates;
  return templates.filter((item) => item.kind === kind);
}

export function templateToQuote(template: SiteTemplate, brief = ""): QuoteState {
  return {
    projectTypeId: template.projectTypeId,
    designLevel: "basic",
    featureIds: [],
    integrationIds: [],
    extraIds: [],
    uiItemIds: [],
    rushDelivery: false,
    templateId: template.id,
    brief,
  };
}

export const websitePriceRange = { min: 1_700, max: 2_300 };
export const appPriceRange = { min: 3_000, max: 6_000 };

export const TEMPLATE_DISCLAIMER =
  "Esta demo muestra el estilo de UI. Tú escribes qué quieres; el alcance se confirma al hablar. Dominio y hosting van aparte.";

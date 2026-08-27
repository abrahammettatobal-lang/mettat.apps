import type { DesignOption, ProjectType } from "@/types/catalog";

export const projectTypes: ProjectType[] = [
  {
    id: "landing",
    name: "Landing Page",
    description: "Una página enfocada en conversión: claro, rápido y memorable.",
    examples: [
      "Página promocional",
      "Página para negocio",
      "Página de producto",
      "Página para evento",
    ],
    commonFeatures: ["Hero", "Servicios", "Contacto", "SEO básico"],
    icon: "PanelTop",
  },
  {
    id: "website",
    name: "Página web completa",
    description: "Sitio con varias secciones, formularios y contenido administrable.",
    examples: ["Home", "Servicios", "Nosotros", "Contacto", "Dashboard", "Formularios"],
    commonFeatures: ["Navegación", "Formularios", "SEO", "Analytics"],
    icon: "AppWindow",
  },
  {
    id: "webapp",
    name: "Aplicación web",
    description: "Producto con cuentas, datos y flujos de trabajo reales.",
    examples: [
      "SaaS",
      "Dashboard",
      "Plataforma educativa",
      "Sistema administrativo",
      "Herramienta interna",
      "Marketplace",
    ],
    commonFeatures: ["Auth", "Base de datos", "Dashboard", "API"],
    icon: "LayoutDashboard",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Panel de control con métricas, tablas y operación diaria.",
    examples: ["Estadísticas", "Tablas", "Filtros", "Roles"],
    commonFeatures: ["Gráficas", "CRUD", "Permisos"],
    icon: "ChartColumn",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Catálogo, carrito, pagos y seguimiento de pedidos.",
    examples: ["Tienda", "Checkout", "Inventario", "Pasarela"],
    commonFeatures: ["Catálogo", "Carrito", "Pagos", "Emails"],
    icon: "ShoppingBag",
  },
  {
    id: "saas",
    name: "SaaS",
    description: "Producto por suscripción con onboarding, planes y administración.",
    examples: ["Planes", "Billing", "Workspaces", "Admin"],
    commonFeatures: ["Auth", "Suscripciones", "Admin", "Emails"],
    icon: "Cloud",
  },
  {
    id: "desktop",
    name: "Aplicación de escritorio",
    description: "App instalable con Tauri: liviana, nativa y conectada a la web.",
    examples: [
      "Aplicaciones de escritorio",
      "Aplicaciones web instalables",
      "PWA",
    ],
    commonFeatures: ["PWA", "Tauri", "Offline"],
    icon: "Monitor",
  },
  {
    id: "other",
    name: "Otro",
    description: "Un proyecto a medida. Lo armamos juntos desde el cotizador.",
    examples: ["Android (próximamente)", "iOS (próximamente)", "Automatización"],
    commonFeatures: ["Alcance personalizado"],
    icon: "Sparkles",
    future: true,
  },
];

export const designOptions: DesignOption[] = [
  {
    id: "basic",
    name: "Básico",
    description: "Diseño limpio y funcional, listo para lanzar sin distracciones.",
  },
  {
    id: "custom",
    name: "Personalizado",
    description: "Diseño a medida con identidad visual, componentes y detalles propios.",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Animaciones, interacciones avanzadas y un acabado altamente trabajado.",
  },
];

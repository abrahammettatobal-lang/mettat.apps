import type { PortfolioProject } from "@/types/catalog";

export const projects: PortfolioProject[] = [
  {
    id: "norte-studio",
    name: "Norte Studio",
    description: "Sitio editorial para un estudio de producto, con CMS ligero y reservas.",
    type: "Página web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    image: "/projects/norte.svg",
    href: "/proyectos#norte-studio",
  },
  {
    id: "caja-clara",
    name: "Caja Clara",
    description: "Dashboard interno de cobranzas con roles, exportaciones y bitácora.",
    type: "Aplicación web",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Recharts"],
    image: "/projects/caja.svg",
    github: "https://github.com",
  },
  {
    id: "mercado-breve",
    name: "Mercado Breve",
    description: "Marketplace de productores locales con carrito y Mercado Pago.",
    type: "E-commerce",
    technologies: ["Next.js", "Stripe", "Tailwind", "Vercel"],
    image: "/projects/mercado.svg",
    href: "/proyectos#mercado-breve",
  },
  {
    id: "aula-viva",
    name: "Aula Viva",
    description: "Plataforma educativa con lecciones, progreso y un asistente Gemini.",
    type: "SaaS",
    technologies: ["Next.js", "Gemini", "Supabase", "Framer Motion"],
    image: "/projects/aula.svg",
    github: "https://github.com",
  },
];

export const techStack = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind"],
  backend: ["Node.js", "APIs", "PostgreSQL", "Supabase", "Firebase"],
  ai: ["OpenAI", "Gemini"],
  desktop: ["Tauri", "Rust"],
  deployment: ["Vercel", "Netlify", "Cloudflare"],
} as const;

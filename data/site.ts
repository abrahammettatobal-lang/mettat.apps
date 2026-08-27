export const site = {
  name: "Metta T. Apps",
  shortName: "Metta T.",
  tagline: "Sugerencias de UI. Escríbeme por WhatsApp.",
  description:
    "Diez sitios de estilo para páginas y apps. Entra a uno y cuéntame por WhatsApp qué quieres que sea.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://metta-t-apps.vercel.app",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@mettatapps.com",
  /** E.164 sin + : México +52 56 1312 5153 */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "525613125153",
  whatsappDisplay: "+52 56 1312 5153",
  github: process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com",
  locale: "es_MX",
} as const;

export const socials = [
  { id: "github", label: "GitHub", href: site.github },
] as const;

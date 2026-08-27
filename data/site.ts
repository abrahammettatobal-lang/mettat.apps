const DEFAULT_SITE_URL = "https://metta-t-apps.vercel.app";

function normalizeSiteUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/** URL pública del sitio. Tolera env mal formado y usa el dominio de Vercel en deploy. */
export function getSiteUrl(): string {
  const fromPublic = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  if (fromPublic) return fromPublic;

  const fromVercel = normalizeSiteUrl(process.env.VERCEL_URL ?? "");
  if (fromVercel) return fromVercel;

  return DEFAULT_SITE_URL;
}

export const site = {
  name: "Metta T. Apps",
  shortName: "Metta T.",
  tagline: "Sugerencias de UI. Escríbeme por WhatsApp.",
  description:
    "Diez sitios de estilo para páginas y apps. Entra a uno y cuéntame por WhatsApp qué quieres que sea.",
  url: getSiteUrl(),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@mettatapps.com",
  /** E.164 sin + : México +52 56 1312 5153 */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "525613125153",
  whatsappDisplay: "+52 56 1312 5153",
  github: process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com/abrahammettatobal-lang/mettat.apps",
  locale: "es_MX",
} as const;

export const socials = [
  { id: "github", label: "GitHub", href: site.github },
] as const;

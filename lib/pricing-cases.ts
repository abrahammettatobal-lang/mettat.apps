import { calculateQuote } from "@/lib/pricing-engine";
import type { QuoteState } from "@/types/catalog";

function quote(
  partial: Omit<QuoteState, "rushDelivery" | "templateId" | "brief"> & {
    rushDelivery?: boolean;
    templateId?: string | null;
    brief?: string;
  },
) {
  return calculateQuote({ rushDelivery: false, templateId: null, brief: "", ...partial });
}

export const marketSanityCases = [
  {
    id: "A",
    name: "Landing sencilla",
    marketNote: "Freelance MX: 8–18 mil (Moving Quicker); experimentado 12–25 mil (New Emage).",
    expectedBand: { min: 8_000, max: 28_000 },
    result: quote({
      projectTypeId: "landing",
      designLevel: "basic",
      uiItemIds: ["navbar-basic", "hero-minimal", "form-contact"],
      featureIds: ["email-forms"],
      integrationIds: ["int-vercel"],
      extraIds: ["extra-seo"],
    }),
  },
  {
    id: "B",
    name: "Sitio empresarial",
    marketNote: "Freelance corporativo 12–35 mil (Moving Quicker); agencias mucho más alto.",
    expectedBand: { min: 20_000, max: 55_000 },
    result: quote({
      projectTypeId: "website",
      designLevel: "custom",
      uiItemIds: ["navbar-floating", "hero-saas", "card-feature", "form-contact", "form-multistep"],
      featureIds: ["email-forms", "search-basic"],
      integrationIds: ["int-vercel"],
      extraIds: ["extra-seo", "extra-analytics", "extra-sitemap", "extra-cookies"],
    }),
  },
  {
    id: "C",
    name: "E-commerce",
    marketNote: "Freelance 18–45 mil (Moving Quicker) / 12–50 mil (Evariandev). Agencia desde ~50 mil.",
    expectedBand: { min: 30_000, max: 95_000 },
    result: quote({
      projectTypeId: "ecommerce",
      designLevel: "custom",
      uiItemIds: ["ecom-kit", "navbar-basic", "form-checkout"],
      featureIds: ["pay-stripe", "pay-onetime", "email-forms"],
      integrationIds: ["int-stripe", "int-vercel"],
      extraIds: ["extra-seo"],
    }),
  },
  {
    id: "D",
    name: "Dashboard con autenticación",
    marketNote: "Software a medida freelance suele partir de ~35–70 mil para un tablero usable.",
    expectedBand: { min: 35_000, max: 95_000 },
    result: quote({
      projectTypeId: "dashboard",
      designLevel: "custom",
      uiItemIds: ["dash-kit", "form-login"],
      featureIds: ["auth-login", "db-postgres", "admin-stats"],
      integrationIds: ["int-vercel"],
      extraIds: ["extra-darkmode"],
    }),
  },
  {
    id: "E",
    name: "Web App (auth, DB, admin, API, email)",
    marketNote: "Software/SaaS freelancer 50–200 mil (Moving Quicker).",
    expectedBand: { min: 50_000, max: 160_000 },
    result: quote({
      projectTypeId: "webapp",
      designLevel: "custom",
      uiItemIds: ["dash-kit", "form-login", "form-register"],
      featureIds: [
        "auth-login",
        "auth-register",
        "auth-recovery",
        "db-postgres",
        "db-prisma",
        "db-crud",
        "admin-dashboard",
        "api-rest",
        "email-forms",
      ],
      integrationIds: ["int-vercel"],
      extraIds: ["extra-darkmode", "extra-analytics"],
    }),
  },
  {
    id: "F",
    name: "SaaS (auth, Stripe, dashboard, admin, emails, analytics)",
    marketNote: "Freelance 50–200 mil+; agencia Magokoro MVP desde ~250 mil. Independiente profesional ~80–180 mil.",
    expectedBand: { min: 80_000, max: 220_000 },
    result: quote({
      projectTypeId: "saas",
      designLevel: "premium",
      uiItemIds: ["dash-kit", "card-pricing", "hero-saas", "form-login"],
      featureIds: [
        "auth-login",
        "auth-register",
        "auth-google",
        "auth-roles",
        "db-postgres",
        "db-prisma",
        "admin-dashboard",
        "admin-users",
        "pay-stripe",
        "pay-subscriptions",
        "email-welcome",
        "email-auto",
        "api-rest",
      ],
      integrationIds: ["int-stripe", "int-vercel"],
      extraIds: ["extra-darkmode", "extra-analytics", "extra-seo"],
    }),
  },
  {
    id: "G",
    name: "Aplicación con IA (chat + RAG)",
    marketNote: "No hay listado público de “RAG = $X”; se deriva de horas especialista. Completo suele superar un webapp simple.",
    expectedBand: { min: 70_000, max: 200_000 },
    result: quote({
      projectTypeId: "webapp",
      designLevel: "custom",
      uiItemIds: ["form-login"],
      featureIds: ["auth-login", "db-postgres", "ai-chat", "ai-rag", "ai-openai", "files-upload"],
      integrationIds: ["int-openai", "int-vercel"],
      extraIds: [],
    }),
  },
] as const;

export function evaluateSanityCases() {
  return marketSanityCases.map((item) => {
    const total = item.result.subtotal;
    const inBand = total >= item.expectedBand.min && total <= item.expectedBand.max;
    return { ...item, total, inBand };
  });
}

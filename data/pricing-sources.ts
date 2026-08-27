import type { PricingSource } from "@/types/pricing";

/** Fecha de la investigación de mercado usada en este ciclo. */
export const PRICING_RESEARCH_DATE = "2026-08-26";

export const pricingSources: PricingSource[] = [
  {
    id: "src-universepage",
    name: "Universepage — tarifa de desarrollador web freelance en México",
    url: "https://universepage.com.mx/blog/tarifa-desarrollador-web-freelance-mexico",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Rangos freelance locales: junior 200–350 MXN/h, intermedio 350–600, senior/especialista 600–1,200+. Horas típicas: landing ~20 h, corporativa ~40 h, e-commerce 80 h+.",
  },
  {
    id: "src-itechdev",
    name: "iTechDev — costo de desarrollo de software en México",
    url: "https://itechdev.com.mx/es/blog/costo-desarrollo-software-mexico",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Freelance: junior 200–400, semi-senior 400–700, senior 700–1,200, especialista IA 1,000–2,000 MXN/h. Distingue freelancer de agencia; no se usa el techo de agencia como precio principal.",
  },
  {
    id: "src-calculoseguro",
    name: "CalculoSeguro — costo por hora de un programador en México",
    url: "https://calculoseguro.mx/calculadora-costo-hora/",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Programador 350–1,500 MXN/h, promedio ~700. Clientes directos 500–1,500; marketplaces tipo Workana 200–500 (referencia baja, no se usa como tarifa profesional).",
  },
  {
    id: "src-pixeles",
    name: "Pixeles Web — cuánto cuesta desarrollar software a medida en México 2026",
    url: "https://www.pixelesweb.com/blog/cuanto-cuesta-desarrollar-software-medida-mexico-2026",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Freelance 400–1,500 MXN/h. Sus cotizaciones de agencia se usan solo como techo secundario, no como tarifa Metta.",
  },
  {
    id: "src-prolatam",
    name: "ProLatamWork — tarifas de desarrolladores LATAM 2026",
    url: "https://prolatamwork.com/blog/tarifas-desarrolladores-latam-2026",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "LATAM / México",
    notes:
      "México fullstack: mid 22–40 USD/h, senior 45–70 USD/h. Sirve para convertir la tarifa MXN a un equivalente internacional de independiente, no de agencia US.",
  },
  {
    id: "src-lemon",
    name: "Lemon.io — rate calculator México",
    url: "https://lemon.io/rate-calculator/mexico/",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México (contratos internacionales)",
    notes:
      "Agosto 2026, perfiles vetados para clientes US: mid 26–34 USD/h, senior P25–P75 33–45 USD/h. Referencia alta de mercado exportador; Metta se sitúa por debajo de ese techo.",
  },
  {
    id: "src-movingquicker",
    name: "Moving Quicker — cuánto cuesta una página web en México",
    url: "https://movingquicker.com/blog/cuanto-cuesta-pagina-web-mexico",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Freelance: landing 8–18 mil MXN, corporativo 12–35 mil, e-commerce 18–45 mil, software/SaaS 50–200 mil+. Referencia principal de rangos de proyecto para independiente.",
  },
  {
    id: "src-evariandev",
    name: "Evariandev — guía de precios de páginas web en México",
    url: "https://www.evariandev.com.mx/blog/articulos/cuanto-cuesta-una-pagina-web-en-mexico-guia-de-precios-real-y-sin-letras-chiquitas",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Freelance: landing 5–35 mil (el piso de 5 mil es perfil más básico; no se usa como tarifa profesional). E-commerce freelance 12–50 mil.",
  },
  {
    id: "src-creatupagina",
    name: "CreaTuPaginaWeb — estudio de precios de páginas web México 2026",
    url: "https://creatupaginaweb.mx/estudio-precios-paginas-web-mexico-2026/",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Mediana de 49 agencias: landing ~7.5 mil, corporativo ~11 mil. Mezcla plantillas y sitios chicos; se usa como piso de mercado, no como techo de un independiente senior.",
  },
  {
    id: "src-newemage",
    name: "New Emage — cuánto cuesta una página web en México",
    url: "https://newemage.com.mx/cuanto-cuesta-una-pagina-web-en-mexico/",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Freelancer experimentado: landing 12–25 mil. Agencia/estudio: e-commerce desde ~49.9 mil. El rango freelance experimentado es el ancla de landing profesional.",
  },
  {
    id: "src-magokoro",
    name: "Magokoro — precios de desarrollo web en México",
    url: "https://www.magokoro.mx/blog/precios-desarrollo-web-mexico",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México (agencia, referencia secundaria)",
    notes:
      "Agencia: corporativo 35–120 mil, MVP/SaaS desde 250 mil+. No se copia como precio Metta; solo sanity check de techo. Un independiente profesional debe cotizar claramente por debajo de esos paquetes de agencia.",
  },
  {
    id: "src-banxico",
    name: "Banxico — tipo de cambio FIX",
    url: "https://www.banxico.org.mx/tipcamb/main.do?page=tip&idioma=sp",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "FIX observado ~16.9647 MXN/USD el 26 ago 2026. Se usa solo para expresar tarifas USD de terceros en contexto; los precios de desarrollo se publican en MXN.",
  },
  {
    id: "src-vercel",
    name: "Vercel — pricing oficial",
    url: "https://vercel.com/pricing",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "Global",
    notes: "Hobby 0 USD. Pro 20 USD/mes por miembro + uso. Costo del cliente, no del desarrollo.",
  },
  {
    id: "src-supabase",
    name: "Supabase — pricing oficial",
    url: "https://supabase.com/pricing",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "Global",
    notes: "Free 0 USD. Pro desde 25 USD/mes + compute. El consumo se cobra aparte del desarrollo.",
  },
  {
    id: "src-stripe",
    name: "Stripe México — pricing oficial",
    url: "https://stripe.com/en-mx/pricing",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Tarjetas nacionales 3.6% + 3 MXN por transacción exitosa, sin mensualidad ni setup. IVA aparte. No se suma al precio de implementación.",
  },
  {
    id: "src-mercadopago",
    name: "Mercado Pago México — costos de Checkout (blog oficial + ayuda)",
    url: "https://www.mercadopago.com.mx/blog/hot-sale-integra-mercado-pago",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "México",
    notes:
      "Checkout: 3.49% + 4 MXN al instante; 3.19% + 4 a 7/14 días; 2.95% + 4 a 30 días (IVA extra). Verificar simulador: https://www.mercadopago.com.mx/cost-simulator",
  },
  {
    id: "src-openai",
    name: "OpenAI — API pricing GPT-5.6 (anuncio oficial 30 jul 2026)",
    url: "https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "Global",
    notes:
      "Por 1M tokens: Luna 0.20/1.20 USD, Terra 2/12, Sol 5/30 (entrada/salida). Siempre usage; nunca un fijo inventado en la cotización de desarrollo. Completar con https://openai.com/api/pricing/",
  },
  {
    id: "src-gemini",
    name: "Google — Gemini 3.7 Flash introductory pricing",
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "Global",
    notes:
      "Intro 0.75/3.75 USD por 1M tokens input/output hasta el 31 dic 2026; desde 1 ene 2027 1.50/7.50. Tabla de plataforma: https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing",
  },
  {
    id: "src-resend",
    name: "Resend — pricing oficial",
    url: "https://resend.com/pricing",
    accessedAt: PRICING_RESEARCH_DATE,
    market: "Global",
    notes: "Free 3,000 emails/mes. Pro desde 20 USD/mes (50,000). Costo del cliente.",
  },
];

export function getPricingSource(id: string): PricingSource | undefined {
  return pricingSources.find((source) => source.id === id);
}

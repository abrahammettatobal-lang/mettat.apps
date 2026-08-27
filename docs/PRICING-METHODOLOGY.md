# Metodología de precios — Metta T. Apps

Moneda: **MXN**. Posicionamiento: **desarrollador independiente profesional en México**, no una agencia grande y no un perfil que compite solo por ser el más barato.

Investigación: **26 de agosto de 2026**.

Los precios públicos de desarrollo **no incluyen** hosting, dominio, tokens de IA ni comisiones de pasarela. Eso lo paga el cliente.

---

## 1. Mercado investigado

Se contrastaron tarifas por hora de freelance mexicano, rangos de proyecto (landing, corporativo, e-commerce, software) y tarifas internacionales de independientes mexicanos (USD) convertidas con el FIX de Banxico (~16.96 MXN/USD el 26/08/2026).

**No se promediaron ciegamente** fuentes de agencia con Fiverr o plantillas de 7,500 MXN. Cada fuente se clasificó:

| Tipo | Uso |
| --- | --- |
| Freelance local (Universepage, iTechDev, CalculoSeguro, Pixeles, Moving Quicker, Evariandev, New Emage) | Referencia **principal** |
| Estudio de agencias chicas (CreaTuPaginaWeb) | Piso de mercado, no techo profesional |
| Agencia (Magokoro) | Techo **secundario**; Metta debe cotizar por debajo |
| Contratos US (Lemon.io, ProLatamWork) | Comprobar que 500–850 MXN/h es un independiente local, no una boutique US |

---

## 2. Fuentes

Registradas en `data/pricing-sources.ts` (mínimo 12 de mercado + oficiales de terceros).

**Horas / tarifas**

1. [Universepage — tarifa freelance MX](https://universepage.com.mx/blog/tarifa-desarrollador-web-freelance-mexico)
2. [iTechDev — costo de software MX](https://itechdev.com.mx/es/blog/costo-desarrollo-software-mexico)
3. [CalculoSeguro — costo por hora](https://calculoseguro.mx/calculadora-costo-hora/)
4. [Pixeles Web — software a medida 2026](https://www.pixelesweb.com/blog/cuanto-cuesta-desarrollar-software-medida-mexico-2026)
5. [ProLatamWork — tarifas LATAM 2026](https://prolatamwork.com/blog/tarifas-desarrolladores-latam-2026)
6. [Lemon.io México](https://lemon.io/rate-calculator/mexico/)

**Rangos de proyecto**

7. [Moving Quicker — precio de página web MX](https://movingquicker.com/blog/cuanto-cuesta-pagina-web-mexico)
8. [Evariandev — guía de precios](https://www.evariandev.com.mx/blog/articulos/cuanto-cuesta-una-pagina-web-en-mexico-guia-de-precios-real-y-sin-letras-chiquitas)
9. [CreaTuPaginaWeb — estudio 2026](https://creatupaginaweb.mx/estudio-precios-paginas-web-mexico-2026/)
10. [New Emage](https://newemage.com.mx/cuanto-cuesta-una-pagina-web-en-mexico/)
11. [Magokoro — agencia, secundario](https://www.magokoro.mx/blog/precios-desarrollo-web-mexico)

**FX y terceros oficiales**

12. [Banxico tipo de cambio](https://www.banxico.org.mx/tipcamb/main.do?page=tip&idioma=sp)
13. [Vercel pricing](https://vercel.com/pricing)
14. [Supabase pricing](https://supabase.com/pricing)
15. [Stripe México](https://stripe.com/en-mx/pricing)
16. [Mercado Pago (simulador / blog oficial)](https://www.mercadopago.com.mx/cost-simulator)
17. [OpenAI GPT-5.6 API](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)
18. [Gemini Flash intro](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/)
19. [Resend pricing](https://resend.com/pricing)

No existe un listado público del tipo “Google OAuth cuesta $X en México”. Esos SKUs se **derivan de horas × tarifa**.

---

## 3. Tarifa base

Definida en `data/pricing-config.ts`:

| Nivel | MXN/h | ≈ USD/h | Encaje |
| --- | ---: | ---: | --- |
| **Standard** | 500 | 29.5 | Mid local (Universepage 350–600; ProLatam mid 22–40 USD) |
| **Advanced** | 650 | 38 | Semi-senior / backend (iTechDev 400–700; Lemon mid-high) |
| **Specialist** | 850 | 50 | IA, realtime, Tauri/Rust (iTechDev senior 700–1,200; aún bajo vs Lemon senior US) |

No se usa el promedio de agencia ni el piso de Workana (200–500).

**Standard:** UI, CRUD simple, formularios, páginas, responsive.  
**Advanced:** backend, auth, pagos, admin, APIs.  
**Specialist:** IA/RAG, infra delicada, realtime, escritorio Tauri.

La complejidad (`basic | standard | advanced | specialist`) **no multiplica** el precio: cambia las horas, la tarifa y, si hay riesgo técnico real, un buffer acotado (5–8 % de la mano de obra).

---

## 4. Cómo se estimaron las horas

Cada SKU en `data/service-work.ts` desglosa:

`analysis + ui + frontend + backend + database + integration + testing + deployment`

Las horas incluyen **2 rondas de revisión** de alcance acotado. Trabajo fuera de alcance se cotiza aparte.

La partida **base** de un tipo de proyecto es andamiaje (kickoff, repo, layout, QA, deploy), **no** el producto terminado. Navbar, auth o Stripe se suman si se eligen.

Piso mínimo solo sobre la base (`minimumProjectPrice`), para que una landing no salga como “3 h × tarifa” sin setup ni QA.

---

## 5. Cómo se calcula cada precio

`lib/service-price.ts` → `calculateServicePrice(id)`:

```
laborCost = horas × tarifa del nivel
riskCost  = laborCost × riskBuffer   (0 si no hay riesgo justificado)
raw       = laborCost + riskCost
raw       = max(raw, piso)           (solo bases de proyecto)
final     = roundCommercial(manualOverride ?? raw)
```

No se vuelve a cobrar “diseño” o “testing” como partidas sueltas si ya van en las horas.

Redondeo comercial: hacia arriba a 50 (< 1,000), a 100 (< 50,000) o a 500 (≥ 50,000). El bruto queda en `rawPrice` para auditoría.

`manualOverride` en `data/pricing-overrides.ts` sustituye el final si hace falta.

`isPricingStale()` marca revisión a los **6 meses**. No hay ajuste automático por inflación.

---

## 6. Dependencias

Si el cliente ya tiene la infraestructura:

- `requires`: addon si **todas** las dependencias están en el carrito  
- `requiresAny`: addon si **alguna** está  
- `bundledIds` del catálogo: no se cobra dos veces el mismo ítem embebido  

Ejemplo: Login (standalone) + Google OAuth (solo el trabajo extra de OAuth). Si alguien pide solo Google, se usa el precio standalone (incluye auth mínima).

---

## 7. Paquetes

1. Se suma el cotizador real de las piezas (con addons).  
2. Se aplica un descuento de **gestión** (8 % landing/business, 10 % web app/SaaS): un kickoff, un QA, un deploy.  
3. Se muestra **Individual / Paquete / Ahorras**.  

Ese ahorro es real (menos coordinación), no un “antes $50,000” inventado.

---

## 8. Costos externos

`data/external-costs.ts`. Dueño habitual: **cliente**.

| Concepto | Tratamiento |
| --- | --- |
| Desarrollo | Precio del proyecto (único) |
| Dominio | Cliente, anual, aparte |
| Vercel / Supabase / Resend | Cliente, plan/mes |
| OpenAI / Gemini | Cliente, **según consumo** |
| Stripe / Mercado Pago / PayPal | Cliente, **comisión por transacción** |

Nunca se mete un estimado de tokens al subtotal de desarrollo.

Mantenimiento es un producto **mensual** aparte (`extra-maint-*`), no un perpetuo metido en el build.

Entrega urgente (`rushDelivery`) existe, **apagada** salvo que se active (recargo 25 % sobre desarrollo).

---

## 9. Fecha de investigación

**26 de agosto de 2026.** Mostrar en catálogo/cotizador: “Precios actualizados: agosto 2026”.

---

## 10. Cómo actualizar precios

1. Releer fuentes de mercado y páginas **oficiales** de terceros.  
2. Actualizar `data/pricing-sources.ts` (`accessedAt`).  
3. Ajustar tarifas en `data/pricing-config.ts` solo con evidencia.  
4. Ajustar horas en `data/service-work.ts` si cambió el alcance típico.  
5. No “inflacionar” un 4 % sin investigación.  
6. Revisar casos A–G en `/admin/pricing`.  
7. Si un SKU concreto debe salir del modelo, usar `pricing-overrides.ts` y dejar constancia.

Tabla viva de todos los servicios: **`/admin/pricing`** (noindex, no está en el menú).

Exportación estática de la misma tabla: [`docs/PRICING-TABLE.md`](./PRICING-TABLE.md).

---

## Casos de sanity check (banda de mercado, no fórmula)

Definidos en `lib/pricing-cases.ts`. Si un total cae fuera de banda, se revisan horas; **no** se fuerza el número al promedio.

| Caso | Qué representa | Banda (MXN) | Total calculado (26 ago 2026) |
| --- | --- | --- | ---: |
| A | Landing sencilla | 8,000–28,000 | 19,900 |
| B | Sitio empresarial (diseño custom + SEO/analytics) | 20,000–55,000 | 51,450 |
| C | E-commerce con Stripe | 30,000–95,000 | 68,400 |
| D | Dashboard + auth | 35,000–95,000 | 68,150 |
| E | Web app (auth, DB, admin, API, email) | 50,000–160,000 | 103,500 |
| F | SaaS MVP | 80,000–220,000 | 176,550 |
| G | App con IA (chat + RAG) | 70,000–200,000 | 108,950 |

Paquetes (suma de piezas − descuento de gestión):

| Paquete | Individual | Paquete | Ahorro |
| --- | ---: | ---: | ---: |
| Landing Starter | 22,150 | 20,400 | 1,750 |
| Web Business | 51,450 | 47,400 | 4,050 |
| Web App | 100,500 | 90,500 | 10,000 |
| SaaS | 176,550 | 159,000 | 17,550 |

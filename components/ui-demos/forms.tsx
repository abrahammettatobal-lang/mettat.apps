"use client";

import { useId, useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DemoMark, DemoShell, DemoToast } from "@/components/ui-demos/frame";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";

export function FormLoginDemo() {
  const id = useId();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <DemoShell className="relative">
      <div className="grid min-h-[380px] md:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-teal-900 to-stone-900 p-6 text-white md:flex">
          <DemoMark name="Caja" light />
          <div>
            <p className="font-display text-2xl font-semibold">El dinero, sin teatro.</p>
            <p className="mt-2 text-sm text-white/70">Tablero de cobros para estudios que facturan en MXN.</p>
          </div>
        </div>
        <form
          className="mx-auto grid w-full max-w-sm content-center gap-3 p-6"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const email = String(data.get("email") ?? "");
            const password = String(data.get("password") ?? "");
            if (!email.includes("@") || password.length < 6) {
              setError("Correo válido y contraseña de 6+ caracteres.");
              setOk(false);
              return;
            }
            setError("");
            setOk(true);
          }}
        >
          <h3 className="font-display text-xl font-semibold">Entrar a Caja</h3>
          <div className="grid gap-1.5">
            <Label htmlFor={`${id}-email`}>Correo</Label>
            <Input id={`${id}-email`} name="email" type="email" autoComplete="username" required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`${id}-pass`}>Contraseña</Label>
            <div className="relative">
              <Input
                id={`${id}-pass`}
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                className="pr-10"
              />
              <button
                type="button"
                className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShow((v) => !v)}
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          {error ? <p className="text-destructive text-xs">{error}</p> : null}
          <Button type="submit">Entrar</Button>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setOk(true)}>
              Google
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setOk(true)}>
              GitHub
            </Button>
          </div>
        </form>
      </div>
      <DemoToast message={ok ? "Sesión de demostración iniciada." : null} onDismiss={() => setOk(false)} />
    </DemoShell>
  );
}

export function FormRegisterDemo() {
  const id = useId();
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const rules = [
    { label: "8 caracteres", ok: password.length >= 8 },
    { label: "Una mayúscula", ok: /[A-Z]/.test(password) },
    { label: "Un número", ok: /[0-9]/.test(password) },
  ];
  const strength = rules.filter((rule) => rule.ok).length;

  return (
    <DemoShell>
      <form
        className="mx-auto grid min-h-[380px] max-w-sm content-start gap-3 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (strength < 3) return;
          setOk(true);
        }}
      >
        <h3 className="font-display text-xl font-semibold">Crear cuenta</h3>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-name`}>Nombre</Label>
          <Input id={`${id}-name`} name="name" autoComplete="name" required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-email`}>Correo</Label>
          <Input id={`${id}-email`} name="email" type="email" required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-pass`}>Contraseña</Label>
          <Input
            id={`${id}-pass`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn("h-1 flex-1 rounded-full bg-muted", strength > i && (i === 2 ? "bg-primary" : "bg-copper"))}
              />
            ))}
          </div>
          <ul className="text-muted-foreground grid gap-1 text-[11px]">
            {rules.map((rule) => (
              <li key={rule.label} className={cn("flex items-center gap-1.5", rule.ok && "text-primary")}>
                <Check className={cn("size-3", rule.ok ? "opacity-100" : "opacity-30")} aria-hidden="true" />
                {rule.label}
              </li>
            ))}
          </ul>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox id={`${id}-terms`} />
          <span>Acepto términos de la demo</span>
        </label>
        <Button type="submit" disabled={strength < 3}>
          {ok ? "Cuenta creada" : "Registrarme"}
        </Button>
      </form>
    </DemoShell>
  );
}

const topics = ["Proyecto nuevo", "Rediseño", "Soporte"];

export function FormContactDemo() {
  const id = useId();
  const [msg, setMsg] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [ok, setOk] = useState(false);

  if (ok) {
    return (
      <DemoShell className="grid min-h-[380px] place-items-center p-8 text-center">
        <div>
          <p className="font-display text-2xl font-semibold">Mensaje enviado</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Asunto: {topic}. Esto es una demo. No salió ningún correo.
          </p>
          <Button className="mt-4" type="button" variant="outline" onClick={() => setOk(false)}>
            Escribir otro
          </Button>
        </div>
      </DemoShell>
    );
  }

  return (
    <DemoShell>
      <form
        className="mx-auto grid min-h-[380px] max-w-sm content-start gap-3 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setOk(true);
        }}
      >
        <h3 className="font-display text-xl font-semibold">Hablemos</h3>
        <div className="flex flex-wrap gap-1.5">
          {topics.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setTopic(item)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px]",
                topic === item && "border-primary bg-accent",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-name`}>Nombre</Label>
          <Input id={`${id}-name`} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-msg`}>Mensaje</Label>
          <Textarea
            id={`${id}-msg`}
            required
            rows={4}
            maxLength={280}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <p className="text-muted-foreground text-right text-[11px] tabular-nums">{msg.length}/280</p>
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </DemoShell>
  );
}

function formatCard(value: string) {
  return value
    .replaceAll(/\D/g, "")
    .slice(0, 16)
    .replaceAll(/(\d{4})(?=\d)/g, "$1 ");
}

export function FormCheckoutDemo() {
  const id = useId();
  const [card, setCard] = useState("");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [ok, setOk] = useState(false);
  const [ship, setShip] = useState("Local");
  const shipCost = ship === "Express" ? 180 : 0;
  const total = (applied ? 384 : 480) + shipCost;
  const digits = card.replaceAll(" ", "");
  const brand = digits.startsWith("4") ? "Visa" : digits.startsWith("5") ? "Mastercard" : "Tarjeta";

  return (
    <DemoShell>
      <form
        className="grid min-h-[380px] gap-4 p-5 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          setOk(true);
        }}
      >
        <div className="grid content-start gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-stone-800 to-teal-900 p-4 text-white">
            <p className="text-[11px] tracking-wide uppercase text-white/60">{brand}</p>
            <p className="mt-6 font-mono text-lg tracking-widest">{card || "•••• •••• •••• ••••"}</p>
            <p className="mt-4 text-xs text-white/70">Ana Lira</p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`${id}-card`}>Número</Label>
            <Input
              id={`${id}-card`}
              placeholder="4242 4242 4242 4242"
              required
              inputMode="numeric"
              value={card}
              onChange={(e) => setCard(formatCard(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label htmlFor={`${id}-exp`}>Expira</Label>
              <Input id={`${id}-exp`} placeholder="12/28" required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor={`${id}-cvc`}>CVC</Label>
              <Input id={`${id}-cvc`} placeholder="123" required />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border bg-muted/30 p-4">
          <p className="text-sm font-medium">Resumen</p>
          <div className="mt-3 flex justify-between text-sm">
            <span>Lámpara Nube</span>
            <span>{formatMXN(480)}</span>
          </div>
          <div className="mt-3 flex gap-2">
            {["Local", "Express"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setShip(item)}
                className={cn(
                  "flex-1 rounded-lg border px-2 py-1.5 text-xs",
                  ship === item && "border-primary bg-accent",
                )}
              >
                {item}
                {item === "Express" ? " +180" : " gratis"}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              aria-label="Cupón"
              placeholder="CUPON"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button type="button" variant="outline" onClick={() => setApplied(coupon.toLowerCase() === "norte")}>
              Aplicar
            </Button>
          </div>
          {applied ? (
            <p className="mt-2 text-xs text-primary">Cupón NORTE: −20%</p>
          ) : (
            <p className="text-muted-foreground mt-2 text-xs">Prueba NORTE</p>
          )}
          <p className="font-display mt-4 text-2xl tabular-nums">{formatMXN(total)}</p>
          <Button className="mt-3 w-full" type="submit">
            {ok ? "Pagado" : `Pagar ${formatMXN(total)}`}
          </Button>
        </div>
      </form>
    </DemoShell>
  );
}

export function FormMultistepDemo() {
  const id = useId();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("Norte Studio");
  const [kind, setKind] = useState("SaaS");
  const [budget, setBudget] = useState("45000");
  const [sent, setSent] = useState(false);

  return (
    <DemoShell className="min-h-[380px] space-y-4 p-5">
      <ol className="flex gap-2 text-[11px]">
        {["Proyecto", "Tipo", "Resumen"].map((label, index) => (
          <li
            key={label}
            className={cn(
              "rounded-full px-2 py-0.5",
              step === index + 1 ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>
      <div className="h-1 overflow-hidden rounded-full bg-muted">
        <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
      </div>
      {step === 1 ? (
        <div className="grid gap-1.5">
          <Label htmlFor={`${id}-proj`}>Nombre del proyecto</Label>
          <Input id={`${id}-proj`} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      ) : null}
      {step === 2 ? (
        <div className="grid gap-2">
          <p className="text-sm font-medium">¿Qué estás construyendo?</p>
          <div className="flex flex-wrap gap-2">
            {["Landing", "SaaS", "Tienda"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setKind(item)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  kind === item && "border-primary bg-accent",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <Label htmlFor={`${id}-budget`}>Presupuesto (MXN)</Label>
          <Input id={`${id}-budget`} value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>
      ) : null}
      {step === 3 ? (
        <div className="rounded-2xl border p-4 text-sm">
          <p>
            <strong>{name}</strong>
          </p>
          <p className="text-muted-foreground mt-1">
            {kind} · {formatMXN(Number(budget) || 0)}
          </p>
          {sent ? <p className="mt-3 text-xs text-primary">Brief de demo enviado.</p> : null}
        </div>
      ) : null}
      <div className="flex gap-2">
        <Button type="button" variant="outline" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
          Atrás
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (step === 3) setSent(true);
            else setStep((s) => Math.min(3, s + 1));
          }}
        >
          {step === 3 ? (sent ? "Enviado" : "Enviar brief") : "Siguiente"}
        </Button>
      </div>
    </DemoShell>
  );
}

export function FormRecoveryDemo() {
  const id = useId();
  const [stage, setStage] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  return (
    <DemoShell>
      <form
        className="mx-auto grid min-h-[380px] max-w-sm content-center gap-3 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (stage === "email") setStage("otp");
          else if (stage === "otp") setStage("done");
        }}
      >
        <h3 className="font-display text-xl font-semibold">Recuperar acceso</h3>
        {stage === "email" ? (
          <>
            <p className="text-muted-foreground text-sm">Te enviamos un código de un solo uso.</p>
            <Label htmlFor={`${id}-rec`}>Correo</Label>
            <Input id={`${id}-rec`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit">Enviar código</Button>
          </>
        ) : null}
        {stage === "otp" ? (
          <>
            <p className="text-muted-foreground text-sm">Código enviado a {email || "tu correo"}.</p>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-12 w-12 text-center text-lg"
                  aria-label={`Dígito ${index + 1}`}
                  value={digit}
                  onChange={(event) => {
                    const next = [...otp];
                    next[index] = event.target.value.replaceAll(/\D/g, "").slice(-1);
                    setOtp(next);
                  }}
                />
              ))}
            </div>
            <Button type="submit" disabled={otp.join("").length < 4}>
              Confirmar
            </Button>
          </>
        ) : null}
        {stage === "done" ? (
          <>
            <p className="text-sm text-primary">Acceso restaurado en la demo.</p>
            <Button type="button" variant="outline" onClick={() => setStage("email")}>
              Volver
            </Button>
          </>
        ) : null}
      </form>
    </DemoShell>
  );
}

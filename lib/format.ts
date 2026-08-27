const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function formatMXN(amount: number): string {
  return mxn.format(amount);
}

export function formatMXNDelta(amount: number): string {
  const sign = amount >= 0 ? "+" : "−";
  return `${sign} ${formatMXN(Math.abs(amount))}`;
}


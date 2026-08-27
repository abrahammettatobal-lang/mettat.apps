export function createQuoteId(date = new Date()): string {
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MTA-${stamp}-${rand}`;
}

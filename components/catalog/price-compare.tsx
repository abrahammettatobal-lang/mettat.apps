import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PriceCompare({
  price,
  fromPrice = false,
  included = false,
  suffix,
  className,
  layout = "stack",
}: {
  price: number;
  fromPrice?: boolean;
  included?: boolean;
  suffix?: string;
  className?: string;
  layout?: "stack" | "inline";
}) {
  if (included || price === 0) {
    return <p className={cn("text-sm font-medium", className)}>Incluido</p>;
  }

  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
        layout === "stack" && "flex-col items-start gap-0.5",
        className,
      )}
    >
      <span className="font-medium text-copper tabular-nums">
        {fromPrice ? "Desde " : null}
        {formatMXN(price)} MXN
      </span>
      {suffix ? <span className="text-muted-foreground text-xs">{suffix}</span> : null}
    </p>
  );
}

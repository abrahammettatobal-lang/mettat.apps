import { PriceCompare } from "@/components/catalog/price-compare";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PriceBadge({
  price,
  fromPrice = false,
  className,
  suffix,
}: {
  price: number;
  fromPrice?: boolean;
  className?: string;
  suffix?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("h-auto border-copper/30 bg-copper/10 px-2.5 py-1 font-normal", className)}
    >
      <PriceCompare price={price} fromPrice={fromPrice} suffix={suffix} layout="inline" />
    </Badge>
  );
}

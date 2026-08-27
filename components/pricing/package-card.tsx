"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/providers/quote-provider";
import type { ServicePackage } from "@/types/catalog";

export function UsePackageButton({
  pkg,
  highlight = false,
}: {
  pkg: ServicePackage;
  highlight?: boolean;
}) {
  const { applyPackage } = useQuote();
  const router = useRouter();

  return (
    <Button
      type="button"
      className="mt-5 w-full"
      variant={highlight ? "default" : "outline"}
      onClick={() => {
        applyPackage(pkg);
        router.push("/cotizador");
      }}
    >
      Usar este paquete
    </Button>
  );
}

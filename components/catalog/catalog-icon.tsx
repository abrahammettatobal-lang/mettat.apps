import { createElement } from "react";
import { getIcon } from "@/lib/icons";

export function CatalogIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return createElement(getIcon(name), {
    className,
    "aria-hidden": true,
  });
}

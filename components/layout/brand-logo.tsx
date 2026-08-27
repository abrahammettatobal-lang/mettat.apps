import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const box = {
    sm: { className: "h-9 w-[7.5rem]", width: 240, height: 96 },
    md: { className: "h-12 w-[10rem]", width: 320, height: 128 },
    lg: { className: "h-16 w-[13.5rem]", width: 420, height: 168 },
  }[size];

  return (
    <Image
      src="/logo.png"
      alt="Metta T. Apps"
      width={box.width}
      height={box.height}
      className={cn(box.className, "object-contain object-left", className)}
      priority
    />
  );
}

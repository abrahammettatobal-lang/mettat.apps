"use client";

import { Lock, Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Device = "desktop" | "tablet" | "mobile";

const devices = [
  { id: "desktop" as const, label: "Escritorio", Icon: Monitor },
  { id: "tablet" as const, label: "Tablet", Icon: Tablet },
  { id: "mobile" as const, label: "Móvil", Icon: Smartphone },
];

export function DevicePreview({
  device,
  onDeviceChange,
  url = "atelier.mx/preview",
  children,
}: {
  device: Device;
  onDeviceChange: (device: Device) => void;
  url?: string;
  children: React.ReactNode;
}) {
  const width = device === "desktop" ? "100%" : device === "tablet" ? 740 : 390;

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-1" role="group" aria-label="Tamaño de vista">
        {devices.map(({ id, label, Icon }) => (
          <Button
            key={id}
            type="button"
            size="sm"
            variant={device === id ? "default" : "outline"}
            aria-pressed={device === id}
            aria-label={label}
            onClick={() => onDeviceChange(id)}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-[1.75rem] bg-gradient-to-b from-stone-200/80 to-stone-400/40 p-4 sm:p-6 dark:from-stone-800 dark:to-stone-950">
        <div
          className={cn(
            "mx-auto overflow-hidden bg-background shadow-[0_24px_80px_-24px_rgba(28,25,23,0.55)] transition-[width,border-radius] duration-300",
            device === "desktop" && "rounded-xl border",
            device === "tablet" && "rounded-[1.75rem] border-[10px] border-stone-800",
            device === "mobile" && "rounded-[2.1rem] border-[8px] border-stone-900",
          )}
          style={{ width, maxWidth: "100%" }}
        >
          {device === "desktop" ? (
            <div className="flex items-center gap-2 border-b bg-muted/70 px-3 py-2">
              <span className="size-2.5 rounded-full bg-[#ed6a5e]" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[#f4bf4f]" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[#61c554]" aria-hidden="true" />
              <p className="text-muted-foreground mx-auto flex h-7 max-w-md flex-1 items-center justify-center gap-1.5 rounded-md bg-background px-3 text-[11px] leading-none">
                <Lock className="size-3" aria-hidden="true" />
                {url}
              </p>
            </div>
          ) : (
            <div className="bg-background px-4 pt-2" aria-hidden="true">
              <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
                <span>9:41</span>
                <span className="mx-auto h-1.5 w-16 rounded-full bg-foreground/80" />
                <span>5G</span>
              </div>
            </div>
          )}
          <div className="max-h-[min(72vh,680px)] overflow-auto">{children}</div>
          {device === "mobile" ? (
            <div className="flex justify-center bg-background py-2" aria-hidden="true">
              <span className="h-1 w-28 rounded-full bg-foreground/25" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

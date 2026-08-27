"use client";

import { useState } from "react";
import { CatalogCard } from "@/components/catalog/catalog-card";
import { DevicePreview, type Device } from "@/components/ui-demos/device-preview";
import { UiDemo } from "@/components/ui-demos/registry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CatalogItem } from "@/types/catalog";

export function UIDemoCard({ item }: { item: CatalogItem }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CatalogCard
        item={item}
        onOpen={() => setOpen(true)}
        preview={
          <div className="relative h-full overflow-hidden">
            {item.demoId ? <UiDemo id={item.demoId} /> : null}
            <div className="from-background/90 pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t to-transparent" />
          </div>
        }
      />
      <UiDemoModal item={item} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function UiDemoModal({
  item,
  open,
  onOpenChange,
}: {
  item: CatalogItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94vh] overflow-y-auto sm:max-w-5xl lg:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="font-display">{item.name}</DialogTitle>
          <DialogDescription>
            {item.description} Toca, escribe y cambia de vista: es una interfaz viva, no una captura.
          </DialogDescription>
        </DialogHeader>
        <DevicePreview device={device} onDeviceChange={setDevice}>
          {item.demoId ? <UiDemo id={item.demoId} /> : null}
        </DevicePreview>
      </DialogContent>
    </Dialog>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main-content" className="container-page py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Página no encontrada</h1>
      <p className="text-muted-foreground mt-2">Esa ruta no existe en el catálogo.</p>
      <Button asChild className="mt-6">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  );
}

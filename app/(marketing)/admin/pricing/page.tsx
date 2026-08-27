import type { Metadata } from "next";
import { PricingAdmin } from "@/components/admin/pricing-admin";

export const metadata: Metadata = {
  title: "Administración de precios",
  robots: { index: false, follow: false },
};

export default function AdminPricingPage() {
  return (
    <main id="main-content" className="container-page py-12">
      <PricingAdmin />
    </main>
  );
}

import type { ComponentType } from "react";
import {
  NavbarAnimatedDemo,
  NavbarBasicDemo,
  NavbarFloatingDemo,
  NavbarMegaDemo,
  NavbarTransparentDemo,
} from "@/components/ui-demos/navbars";
import {
  HeroAnimatedDemo,
  HeroMinimalDemo,
  HeroMockupDemo,
  HeroProductDemo,
  HeroSaasDemo,
  HeroVideoDemo,
} from "@/components/ui-demos/heroes";
import {
  CardDashboardDemo,
  CardFeatureDemo,
  CardPricingDemo,
  CardProductDemo,
  CardUserDemo,
} from "@/components/ui-demos/cards";
import {
  FormCheckoutDemo,
  FormContactDemo,
  FormLoginDemo,
  FormMultistepDemo,
  FormRecoveryDemo,
  FormRegisterDemo,
} from "@/components/ui-demos/forms";
import { DashboardKitDemo } from "@/components/ui-demos/dashboard";
import { EcommerceKitDemo } from "@/components/ui-demos/ecommerce";

export const uiDemoRegistry: Record<string, ComponentType> = {
  "navbar-basic": NavbarBasicDemo,
  "navbar-floating": NavbarFloatingDemo,
  "navbar-transparent": NavbarTransparentDemo,
  "navbar-mega": NavbarMegaDemo,
  "navbar-animated": NavbarAnimatedDemo,
  "hero-minimal": HeroMinimalDemo,
  "hero-saas": HeroSaasDemo,
  "hero-product": HeroProductDemo,
  "hero-animated": HeroAnimatedDemo,
  "hero-video": HeroVideoDemo,
  "hero-mockup": HeroMockupDemo,
  "card-pricing": CardPricingDemo,
  "card-product": CardProductDemo,
  "card-feature": CardFeatureDemo,
  "card-user": CardUserDemo,
  "card-dashboard": CardDashboardDemo,
  "form-login": FormLoginDemo,
  "form-register": FormRegisterDemo,
  "form-contact": FormContactDemo,
  "form-checkout": FormCheckoutDemo,
  "form-multistep": FormMultistepDemo,
  "form-recovery": FormRecoveryDemo,
  "dash-kit": DashboardKitDemo,
  "ecom-kit": EcommerceKitDemo,
};

export function UiDemo({ id }: { id: string }) {
  const Demo = uiDemoRegistry[id];
  if (!Demo) return <p className="text-muted-foreground p-6 text-sm">Demo no disponible.</p>;
  return <Demo />;
}

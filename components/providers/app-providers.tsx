"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { QuoteProvider } from "@/components/providers/quote-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider delayDuration={200}>
        <QuoteProvider>
          {children}
          <Toaster position="top-center" richColors />
        </QuoteProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

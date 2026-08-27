"use client";

import { templates, templatesByKind, type TemplateKind } from "@/data/templates";
import { TemplateCard } from "@/components/templates/template-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TemplateGallery({ defaultKind = "all" }: { defaultKind?: TemplateKind | "all" }) {
  return (
    <Tabs defaultValue={defaultKind}>
      <TabsList className="mb-6">
        <TabsTrigger value="all">Todas ({templates.length})</TabsTrigger>
        <TabsTrigger value="website">Páginas ({templatesByKind("website").length})</TabsTrigger>
        <TabsTrigger value="app">Apps ({templatesByKind("app").length})</TabsTrigger>
      </TabsList>
      {(["all", "website", "app"] as const).map((kind) => (
        <TabsContent key={kind} value={kind}>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {templatesByKind(kind).map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

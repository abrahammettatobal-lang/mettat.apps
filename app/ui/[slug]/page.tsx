import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplateBySlug, styleSlug, templates } from "@/data/templates";
import { StylePlayground } from "@/components/templates/style-playgrounds";
import { StyleSiteDock } from "@/components/templates/style-site-dock";
import { EmbedProvider } from "@/components/templates/embed-context";

export const dynamicParams = false;

export function generateStaticParams() {
  return templates.map((template) => ({ slug: styleSlug(template.styleName) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return {};
  return {
    title: { absolute: template.brand },
    description: template.styleName,
    robots: { index: false, follow: false },
  };
}

export default async function StyleSitePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const { slug } = await params;
  const { embed } = await searchParams;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  const embedded = embed === "1";

  return (
    <EmbedProvider embedded={embedded}>
      <StylePlayground id={template.id} />
      {!embedded ? <StyleSiteDock template={template} /> : null}
    </EmbedProvider>
  );
}

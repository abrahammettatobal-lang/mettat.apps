import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { stylePath, templates } from "@/data/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/plantillas", ...templates.map((template) => stylePath(template))];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/ui/") ? 0.6 : 0.7,
  }));
}

import type { MetadataRoute } from "next";
import { siteMetadata } from "@/shared/seo/site-metadata";
import { projects } from "@/shared/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: siteMetadata.siteUrl, priority: 1 },
    { url: `${siteMetadata.siteUrl}/projects`, priority: 0.8 },
    { url: `${siteMetadata.siteUrl}/contact`, priority: 0.7 },
    ...projects.map((project) => ({
      url: `${siteMetadata.siteUrl}/projects/${project.slug}`,
      priority: 0.6,
    })),
  ];

  return routes;
}

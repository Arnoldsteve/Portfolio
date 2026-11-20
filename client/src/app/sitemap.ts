import type { MetadataRoute } from "next";
import { caseStudies, siteUrl } from "@/content/site";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/contact",
    "/writing",
    ...Object.keys(caseStudies).map((slug) => `/work/${slug}`),
    ...posts.map((p) => `/writing/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, lastModified: new Date() }));
}

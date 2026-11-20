import type { MetadataRoute } from "next";
import { caseStudies, siteUrl } from "@/content/site";

// Only pages with real content; "coming soon" case studies stay out until written.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/contact", ...Object.keys(caseStudies).map((slug) => `/work/${slug}`)];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, lastModified: new Date() }));
}

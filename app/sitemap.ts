import type { MetadataRoute } from "next";
import { profile, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(profile.updated);
  return [{ url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 }];
}

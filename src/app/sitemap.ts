import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// Public, indexable pages. Redirect-only routes (/about, /contact,
// /terms-of-service) are left out so search engines index the real URLs.
const ROUTES: Array<[path: string, priority: number, changeFrequency: Freq]> = [
  ["", 1.0, "weekly"],
  ["/whatsapp-marketing", 0.9, "weekly"],
  ["/ai-automation", 0.9, "weekly"],
  ["/features", 0.9, "weekly"],
  ["/pricing", 0.9, "weekly"],
  ["/shared-team-inbox", 0.8, "monthly"],
  ["/crm", 0.8, "monthly"],
  ["/analytics", 0.8, "monthly"],
  ["/integrations", 0.8, "monthly"],
  ["/api-docs", 0.7, "monthly"],
  ["/enterprise", 0.7, "monthly"],
  ["/customer-stories", 0.7, "monthly"],
  ["/blog", 0.7, "weekly"],
  ["/book-demo", 0.7, "monthly"],
  ["/about-us", 0.6, "monthly"],
  ["/contact-us", 0.6, "monthly"],
  ["/careers", 0.5, "monthly"],
  ["/security", 0.5, "monthly"],
  ["/privacy-policy", 0.3, "yearly"],
  ["/terms-and-conditions", 0.3, "yearly"],
  ["/refund-policy", 0.3, "yearly"],
  ["/shipping-and-delivery", 0.3, "yearly"],
  ["/cookie-policy", 0.3, "yearly"],
  ["/data-deletion", 0.3, "yearly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
    ...(path === "" ? { images: [`${SITE_URL}/images/og-banner.jpg`] } : {}),
  }));
}

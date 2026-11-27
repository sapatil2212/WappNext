import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Keep crawlers on the public marketing site; the app, admin areas, auth
// screens and token links have nothing to index.
const PRIVATE_PATHS = [
  "/api/",
  "/admin/",
  "/admin-panel/",
  "/super-admin/",
  "/dashboard",
  "/inbox",
  "/contacts",
  "/campaigns",
  "/automations",
  "/flows",
  "/sequences",
  "/templates",
  "/pipelines",
  "/connections",
  "/settings",
  "/subscription",
  "/reviews",
  "/healthcare",
  "/review/",
  "/verify",
  "/auth/",
  "/login",
  "/signup",
  "/forgot-password",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

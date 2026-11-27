import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Security & Data Protection",
  description: "How WappNext protects your WhatsApp data: official Meta Cloud API, encrypted storage, tenant isolation and role-based access control.",
  path: "/security",
  keywords: ["WhatsApp data security","secure WhatsApp platform"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

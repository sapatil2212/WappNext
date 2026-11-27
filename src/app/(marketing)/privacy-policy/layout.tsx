import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How WappNext collects, uses and protects your data when you use our WhatsApp marketing and automation platform.",
  path: "/privacy-policy",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

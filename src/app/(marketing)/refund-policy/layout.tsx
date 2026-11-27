import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Refund Policy",
  description: "WappNext subscription, setup fee and refund terms, and how to raise a billing query.",
  path: "/refund-policy",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

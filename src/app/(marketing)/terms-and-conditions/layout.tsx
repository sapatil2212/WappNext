import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms that govern your use of the WappNext WhatsApp marketing and automation platform.",
  path: "/terms-and-conditions",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

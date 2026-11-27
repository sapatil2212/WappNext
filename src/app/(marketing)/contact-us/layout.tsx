import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact WappNext for WhatsApp Business API setup, pricing or support. Call +91 88305 53868 / +91 9168 08 1355 or email contactwappnext@gmail.com.",
  path: "/contact-us",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

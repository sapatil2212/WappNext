import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Careers",
  description: "Join the WappNext team in Pune and help businesses grow with WhatsApp marketing and automation.",
  path: "/careers",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

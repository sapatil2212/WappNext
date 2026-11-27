import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "About Us",
  description: "WappNext is a WhatsApp marketing and automation platform built in Pune, India by Brightwave Digital Products LLP to help businesses grow on WhatsApp.",
  path: "/about-us",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

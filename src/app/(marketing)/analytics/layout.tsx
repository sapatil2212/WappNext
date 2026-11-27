import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp Campaign Analytics & Reporting",
  description: "Track WhatsApp campaign delivery, read receipts, replies and conversions in real time, plus agent response times and team performance.",
  path: "/analytics",
  keywords: ["WhatsApp analytics","WhatsApp campaign reports","WhatsApp read receipts"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp Marketing Software Pricing: Plans from ₹999/month",
  description: "WhatsApp marketing software pricing: Self-Managed ₹999/month, Fully Managed ₹1,999/month or a custom plan, with 0% markup on Meta WhatsApp API fees.",
  path: "/pricing",
  keywords: ["WhatsApp API pricing","WhatsApp marketing software price","WhatsApp Business API cost India"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

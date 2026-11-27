import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Book a Free WhatsApp Automation Demo",
  description: "Book a free live demo of WappNext. See WhatsApp campaigns, the AI chatbot, team inbox and CRM working for your business.",
  path: "/book-demo",
  keywords: ["WhatsApp automation demo","WhatsApp marketing software demo"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

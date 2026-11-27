import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp Business API Integrations & Webhooks",
  description: "Connect WhatsApp to your tools with native integrations, webhooks and an open API. Sync leads, orders and payments into WappNext automatically.",
  path: "/integrations",
  keywords: ["WhatsApp integrations","WhatsApp API webhooks","WhatsApp Google Sheets integration"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp Business API Features: Inbox, Campaigns, Chatbot & CRM",
  description: "All WhatsApp Business API features in one place: team inbox, bulk campaigns, no-code chatbot, drip sequences, Click-to-WhatsApp ads, CRM and analytics.",
  path: "/features",
  keywords: ["WhatsApp Business API features","WhatsApp chatbot builder","WhatsApp drip campaigns","Click-to-WhatsApp ads"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

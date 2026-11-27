import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Official WhatsApp Marketing | Personalize WhatsApp Campaigns",
  absoluteTitle: true,
  description: "Run official WhatsApp marketing on the Business API. Send personalized bulk broadcasts, schedule campaigns and track delivered, read and reply rates.",
  path: "/whatsapp-marketing",
  keywords: ["WhatsApp marketing campaigns","personalized WhatsApp messages","bulk WhatsApp broadcast","WhatsApp campaign scheduler"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

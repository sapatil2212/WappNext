import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Enterprise WhatsApp Business Solution",
  description: "WhatsApp Business API for enterprises: multiple numbers and branches, role-based access, custom integrations, volume pricing and priority support.",
  path: "/enterprise",
  keywords: ["enterprise WhatsApp solution","WhatsApp for enterprise","WhatsApp Business API provider"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

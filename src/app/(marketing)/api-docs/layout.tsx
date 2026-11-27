import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp Business API Documentation for Developers",
  description: "Developer documentation for the WappNext WhatsApp API. Send WhatsApp messages from your server, CRM or app with simple REST calls and webhooks.",
  path: "/api-docs",
  keywords: ["WhatsApp API documentation","send WhatsApp message API","WhatsApp REST API"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

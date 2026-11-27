import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp CRM to Manage Leads & Sales Pipelines",
  description: "A WhatsApp CRM for leads that start on WhatsApp. Track contacts, tags and deals in visual pipelines and follow up automatically before leads go cold.",
  path: "/crm",
  keywords: ["WhatsApp CRM","WhatsApp lead management","WhatsApp sales pipeline"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Customer Stories: WhatsApp Automation Results",
  description: "See how clinics, retailers and service businesses use WappNext WhatsApp automation to reply faster, book more appointments and close more sales.",
  path: "/customer-stories",
  keywords: ["WhatsApp automation case studies","WhatsApp marketing success stories"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

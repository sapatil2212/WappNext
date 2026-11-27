import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp Marketing Blog: Tips, Guides & Updates",
  description: "Guides and tips on WhatsApp marketing, the WhatsApp Business API, chatbots, templates and growing your business on WhatsApp.",
  path: "/blog",
  keywords: ["WhatsApp marketing tips","WhatsApp Business API guide","WhatsApp marketing blog"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

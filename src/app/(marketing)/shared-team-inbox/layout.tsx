import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Shared WhatsApp Team Inbox for Sales & Support",
  description: "One WhatsApp number, unlimited agents. Assign chats, add private notes and reply to every customer from a shared WhatsApp team inbox.",
  path: "/shared-team-inbox",
  keywords: ["WhatsApp shared inbox","WhatsApp team inbox","multi-agent WhatsApp","WhatsApp customer support"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

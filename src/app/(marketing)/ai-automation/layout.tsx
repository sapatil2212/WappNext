import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "WhatsApp Automation Tool to Send Personalized Messages",
  description: "Automate WhatsApp with an AI chatbot trained on your documents. Send personalized messages, auto-reply 24/7, qualify leads and hand off to your team.",
  path: "/ai-automation",
  keywords: ["WhatsApp automation tool","WhatsApp AI chatbot","WhatsApp auto reply","automated WhatsApp messages"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

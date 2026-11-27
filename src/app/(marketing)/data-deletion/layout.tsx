import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

// SEO metadata for this page (the page itself is a client component).
export const metadata = pageMetadata({
  title: "Data Deletion Instructions",
  description: "How to delete your WappNext account and data, or request deletion from our support team.",
  path: "/data-deletion",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

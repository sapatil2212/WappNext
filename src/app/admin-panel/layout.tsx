import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin — WappNext",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

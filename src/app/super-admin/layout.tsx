import type { Metadata } from "next";

import { SuperAdminShell } from "./super-admin-shell";

export const metadata: Metadata = {
  title: "Super Admin — WappNext",
  description: "Super Admin Portal for WappNext",
  robots: { index: false, follow: false },
};

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return <SuperAdminShell>{children}</SuperAdminShell>;
}

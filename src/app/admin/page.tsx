import type { Metadata } from "next";
import { AdminBoard } from "@/components/admin/AdminBoard";

export const metadata: Metadata = {
  title: "שיחות שי",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminBoard />;
}

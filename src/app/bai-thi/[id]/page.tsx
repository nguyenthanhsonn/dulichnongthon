import { redirect } from "next/navigation";

import type { PageProps } from "@/types/destination-route";

export default async function BaiThiRedirectPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/diem-den/${id}`);
}

import { redirect } from "next/navigation";

import type { PageProps } from "@/types/destination-route";

export default async function DiaDiemRedirectPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/diem-den/${id}`);
}


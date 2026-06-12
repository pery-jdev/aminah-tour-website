import { supabase } from "@/lib/supabase";
import PackagesClient from "./PackagesClient";

export const revalidate = 0;

export default async function PackagesPage() {
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading packages: {error.message}</div>;
  }

  return <PackagesClient packages={packages || []} />;
}

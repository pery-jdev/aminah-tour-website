import { supabase } from "@/lib/supabase";
import FacilitiesClient from "./FacilitiesClient";

export const revalidate = 0;

export default async function FacilitiesPage() {
  const { data: facilities, error } = await supabase
    .from("facilities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading facilities: {error.message}</div>;
  }

  return <FacilitiesClient facilities={facilities || []} />;
}

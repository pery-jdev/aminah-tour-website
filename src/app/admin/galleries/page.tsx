import { supabase } from "@/lib/supabase";
import GalleriesClient from "./GalleriesClient";

export const revalidate = 0;

export default async function GalleriesPage() {
  const { data: galleries, error } = await supabase
    .from("galleries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading galleries: {error.message}</div>;
  }

  return <GalleriesClient galleries={galleries || []} />;
}

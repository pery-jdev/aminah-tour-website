"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addPackage(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const duration_days = parseInt(formData.get("duration_days") as string);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const departure_date = formData.get("departure_date") as string || null;
  const airline = formData.get("airline") as string || null;
  const price_quad = formData.get("price_quad") as string || null;
  const price_triple = formData.get("price_triple") as string || null;
  const price_double = formData.get("price_double") as string || null;
  const included_facilities = formData.get("included_facilities") as string || null;
  const excluded_facilities = formData.get("excluded_facilities") as string || null;

  let image_url = "";
  const imageFile = formData.get("image") as File;
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, imageFile);
      
    if (uploadError) throw new Error("Gagal mengunggah gambar: " + uploadError.message);
    
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  } else {
    image_url = formData.get("image_url") as string;
  }

  const { error } = await supabase.from("packages").insert([
    { 
      title, description, duration_days, image_url, slug,
      departure_date, airline, price_quad, price_triple, price_double,
      included_facilities, excluded_facilities
    }
  ]);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/packages");
  revalidatePath("/");
}

export async function deletePackage(id: string) {
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/packages");
  revalidatePath("/");
}

export async function updatePackage(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const duration_days = parseInt(formData.get("duration_days") as string);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const departure_date = formData.get("departure_date") as string || null;
  const airline = formData.get("airline") as string || null;
  const price_quad = formData.get("price_quad") as string || null;
  const price_triple = formData.get("price_triple") as string || null;
  const price_double = formData.get("price_double") as string || null;
  const included_facilities = formData.get("included_facilities") as string || null;
  const excluded_facilities = formData.get("excluded_facilities") as string || null;

  let image_url = formData.get("image_url") as string;
  const imageFile = formData.get("image") as File;
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, imageFile);
      
    if (uploadError) throw new Error("Gagal mengunggah gambar: " + uploadError.message);
    
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("packages").update({
    title, description, duration_days, image_url, slug,
    departure_date, airline, price_quad, price_triple, price_double,
    included_facilities, excluded_facilities
  }).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/packages");
  revalidatePath("/");
}

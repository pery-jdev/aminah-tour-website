"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addFacility(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

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

  const { error } = await supabase.from("facilities").insert([
    { title, description, image_url }
  ]);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/facilities");
  revalidatePath("/");
}

export async function deleteFacility(id: string) {
  const { error } = await supabase.from("facilities").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/facilities");
  revalidatePath("/");
}

export async function updateFacility(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
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

  const { error } = await supabase.from("facilities").update({
    title, description, image_url
  }).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/facilities");
  revalidatePath("/");
}

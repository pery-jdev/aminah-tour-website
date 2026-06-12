"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addGallery(formData: FormData) {
  const title = formData.get("title") as string;
  let image_url = "";
  let video_url = formData.get("video_url") as string || null;

  const imageFile = formData.get("image") as File;
  const videoFile = formData.get("video") as File;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `gallery_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
    if (uploadError) throw new Error("Gagal mengunggah gambar: " + uploadError.message);
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  } else {
    image_url = formData.get("image_url") as string;
  }

  if (videoFile && videoFile.size > 0) {
    const fileExt = videoFile.name.split('.').pop();
    const fileName = `gallery_video_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, videoFile);
    if (uploadError) throw new Error("Gagal mengunggah video: " + uploadError.message);
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    video_url = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("galleries").insert([
    { title, image_url, video_url }
  ]);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/galleries");
  revalidatePath("/");
}

export async function deleteGallery(id: string) {
  const { error } = await supabase.from("galleries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/galleries");
  revalidatePath("/");
}

export async function updateGallery(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  let image_url = formData.get("image_url") as string;
  let video_url = formData.get("video_url") as string || null;

  const imageFile = formData.get("image") as File;
  const videoFile = formData.get("video") as File;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `gallery_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
    if (uploadError) throw new Error("Gagal mengunggah gambar: " + uploadError.message);
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    image_url = publicUrlData.publicUrl;
  }

  if (videoFile && videoFile.size > 0) {
    const fileExt = videoFile.name.split('.').pop();
    const fileName = `gallery_video_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, videoFile);
    if (uploadError) throw new Error("Gagal mengunggah video: " + uploadError.message);
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    video_url = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("galleries").update({
    title, image_url, video_url
  }).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/galleries");
  revalidatePath("/");
}

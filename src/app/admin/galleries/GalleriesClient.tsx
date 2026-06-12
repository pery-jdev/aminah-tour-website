"use client";

import { useState } from "react";
import { addGallery, deleteGallery, updateGallery } from "./actions";
import { Plus, Trash2, X, Video, Edit2 } from "lucide-react";

export default function GalleriesClient({ galleries }: { galleries: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await updateGallery(editingItem.id, new FormData(e.currentTarget));
        setEditingItem(null);
      } else {
        await addGallery(new FormData(e.currentTarget));
        setIsAdding(false);
      }
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus media ini?")) return;
    setLoading(true);
    try {
      await deleteGallery(id);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  }

  const showForm = isAdding || editingItem;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Kelola Galeri</h1>
        <button
          onClick={() => { setIsAdding(true); setEditingItem(null); }}
          className="flex items-center justify-center gap-2 bg-[#d4af37] text-black px-4 py-2.5 rounded-lg hover:bg-[#b5952f] transition-colors text-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          Tambah Media
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111] p-6 rounded-xl border border-[#333] shadow-sm relative">
          <button
            onClick={() => { setIsAdding(false); setEditingItem(null); }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold mb-4 text-white">
            {editingItem ? "Edit Media" : "Tambah Media Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Judul Media</label>
              <input name="title" required defaultValue={editingItem?.title} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="Contoh: Jamaah di Masjid Nabawi" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Upload Gambar (Wajib jika tidak ada video)</label>
              <input name="image" type="file" accept="image/*" className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#b5952f]" />
              <p className="text-xs text-gray-500 mt-1">Atau masukkan URL gambar jika tidak upload file:</p>
              <input name="image_url" type="url" defaultValue={editingItem?.image_url} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none mt-1" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Upload Video (Opsional, format .mp4)</label>
              <input name="video" type="file" accept="video/mp4" className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#b5952f]" />
              <p className="text-xs text-gray-500 mt-1">Atau masukkan URL video jika tidak upload file:</p>
              <input name="video_url" type="url" defaultValue={editingItem?.video_url} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none mt-1" placeholder="https://..." />
            </div>
            <div className="flex justify-end pt-4">
              <button disabled={loading} type="submit" className="w-full sm:w-auto bg-[#d4af37] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#b5952f] disabled:opacity-50">
                {loading ? "Menyimpan..." : (editingItem ? "Simpan Perubahan" : "Simpan Media")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleries.map((item) => (
          <div key={item.id} className="bg-[#111] rounded-xl border border-[#333] overflow-hidden shadow-sm flex flex-col relative group">
            {item.video_url ? (
              <div className="relative w-full h-48 bg-black">
                <video src={item.video_url} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ) : item.image_url ? (
              <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
            ) : null}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-sm mb-2 line-clamp-2">{item.title}</h3>
              <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-[#222]">
                <button
                  onClick={() => { setEditingItem(item); setIsAdding(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={loading}
                  className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                  title="Edit Media"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={loading}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Hapus Media"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {galleries.length === 0 && !showForm && (
          <div className="col-span-full text-center py-12 bg-[#111] rounded-xl border border-dashed border-[#333]">
            <p className="text-gray-500">Belum ada media galeri. Klik "Tambah Media" untuk membuat.</p>
          </div>
        )}
      </div>
    </div>
  );
}

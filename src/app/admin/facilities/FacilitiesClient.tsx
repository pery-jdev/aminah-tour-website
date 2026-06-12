"use client";

import { useState } from "react";
import { addFacility, deleteFacility, updateFacility } from "./actions";
import { Plus, Trash2, X, Edit2 } from "lucide-react";

export default function FacilitiesClient({ facilities }: { facilities: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingFac, setEditingFac] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingFac) {
        await updateFacility(editingFac.id, new FormData(e.currentTarget));
        setEditingFac(null);
      } else {
        await addFacility(new FormData(e.currentTarget));
        setIsAdding(false);
      }
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus fasilitas ini?")) return;
    setLoading(true);
    try {
      await deleteFacility(id);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  }

  const showForm = isAdding || editingFac;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Kelola Fasilitas</h1>
        <button
          onClick={() => { setIsAdding(true); setEditingFac(null); }}
          className="flex items-center justify-center gap-2 bg-[#d4af37] text-black px-4 py-2.5 rounded-lg hover:bg-[#b5952f] transition-colors text-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          Tambah Fasilitas
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111] p-6 rounded-xl border border-[#333] shadow-sm relative">
          <button
            onClick={() => { setIsAdding(false); setEditingFac(null); }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold mb-4 text-white">
            {editingFac ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nama Fasilitas</label>
              <input name="title" required defaultValue={editingFac?.title} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="Contoh: Hotel Bintang 5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Deskripsi Singkat</label>
              <textarea name="description" required defaultValue={editingFac?.description} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 h-24 focus:border-[#d4af37] focus:outline-none" placeholder="Deskripsi fasilitas..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Upload Gambar</label>
              <input name="image" type="file" accept="image/*" className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#b5952f]" />
              <p className="text-xs text-gray-500 mt-1">Atau masukkan URL gambar jika tidak upload file:</p>
              <input name="image_url" type="url" defaultValue={editingFac?.image_url} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none mt-1" placeholder="https://..." />
            </div>
            <div className="flex justify-end pt-4">
              <button disabled={loading} type="submit" className="w-full sm:w-auto bg-[#d4af37] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#b5952f] disabled:opacity-50">
                {loading ? "Menyimpan..." : (editingFac ? "Simpan Perubahan" : "Simpan Fasilitas")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilities.map((fac) => (
          <div key={fac.id} className="bg-[#111] rounded-xl border border-[#333] overflow-hidden shadow-sm flex flex-col">
            {fac.image_url && (
              <img src={fac.image_url} alt={fac.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg mb-2">{fac.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">{fac.description}</p>
              <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-[#222]">
                <button
                  onClick={() => { setEditingFac(fac); setIsAdding(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={loading}
                  className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                  title="Edit Fasilitas"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(fac.id)}
                  disabled={loading}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Hapus Fasilitas"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {facilities.length === 0 && !showForm && (
          <div className="col-span-full text-center py-12 bg-[#111] rounded-xl border border-dashed border-[#333]">
            <p className="text-gray-500">Belum ada fasilitas. Klik "Tambah Fasilitas" untuk membuat.</p>
          </div>
        )}
      </div>
    </div>
  );
}

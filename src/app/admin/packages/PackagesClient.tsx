"use client";

import { useState } from "react";
import { addPackage, deletePackage, updatePackage } from "./actions";
import { Plus, Trash2, X, Edit2 } from "lucide-react";

export default function PackagesClient({ packages }: { packages: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingPkg, setEditingPkg] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingPkg) {
        await updatePackage(editingPkg.id, new FormData(e.currentTarget));
        setEditingPkg(null);
      } else {
        await addPackage(new FormData(e.currentTarget));
        setIsAdding(false);
      }
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus paket ini?")) return;
    setLoading(true);
    try {
      await deletePackage(id);
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  }

  const showForm = isAdding || editingPkg;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Kelola Paket Umroh</h1>
        <button
          onClick={() => { setIsAdding(true); setEditingPkg(null); }}
          className="flex items-center justify-center gap-2 bg-[#d4af37] text-black px-4 py-2.5 rounded-lg hover:bg-[#b5952f] transition-colors text-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          Tambah Paket
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111] p-6 rounded-xl border border-[#333] shadow-sm relative">
          <button
            onClick={() => { setIsAdding(false); setEditingPkg(null); }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold mb-4 text-white">
            {editingPkg ? "Edit Paket" : "Tambah Paket Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nama Paket</label>
                <input name="title" required defaultValue={editingPkg?.title} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="Contoh: Umrah Reguler 9 Hari" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Durasi (Hari)</label>
                <input name="duration_days" type="number" required defaultValue={editingPkg?.duration_days} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="9" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tanggal Keberangkatan</label>
                <input name="departure_date" type="date" defaultValue={editingPkg?.departure_date} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Maskapai</label>
                <input name="airline" type="text" defaultValue={editingPkg?.airline} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="Contoh: Saudi Airlines" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Harga Quad (4 Orang)</label>
                <input name="price_quad" type="text" defaultValue={editingPkg?.price_quad} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="Rp 29.750.000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Harga Triple (3 Orang)</label>
                <input name="price_triple" type="text" defaultValue={editingPkg?.price_triple} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="Rp 31.250.000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Harga Double (2 Orang)</label>
                <input name="price_double" type="text" defaultValue={editingPkg?.price_double} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none" placeholder="Rp 33.650.000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Deskripsi Singkat</label>
              <textarea name="description" required defaultValue={editingPkg?.description} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 h-20 focus:border-[#d4af37] focus:outline-none" placeholder="Deskripsi paket..."></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fasilitas Termasuk (Pisahkan dengan baris baru / Enter)</label>
                <textarea name="included_facilities" defaultValue={editingPkg?.included_facilities} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 h-32 focus:border-[#d4af37] focus:outline-none" placeholder="Tiket Pesawat PP&#10;Visa Umrah&#10;Hotel Bintang 5..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fasilitas Tidak Termasuk (Pisahkan dengan baris baru / Enter)</label>
                <textarea name="excluded_facilities" defaultValue={editingPkg?.excluded_facilities} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 h-32 focus:border-[#d4af37] focus:outline-none" placeholder="Paspor & Suntik Meningitis&#10;Pengeluaran Pribadi..."></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Upload Gambar Cover</label>
              <input name="image" type="file" accept="image/*" className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#b5952f]" />
              <p className="text-xs text-gray-500 mt-1">Atau masukkan URL gambar jika tidak upload file:</p>
              <input name="image_url" type="url" defaultValue={editingPkg?.image_url} className="w-full bg-[#222] border border-[#333] text-white rounded-md p-2.5 focus:border-[#d4af37] focus:outline-none mt-1" placeholder="https://..." />
            </div>
            <div className="flex justify-end pt-4">
              <button disabled={loading} type="submit" className="w-full sm:w-auto bg-[#d4af37] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#b5952f] disabled:opacity-50">
                {loading ? "Menyimpan..." : (editingPkg ? "Simpan Perubahan" : "Simpan Paket")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-[#111] rounded-xl border border-[#333] overflow-hidden shadow-sm flex flex-col">
            {pkg.image_url && (
              <img src={pkg.image_url} alt={pkg.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg">{pkg.title}</h3>
              <p className="text-sm text-[#d4af37] font-medium mb-2">{pkg.duration_days} Hari</p>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{pkg.description}</p>
              <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-[#222]">
                <button
                  onClick={() => { setEditingPkg(pkg); setIsAdding(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={loading}
                  className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                  title="Edit Paket"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  disabled={loading}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Hapus Paket"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {packages.length === 0 && !showForm && (
          <div className="col-span-full text-center py-12 bg-[#111] rounded-xl border border-dashed border-[#333]">
            <p className="text-gray-500">Belum ada paket umroh. Klik "Tambah Paket" untuk membuat.</p>
          </div>
        )}
      </div>
    </div>
  );
}

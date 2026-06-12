import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0; // Ensures fresh data is fetched on load

export default async function PackageDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  
  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", resolvedParams.id)
    .single();

  if (error || !pkg) {
    notFound();
  }

  // Parse included/excluded facilities safely
  const include = pkg.included_facilities ? pkg.included_facilities.split('\n').filter((i: string) => i.trim() !== '') : [];
  const exclude = pkg.excluded_facilities ? pkg.excluded_facilities.split('\n').filter((i: string) => i.trim() !== '') : [];

  // Default image if none provided
  const image = pkg.image_url || "https://images.unsplash.com/photo-1565552643982-2d174eb6a506?w=1000&q=80";

  // Build prices array
  const prices = [];
  if (pkg.price_quad) prices.push({ type: "Quad", note: "4 Orang / Kamar", amount: pkg.price_quad });
  if (pkg.price_triple) prices.push({ type: "Triple", note: "3 Orang / Kamar", amount: pkg.price_triple });
  if (pkg.price_double) prices.push({ type: "Double", note: "2 Orang / Kamar", amount: pkg.price_double });

  const waMessage = `Halo Aminah Tour Jepara, saya tertarik dengan ${pkg.title}. Boleh minta informasi lebih lanjut?`;

  return (
    <div className="find-journey-bg min-h-screen pt-28 pb-20">
      <div className="page-header">
        <h1 className="page-title">{pkg.title}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-10">
        <Link href="/#offers" className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-[#d4af37] transition-colors mb-8 uppercase tracking-widest">
          <i className="fas fa-arrow-left"></i> Kembali ke Daftar Paket
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
          
          {/* Kolom Kiri - Gambar & Info */}
          <div>
            <div className="rounded overflow-hidden aspect-16/10 mb-10 border border-[#333]">
              <img 
                src={image} 
                alt={pkg.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mb-10 bg-[#1a1a1a] p-10 rounded border border-[#333]">
              <h3 className="font-serif text-2xl text-[#d4af37] mb-6">Informasi Perjalanan</h3>
              
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#333]">
                <div className="flex gap-4">
                  <div>
                    <div className="text-[13px] font-semibold text-white">Jakarta (CGK)</div>
                    <div className="text-[12px] text-gray-400">Indonesia</div>
                  </div>
                  <div className="text-gray-500 flex items-center px-4"><i className="fas fa-plane"></i></div>
                  <div className="text-right">
                    <div className="text-[13px] font-semibold text-white">Jeddah (JED)</div>
                    <div className="text-[12px] text-gray-400">Arab Saudi</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 mb-6">
                <div className="inline-flex items-center gap-2 text-[12px] text-gray-400 uppercase tracking-wide">
                  <i className="far fa-moon text-[#d4af37]"></i> {pkg.duration_days} Hari
                </div>
                {pkg.departure_date && (
                  <div className="inline-flex items-center gap-2 text-[12px] text-gray-400 uppercase tracking-wide">
                    <i className="far fa-calendar-check text-[#d4af37]"></i> {new Date(pkg.departure_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}
                {pkg.airline && (
                  <div className="inline-flex items-center gap-2 text-[12px] text-gray-400 uppercase tracking-wide">
                    <i className="fas fa-plane-departure text-[#d4af37]"></i> {pkg.airline}
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{pkg.description}</p>
            </div>

            {include.length > 0 && (
              <div className="bg-[#1a1a1a] p-10 rounded border border-[#333] mb-10">
                <h3 className="font-serif text-2xl text-white mb-6">Fasilitas Termasuk</h3>
                <ul className="list-none m-0 p-0">
                  {include.map((item: string, idx: number) => (
                    <li key={idx} className="text-[13px] text-gray-400 leading-[1.8] py-3 border-b border-[#333] relative pl-6 last:border-0">
                      <span className="absolute left-0 text-[#d4af37]">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exclude.length > 0 && (
              <div className="bg-[#1a1a1a] p-10 rounded border border-[#333]">
                <h3 className="font-serif text-2xl text-white mb-6">Belum Termasuk</h3>
                <ul className="list-none m-0 p-0">
                  {exclude.map((item: string, idx: number) => (
                    <li key={idx} className="text-[13px] text-gray-400 leading-[1.8] py-3 border-b border-[#333] relative pl-6 last:border-0">
                      <span className="absolute left-0 text-red-500">×</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Kolom Kanan - Pricing Card */}
          <div>
            <div className="bg-[#1a1a1a] border border-[#d4af37] rounded p-10 lg:sticky lg:top-[100px]">
              <h2 className="font-serif text-[28px] text-[#d4af37] mb-8 text-center">
                Pilih Kamar Anda
              </h2>
              
              <div className="mb-10">
                {prices.length > 0 ? prices.map((price: any, idx: number) => (
                  <div 
                    key={idx} 
                    className={`flex justify-between items-end py-5 ${
                      idx !== prices.length - 1 ? "border-b border-[#333]" : ""
                    }`}
                  >
                    <div>
                      <div className="text-[14px] text-gray-400 mb-1">Mulai dari</div>
                      <div className="text-[24px] font-semibold text-white transition-colors hover:text-[#d4af37]">
                        {price.amount}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider">{price.type} ({price.note})</div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 text-sm py-4 border-b border-[#333]">
                    Harga belum tersedia.<br/>Silakan hubungi kami.
                  </div>
                )}
              </div>

              <a 
                href={`https://wa.me/6285746386927?text=${encodeURIComponent(waMessage)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] text-white border-none text-[13px] font-medium tracking-[1px] uppercase cursor-pointer rounded flex items-center justify-center gap-2.5 transition-colors duration-300 hover:bg-[#128C7E] no-underline"
              >
                <i className="fab fa-whatsapp text-lg"></i> Konsultasi & Pesan via WA
              </a>
              <p className="text-center text-[11px] text-gray-500 mt-4">
                *Harga dapat berubah sewaktu-waktu sesuai kurs & maskapai
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

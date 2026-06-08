import Link from "next/link";

const packageData: Record<string, any> = {
  "umrah-reguler": {
    title: "Umrah Reguler 9 Hari",
    duration: "9 Malam Perjalanan",
    image: "https://images.unsplash.com/photo-1565552643982-2d174eb6a506?w=1000&q=80",
    include: [
      "Tiket Pesawat PP Kelas Ekonomi",
      "Visa Umrah",
      "Hotel Makkah: Le Meridien Towers / Setaraf (Bintang 5)",
      "Hotel Madinah: Taiba Front / Setaraf (Bintang 5)",
      "Makan 3x sehari menu Indonesia",
      "Transportasi Bus VIP Full AC",
      "Muthawif / Pembimbing Ibadah Berpengalaman",
      "Air Zam-zam 5 Liter (Jika diizinkan maskapai)",
      "Perlengkapan Umrah Eksklusif (Koper, Tas, Ihram/Mukena)",
    ],
    exclude: [
      "Paspor & Suntik Meningitis",
      "Pengeluaran Pribadi (Laundry, Telp, dll)",
      "Kelebihan Bagasi",
      "Biaya Mahram (Bila diperlukan)",
    ],
    prices: [
      { type: "Quad", note: "4 Orang / Kamar", amount: "Rp 29.750.000" },
      { type: "Triple", note: "3 Orang / Kamar", amount: "Rp 31.250.000" },
      { type: "Double", note: "2 Orang / Kamar", amount: "Rp 33.650.000" },
    ],
    waMessage: "Halo Aminah Tour Jepara, saya tertarik dengan Paket Umrah Reguler 9 Hari. Boleh minta informasi lebih lanjut?",
    ship: "Pesawat Saudi Airlines",
  },
  "umrah-plus-turki": {
    title: "Umrah Plus Turki",
    duration: "12 Malam Perjalanan",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1000&q=80",
    include: [
      "Tiket Pesawat PP Kelas Ekonomi",
      "Visa Umrah & Visa Turki",
      "Hotel Bintang 5 di Makkah, Madinah, Istanbul, dan Cappadocia",
      "Makan 3x sehari",
      "City Tour Turki (Cappadocia, Bosphorus Cruise)",
      "Muthawif & Guide Lokal Berbahasa Indonesia",
    ],
    exclude: ["Paspor", "Pengeluaran Pribadi", "Hot Air Balloon (Opsional)"],
    prices: [
      { type: "Quad", note: "4 Orang / Kamar", amount: "Rp 38.500.000" },
    ],
    waMessage: "Halo Aminah Tour Jepara, saya tertarik dengan Paket Umrah Plus Turki. Boleh minta informasi lebih lanjut?",
    ship: "Pesawat Turkish Airlines",
  },
  "umrah-ramadhan": {
    title: "Umrah Spesial Ramadhan",
    duration: "14 Malam Perjalanan",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=1000&q=80",
    include: ["Tiket PP", "Visa Umrah Ramadhan", "Hotel Berbuka & Sahur", "Bus AC", "Muthawif Pembimbing"],
    exclude: ["Paspor", "Pengeluaran Pribadi"],
    prices: [
      { type: "Quad", note: "4 Orang / Kamar", amount: "Rp 42.000.000" },
    ],
    waMessage: "Halo Aminah Tour Jepara, saya tertarik dengan Paket Umrah Spesial Ramadhan. Boleh minta informasi lebih lanjut?",
    ship: "Pesawat Garuda Indonesia",
  }
};

export default async function PackageDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const data = packageData[resolvedParams.id] || packageData["umrah-reguler"];

  return (
    <div className="find-journey-bg min-h-screen pt-28 pb-20">
      <div className="page-header">
        <h1 className="page-title">{data.title}</h1>
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
                src={data.image} 
                alt={data.title} 
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
                  <i className="far fa-moon text-[#d4af37]"></i> {data.duration}
                </div>
                <div className="inline-flex items-center gap-2 text-[12px] text-gray-400 uppercase tracking-wide">
                  <i className="fas fa-plane-departure text-[#d4af37]"></i> {data.ship}
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-10 rounded border border-[#333] mb-10">
              <h3 className="font-serif text-2xl text-white mb-6">Fasilitas Termasuk</h3>
              <ul className="list-none m-0 p-0">
                {data.include.map((item: string, idx: number) => (
                  <li key={idx} className="text-[13px] text-gray-400 leading-[1.8] py-3 border-b border-[#333] relative pl-6 last:border-0">
                    <span className="absolute left-0 text-[#d4af37]">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1a1a1a] p-10 rounded border border-[#333]">
              <h3 className="font-serif text-2xl text-white mb-6">Belum Termasuk</h3>
              <ul className="list-none m-0 p-0">
                {data.exclude.map((item: string, idx: number) => (
                  <li key={idx} className="text-[13px] text-gray-400 leading-[1.8] py-3 border-b border-[#333] relative pl-6 last:border-0">
                    <span className="absolute left-0 text-red-500">×</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kolom Kanan - Pricing Card */}
          <div>
            <div className="bg-[#1a1a1a] border border-[#d4af37] rounded p-10 lg:sticky lg:top-[100px]">
              <h2 className="font-serif text-[28px] text-[#d4af37] mb-8 text-center">
                Pilih Kamar Anda
              </h2>
              
              <div className="mb-10">
                {data.prices.map((price: any, idx: number) => (
                  <div 
                    key={idx} 
                    className={`flex justify-between items-end py-5 ${
                      idx !== data.prices.length - 1 ? "border-b border-[#333]" : ""
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
                ))}
              </div>

              <a 
                href={`https://wa.me/6285746386927?text=${encodeURIComponent(data.waMessage)}`} 
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

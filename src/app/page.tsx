import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import TypingTitle from "@/components/TypingTitle";
import { CustomDatePicker } from "@/components/ui/date-picker";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Ensures fresh data is fetched on load (for CMS)

export default async function Home() {
  const [packagesRes, facilitiesRes, galleriesRes] = await Promise.all([
    supabase.from("packages").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("facilities").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("galleries").select("*").order("created_at", { ascending: false }).limit(4),
  ]);

  const packages = packagesRes.data || [];
  const facilities = facilitiesRes.data || [];
  const galleries = galleriesRes.data || [];

  return (
    <>
      <section className="hero">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        >
          <source src="/makkah1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50 z-1 pointer-events-none"></div>
        <div className="hero-content relative z-10">
          <div className="font-arabic text-3xl md:text-5xl text-[#d4af37] mb-4 opacity-80" style={{ fontFamily: 'var(--font-noto-arabic)' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
          <TypingTitle 
            text="Siap Umroh" 
            className="hero-title" 
            style={{ fontFamily: 'var(--font-playfair)' }} 
          />
          <p className="hero-subtitle">Mewujudkan niat suci Anda bersama Aminah Tour Jepara dengan pelayanan premium.</p>
          <div className="search-bar">
            <Link href="/paket/umrah-reguler" className="search-field">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <span className="label">Keberangkatan?</span>
                <span>Makkah & Madinah</span>
              </div>
            </Link>
            <div className="search-field">
              <i className="far fa-calendar-alt z-10"></i>
              <CustomDatePicker />
            </div>
            <Link href="#offers" className="search-btn text-center block" style={{lineHeight: '18px'}}>
              Cek Keberangkatan
            </Link>
          </div>
        </div>
        <Link href="#offers" className="explore-more">
          <span>Eksplor Lebih Lanjut</span>
          <i className="fas fa-chevron-down"></i>
        </Link>
      </section>

      <section className="offers-section" id="offers">
        <h2 className="section-title">Eksplorasi Paket Pilihan Kami</h2>
        <div className="offers-grid">
          {packages.length > 0 ? packages.map((pkg) => (
            <Link key={pkg.id} href={`/paket/${pkg.slug}`} className="block no-underline">
              <SpotlightCard className="offer-card !p-6 !border-[#333] h-full" spotlightColor="rgba(212, 175, 55, 0.25)">
                <div className="offer-img-wrap">
                  <img src={pkg.image_url || "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80"} className="offer-img" alt={pkg.title} />
                </div>
                <h3 className="offer-title">{pkg.title}</h3>
                <p className="offer-desc line-clamp-2">{pkg.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[#d4af37] font-medium text-sm">{pkg.duration_days} Hari</span>
                  <span className="offer-link">Lihat Detail</span>
                </div>
              </SpotlightCard>
            </Link>
          )) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              Belum ada paket yang tersedia.
            </div>
          )}
        </div>
      </section>

      <section className="quote-section">
        <p className="quote-text"><em>Hati yang tenang</em> berawal dari perjalanan yang <em>dipersiapkan dengan baik.</em></p>
      </section>

      {galleries.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-black">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#d4af37] mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>Galeri Perjalanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {galleries.map((item) => (
              <div key={item.id} className="relative aspect-square overflow-hidden rounded-xl group">
                {item.video_url ? (
                  <video src={item.video_url} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="destinations-section" id="fasilitas">
        <div className="destinations-header">
          <div>
            <h2 className="destinations-title">Destinasi Ziarah Utama</h2>
            <p className="destinations-subtitle">Mengunjungi tempat-tempat bersejarah Islam yang penuh berkah di Makkah dan Madinah.</p>
          </div>
        </div>
        <div className="destinations-grid">
          <div className="destination-card">
            <div className="destination-img-wrap">
              <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80" className="destination-img" alt="Makkah" />
            </div>
            <div className="destination-name">MAKKAH AL-MUKARRAMAH</div>
          </div>
          <div className="destination-card">
            <div className="destination-img-wrap">
              <img src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80" className="destination-img" alt="Madinah" />
            </div>
            <div className="destination-name">MADINAH AL-MUNAWWARAH</div>
          </div>
        </div>
      </section>

      <section className="life-onboard">
        <h2 className="life-onboard-title">Kenyamanan & Fasilitas Premium</h2>
        <div className="onboard-grid">
          {facilities.length > 0 ? facilities.map((fac) => (
            <div key={fac.id} className="onboard-card">
              <div className="onboard-img-wrap">
                <img src={fac.image_url || "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80"} className="onboard-img" alt={fac.title} />
              </div>
              <h3 className="onboard-name">{fac.title}</h3>
              <p className="onboard-desc line-clamp-3">{fac.description}</p>
            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              Belum ada fasilitas yang ditambahkan.
            </div>
          )}
        </div>
      </section>

      <section className="inclusions-section">
        <div className="inclusions-content">
          <h2 className="inclusions-title">Yang Termasuk dalam Paket Perjalanan Anda</h2>
          <ul className="inclusions-list">
            <li>Tiket pesawat kelas ekonomi pulang pergi (PP)</li>
            <li>Visa Umrah resmi</li>
            <li>Akomodasi hotel mewah di Makkah & Madinah</li>
            <li>Makanan prasmanan 3 kali sehari</li>
            <li>Transportasi darat eksklusif selama di Arab Saudi</li>
            <li>Muthawif pembimbing ibadah yang berpengalaman dan berilmu</li>
            <li>Ziarah/City tour di Makkah dan Madinah</li>
            <li>Air Zam-zam 5 Liter (jika diizinkan maskapai penerbangan)</li>
            <li>Perlengkapan umrah premium (koper, tas, kain ihram/mukena)</li>
          </ul>
        </div>
        <div className="inclusions-img-wrap">
          <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&q=80" className="inclusions-img" alt="Inclusions" />
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import TypingTitle from "@/components/TypingTitle";
import { CustomDatePicker } from "@/components/ui/date-picker";

export default function Home() {
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
            <Link href="/paket/umrah-reguler" className="search-btn text-center block" style={{lineHeight: '18px'}}>
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
          <Link href="/paket/umrah-reguler" className="block no-underline">
            <SpotlightCard className="offer-card !p-6 !border-[#333] h-full" spotlightColor="rgba(212, 175, 55, 0.25)">
              <div className="offer-img-wrap">
                <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80" className="offer-img" alt="Umrah Reguler" />
              </div>
              <h3 className="offer-title">Umrah Reguler 9 Hari</h3>
              <p className="offer-desc">Perjalanan spiritual 9 hari penuh makna dengan fasilitas lengkap dan pembimbing berpengalaman.</p>
              <span className="offer-link">Lihat Detail Paket</span>
            </SpotlightCard>
          </Link>

          <Link href="/paket/umrah-plus-turki" className="block no-underline">
            <SpotlightCard className="offer-card !p-6 !border-[#333] h-full" spotlightColor="rgba(212, 175, 55, 0.25)">
              <div className="offer-img-wrap">
                <img src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80" className="offer-img" alt="Umrah Plus Turki" />
              </div>
              <h3 className="offer-title">Umrah Plus Turki 12 Hari</h3>
              <p className="offer-desc">Ibadah umrah dilanjutkan dengan menyusuri jejak sejarah Islam di Turki (Cappadocia & Istanbul).</p>
              <span className="offer-link">Lihat Detail Paket</span>
            </SpotlightCard>
          </Link>

          <Link href="/paket/umrah-ramadhan" className="block no-underline">
            <SpotlightCard className="offer-card !p-6 !border-[#333] h-full" spotlightColor="rgba(212, 175, 55, 0.25)">
              <div className="offer-img-wrap">
                <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80" className="offer-img" alt="Umrah Ramadhan" />
              </div>
              <h3 className="offer-title">Umrah Spesial Ramadhan</h3>
              <p className="offer-desc">Raih pahala setara haji bersama Rasulullah dengan beribadah di bulan suci Ramadhan.</p>
              <span className="offer-link">Lihat Detail Paket</span>
            </SpotlightCard>
          </Link>
        </div>
      </section>

      <section className="quote-section">
        <p className="quote-text"><em>Hati yang tenang</em> berawal dari perjalanan yang <em>dipersiapkan dengan baik.</em></p>
      </section>

      <section className="video-section">
        <video src="/umrah.mp4" poster="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=1200&q=80" autoPlay loop muted playsInline className="video-placeholder object-cover" />
        <div className="video-overlay">
          <div className="play-btn"><i className="fas fa-play"></i></div>
        </div>
        <div className="video-info">
          <span>Mari saksikan kebersamaan Jamaah Aminah Tour di Tanah Suci</span>
        </div>
      </section>

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
          <div className="destination-card">
            <div className="destination-img-wrap">
              <img src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80" className="destination-img" alt="Jabal Uhud" />
            </div>
            <div className="destination-name">JABAL UHUD</div>
          </div>
          <div className="destination-card">
            <div className="destination-img-wrap">
              <img src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80" className="destination-img" alt="Masjid Quba" />
            </div>
            <div className="destination-name">MASJID QUBA</div>
          </div>
        </div>
      </section>

      <section className="life-onboard">
        <h2 className="life-onboard-title">Kenyamanan & Fasilitas Premium</h2>
        <div className="onboard-grid">
          <div className="onboard-card">
            <div className="onboard-img-wrap">
              <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80" className="onboard-img" alt="Hotel" />
            </div>
            <h3 className="onboard-name">Akomodasi Bintang 5</h3>
            <p className="onboard-desc">Beristirahat di hotel berkelas dunia dengan jarak jalan kaki dari pelataran Masjid.</p>
            <span className="onboard-link">Lihat Detail Fasilitas</span>
          </div>
          <div className="onboard-card">
            <div className="onboard-img-wrap">
              <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80" className="onboard-img" alt="Dining" />
            </div>
            <h3 className="onboard-name">Cita Rasa Nusantara</h3>
            <p className="onboard-desc">Layanan katering prasmanan dengan menu khas Indonesia yang lezat setiap hari.</p>
            <span className="onboard-link">Lihat Menu Kami</span>
          </div>
          <div className="onboard-card">
            <div className="onboard-img-wrap">
              <img src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80" className="onboard-img" alt="Transport" />
            </div>
            <h3 className="onboard-name">Transportasi Eksklusif</h3>
            <p className="onboard-desc">Perjalanan yang mulus dengan Bus VIP Full AC selama ziarah dan perpindahan kota.</p>
            <span className="onboard-link">Lihat Armada Kami</span>
          </div>
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

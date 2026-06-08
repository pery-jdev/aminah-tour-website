"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="logo">
          <div className="logo-icon"><i className="fas fa-kaaba text-[18px]"></i></div>
          <div>
            <div className="logo-text">Aminah Tour</div>
            <div className="logo-sub">Jepara</div>
          </div>
        </Link>
        <nav>
          <ul className="nav-main">
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/#offers">Paket Umrah</Link></li>
            <li><Link href="/#fasilitas">Fasilitas</Link></li>
            <li><Link href="/#galeri">Galeri</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <a 
            href="https://wa.me/6285746386927?text=Halo%20Aminah%20Tour%20Jepara,%20saya%20ingin%20bertanya%20seputar%20Umrah." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-contact"
          >
            <i className="fab fa-whatsapp mr-2"></i> Konsultasi
          </a>
          <button className="btn-reserve">Pesan Sekarang</button>
        </div>
      </div>
    </header>
  );
}

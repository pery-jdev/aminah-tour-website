export default function Footer() {
  return (
    <>
      <div className="newsletter">
        <div className="newsletter-text">Dapatkan info paket Umrah promo dan berita terbaru</div>
        <div className="newsletter-form">
          <input type="email" className="newsletter-input" placeholder="Alamat email Anda" />
          <button className="newsletter-btn">Berlangganan</button>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h4 className="footer-col-title">Jelajahi</h4>
            <ul className="footer-links">
              <li><a href="/#offers">Paket Umrah Reguler</a></li>
              <li><a href="/#offers">Umrah Plus Turki</a></li>
              <li><a href="/#offers">Umrah Ramadhan</a></li>
              <li><a href="/#fasilitas">Fasilitas Hotel & Pesawat</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Informasi</h4>
            <ul className="footer-links">
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Panduan Umrah</a></li>
              <li><a href="#">Hubungi Kami</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Kontak</h4>
            <div className="footer-contact-item">
              <i className="fas fa-phone"></i>
              <div className="footer-contact-text">
                +62 857-4638-6927
                <small>Senin-Jumat: 08:00 - 16:00 WIB</small>
              </div>
            </div>
            <div className="footer-contact-item">
              <i className="far fa-envelope"></i>
              <div className="footer-contact-text">info@aminahtour.com</div>
            </div>
          </div>
          <div>
            <h4 className="footer-col-title">Ikuti Kami</h4>
            <div className="footer-social">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">© 2026 Aminah Tour Jepara. Hak cipta dilindungi.</div>
          <div className="footer-legal">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Notice</a>
          </div>
        </div>
      </footer>
    </>
  );
}

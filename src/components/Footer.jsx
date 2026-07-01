import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Câu chuyện', href: '#story-display' },
  { label: 'Tính năng', href: '#features' },
  { label: 'Thông số', href: '#specs' },
  { label: 'Đăng ký', href: '#newsletter' },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#" className="footer__logo" aria-label="VisionX Home">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="fLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#fLogo)"/>
              <text x="50" y="68" fontFamily="Arial Black" fontSize="50" fill="white" textAnchor="middle" fontWeight="bold">V</text>
            </svg>
            <span>VisionX</span>
          </a>
          <p className="footer__tagline">Nhìn thấy tương lai qua đôi mắt AI.</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__bottom">
          <p>© 2026 VisionX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

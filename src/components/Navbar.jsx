import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#story-display', label: 'Giới Thiệu' },
  { href: '#features', label: 'Tính năng' },
  { href: '#specs', label: 'Thông số' },
  { href: '#products', label: 'Sản phẩm' },
  { href: '#newsletter', label: 'Đăng ký' },
];

export default function Navbar({ theme, onToggleTheme, cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const sections = [
      { id: 'story-display', link: '#story-display' },
      { id: 'story-ai', link: '#story-display' },
      { id: 'story-design', link: '#story-display' },
      { id: 'features', link: '#features' },
      { id: 'products', link: '#products' },
      { id: 'specs', link: '#specs' },
      { id: 'newsletter', link: '#newsletter' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find((s) => s.id === entry.target.id);
            if (matched) setActiveLink(matched.link);
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} id="navbar">
      <nav className="navbar__inner container">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="VisionX Home" onClick={() => setActiveLink('')}>
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" />
            <text x="50" y="68" fontFamily="Arial Black" fontSize="50" fill="white" textAnchor="middle" fontWeight="bold">V</text>
          </svg>
          <span className="navbar__brand">VisionX</span>
        </a>

        {/* Nav links */}
        <ul className={`navbar__links${mobileOpen ? ' navbar__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link${activeLink === link.href ? ' navbar__link--active' : ''}`}
                onClick={() => { setMobileOpen(false); setActiveLink(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="navbar__controls">
          {/* Theme toggle */}
          <button
            className="navbar__icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            id="theme-toggle"
            data-track="theme_toggle"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Cart icon */}
          <button
            className="navbar__icon-btn navbar__cart-btn"
            onClick={onOpenCart}
            aria-label={`Giỏ hàng (${cartCount} sản phẩm)`}
            id="cart-btn"
            data-track="cart_open"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="navbar__cart-badge" aria-label={`${cartCount} items`}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* CTA */}
          <a
            href="#newsletter"
            className="btn btn-primary navbar__cta"
            onClick={() => setActiveLink('#newsletter')}
            data-track="navbar_preorder"
          >
            Đặt Trước
          </a>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger${mobileOpen ? ' active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="menu-toggle"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}

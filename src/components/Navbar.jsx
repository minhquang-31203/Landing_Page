import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#story-display', label: 'Giới Thiệu' },
  { href: '#features', label: 'Tính năng' },
  { href: '#specs', label: 'Thông số' },
  { href: '#newsletter', label: 'Đăng ký' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = [
      { id: 'story-display', link: '#story-display' },
      { id: 'story-ai', link: '#story-display' },
      { id: 'story-design', link: '#story-display' },
      { id: 'features', link: '#features' },
      { id: 'specs', link: '#specs' },
      { id: 'newsletter', link: '#newsletter' },
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies the viewport middle
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = sections.find((s) => s.id === entry.target.id);
          if (matched) {
            setActiveLink(matched.link);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} id="navbar">
      <nav className="navbar__inner container">
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

        <ul className={`navbar__links${mobileOpen ? ' navbar__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link${activeLink === link.href ? ' navbar__link--active' : ''}`}
                onClick={() => {
                  setMobileOpen(false);
                  setActiveLink(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#newsletter" className="btn btn-primary navbar__cta" onClick={() => setActiveLink('#newsletter')}>
          Đặt Trước
        </a>

        <button
          className={`navbar__hamburger${mobileOpen ? ' active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="menu-toggle"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  );
}

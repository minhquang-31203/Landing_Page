import { useState } from 'react';
import { useElementProgress } from '../hooks/useParallax';
import './ParallaxNewsletter.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function ParallaxNewsletter() {
  const [ref, progress] = useElementProgress();
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Parallax đơn giản: dùng progress trực tiếp
  const cardY = 60 * (1 - progress);
  const cardScale = 0.92 + progress * 0.08;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setStatus('error');
      setErrorMsg('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('error');
      setErrorMsg('Email không hợp lệ.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.name, body: form.email, userId: 1 }),
      });
      if (!res.ok) throw new Error('Gửi thất bại');
      setStatus('success');
      setForm({ name: '', email: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <section className="px-newsletter section" id="newsletter" ref={ref}>
      <div className="px-newsletter__bg" aria-hidden="true">
        <div className="px-newsletter__orb px-newsletter__orb--1" />
        <div className="px-newsletter__orb px-newsletter__orb--2" />
      </div>

      <div className="container">
        <div
          className="px-newsletter__card"
          style={{
            opacity: progress,
            transform: `translateY(${cardY}px) scale(${cardScale})`,
          }}
        >
          <div className="px-newsletter__glow" aria-hidden="true" />

          <div className="px-newsletter__content">
            <span className="section-label">Giữ liên lạc</span>
            <h2 className="section-title">Đăng Ký Nhận Tin <span className="gradient-text">Sớm Nhất</span></h2>
            <p className="section-subtitle">
              Đăng ký ngay để nhận ưu đãi đặc biệt dành riêng cho
              những người đầu tiên sở hữu VisionX Pro.
            </p>
          </div>

          {status === 'success' ? (
            <div className="px-newsletter__success">
              <div className="px-newsletter__success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="px-newsletter__success-title">Đăng Ký Thành Công!</h3>
              <p className="px-newsletter__success-desc">Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.</p>
              <button className="btn btn-outline" onClick={() => setStatus('idle')}>
                Đăng ký thêm
              </button>
            </div>
          ) : (
            <form className="px-newsletter__form" onSubmit={handleSubmit} id="newsletter-form">
              <div className="px-newsletter__fields">
                <div className="px-newsletter__field">
                  <label htmlFor="newsletter-name" className="px-newsletter__label">Họ và tên</label>
                  <input
                    type="text"
                    id="newsletter-name"
                    name="name"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={handleChange}
                    className="px-newsletter__input"
                    autoComplete="name"
                  />
                </div>
                <div className="px-newsletter__field">
                  <label htmlFor="newsletter-email" className="px-newsletter__label">Email</label>
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="px-newsletter__input"
                    autoComplete="email"
                  />
                </div>
              </div>
              {status === 'error' && <p className="px-newsletter__error">{errorMsg}</p>}
              <button
                type="submit"
                className="btn btn-primary btn--glow px-newsletter__submit"
                disabled={status === 'loading'}
                id="newsletter-submit"
              >
                {status === 'loading' ? (
                  <span className="px-newsletter__spinner" />
                ) : (
                  <>
                    Đăng Ký Ngay
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
              <p className="px-newsletter__privacy">
                Bằng cách đăng ký, bạn đồng ý với chính sách bảo mật của chúng tôi.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

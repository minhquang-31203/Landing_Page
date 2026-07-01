import { useState } from 'react';
import { useElementProgress } from '../hooks/useParallax';
import './ParallaxNewsletter.css';

/**
 * WEBHOOK_URL — endpoint thực tế nhận dữ liệu form
 * Sử dụng webhook.site để test. Thay bằng URL backend thực khi production.
 */
const WEBHOOK_URL = 'https://webhook.site/90b3e11d-6d43-47e6-9b11-c6d76e81d17c';

/* Validation */
const DISPOSABLE_PATTERNS = ['mailinator', 'guerrillamail', 'tempmail', 'throwaway', 'yopmail', 'fakeinbox'];

function validateForm(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();

  if (!name) {
    errors.name = 'Vui lòng nhập họ và tên.';
  } else if (name.length < 2) {
    errors.name = 'Họ và tên phải có ít nhất 2 ký tự.';
  } else if (!/^[\p{L}\s'-]+$/u.test(name)) {
    errors.name = 'Họ và tên chỉ chứa chữ cái và khoảng trắng.';
  }

  if (!email) {
    errors.email = 'Vui lòng nhập địa chỉ email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Địa chỉ email không đúng định dạng.';
  } else if (DISPOSABLE_PATTERNS.some((p) => email.toLowerCase().includes(p))) {
    errors.email = 'Vui lòng dùng địa chỉ email thật của bạn.';
  }

  return errors;
}

export default function ParallaxNewsletter({ showToast }) {
  const [ref, progress] = useElementProgress();
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const cardY = 60 * (1 - progress);
  const cardScale = 0.92 + progress * 0.08;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Validate on change if field was already touched
    if (touched[name]) {
      const fieldErrors = validateForm({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateForm(form);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all as touched
    setTouched({ name: true, email: true });
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast?.('Vui lòng kiểm tra lại thông tin đã nhập.', 'error');
      return;
    }

    setStatus('loading');

    try {
      const payload = {
        source: 'VisionX Landing Page',
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.slice(0, 100),
        referrer: document.referrer || 'direct',
        page: window.location.href,
      };

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus('success');
      setForm({ name: '', email: '' });
      setTouched({});
      setErrors({});
      showToast?.('Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất. 🎉', 'success');
    } catch (err) {
      setStatus('idle');
      showToast?.('Gửi thất bại. Vui lòng thử lại sau ít phút.', 'error');
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
          style={{ opacity: progress, transform: `translateY(${cardY}px) scale(${cardScale})` }}
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
              <p className="px-newsletter__success-desc">Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất có thể.</p>
              <button className="btn btn-outline" onClick={() => setStatus('idle')}>Đăng ký thêm</button>
            </div>
          ) : (
            <form className="px-newsletter__form" onSubmit={handleSubmit} id="newsletter-form" noValidate>
              <div className="px-newsletter__fields">
                {/* Name field */}
                <div className={`px-newsletter__field${errors.name && touched.name ? ' px-newsletter__field--error' : touched.name && !errors.name ? ' px-newsletter__field--valid' : ''}`}>
                  <label htmlFor="newsletter-name" className="px-newsletter__label">Họ và tên</label>
                  <input
                    type="text"
                    id="newsletter-name"
                    name="name"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-newsletter__input"
                    autoComplete="name"
                    aria-describedby={errors.name && touched.name ? 'err-name' : undefined}
                    aria-invalid={!!(errors.name && touched.name)}
                    data-track="newsletter_name_field"
                  />
                  {errors.name && touched.name && (
                    <p className="px-newsletter__field-error" id="err-name" role="alert">{errors.name}</p>
                  )}
                </div>

                {/* Email field */}
                <div className={`px-newsletter__field${errors.email && touched.email ? ' px-newsletter__field--error' : touched.email && !errors.email ? ' px-newsletter__field--valid' : ''}`}>
                  <label htmlFor="newsletter-email" className="px-newsletter__label">Email</label>
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-newsletter__input"
                    autoComplete="email"
                    aria-describedby={errors.email && touched.email ? 'err-email' : undefined}
                    aria-invalid={!!(errors.email && touched.email)}
                    data-track="newsletter_email_field"
                  />
                  {errors.email && touched.email && (
                    <p className="px-newsletter__field-error" id="err-email" role="alert">{errors.email}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn--glow px-newsletter__submit"
                disabled={status === 'loading'}
                id="newsletter-submit"
                data-track="newsletter_submit"
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

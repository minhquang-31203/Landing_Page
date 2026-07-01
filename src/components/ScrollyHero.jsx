import { useHeroProgress } from '../hooks/useParallax';
import './ScrollyHero.css';

export default function ScrollyHero() {
  const [ref, progress] = useHeroProgress();

  const opacity = Math.max(0, 1 - progress * 2);
  const textY = progress * -60;
  const imgY = progress * 30;
  const imgScale = 1 + progress * 0.08;

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Ảnh sản phẩm — lớp nền, hòa vào background */}
      <div
        className="hero__backdrop"
        style={{
          opacity,
          transform: `translateY(${imgY}px) scale(${imgScale})`,
        }}
        aria-hidden="true"
      >
        <img
          src="/hero-glasses.png"
          alt=""
          className="hero__backdrop-img"
          width="900"
          height="600"
          loading="eager"
        />
        {/* Lớp gradient overlay để hòa ảnh vào nền */}
        <div className="hero__backdrop-fade" />
      </div>

      {/* Đường accent ngang nhẹ */}
      <div className="hero__accent-line" aria-hidden="true" />

      {/* Nội dung chính */}
      <div
        className="hero__inner container"
        style={{
          opacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div className="hero__content">

          <h1 className="hero__title">
            Nhìn thấy{' '}
            <em className="hero__title-em">tương lai</em>
            <br />
            qua đôi mắt AI
          </h1>

          <p className="hero__subtitle">
            VisionX Pro — Kính thông minh tích hợp AI thế hệ mới.
            <br className="hero__br-desktop" />
            Màn hình AR siêu nét, trợ lý ảo đa năng, titanium 36 g.
          </p>

          <div className="hero__cta-row">
            <a href="#newsletter" className="hero__btn-primary" id="hero-cta-primary">
              Đặt trước ngay
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
            <a href="#story-display" className="hero__btn-ghost" id="hero-cta-secondary">
              Khám phá
            </a>
          </div>

          {/* Stats — dạng inline text, không phải card */}
          <ul className="hero__proof">
            <li className="hero__proof-item">
              <strong>36 g</strong>
              <span>trọng lượng</span>
            </li>
            <li className="hero__proof-item">
              <strong>12 h</strong>
              <span>pin liên tục</span>
            </li>
            <li className="hero__proof-item">
              <strong>4K</strong>
              <span>hiển thị AR</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero__scroll-cue"
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Cuộn</span>
      </div>
    </section>
  );
}

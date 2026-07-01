import { useElementProgress } from '../hooks/useParallax';
import './ParallaxFeatures.css';

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#fg1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="fg1" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Hiển Thị AR 4K',
    desc: 'MicroLED trong suốt với độ phân giải 4K, góc nhìn 52° hiển thị sắc nét ngay cả ngoài trời.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#fg2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="fg2" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
      </svg>
    ),
    title: 'Trợ Lý AI Đa Ngôn Ngữ',
    desc: 'Nhận diện giọng nói, dịch thuật thời gian thực hỗ trợ 40+ ngôn ngữ và điều khiển rảnh tay.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#fg3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="fg3" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Bảo Mật Sinh Trắc',
    desc: 'Mở khóa bằng quét mống mắt iris scan, mã hóa dữ liệu AES-256 đầu cuối.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#fg4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="fg4" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
        <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2.81a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H15"/><line x1="23" x2="23" y1="13" y2="11"/><polyline points="11 6 7 12 13 12 9 18"/>
      </svg>
    ),
    title: 'Pin 12 Giờ Graphene',
    desc: 'Pin Graphene thế hệ mới cho 12 giờ liên tục. Sạc nhanh 30 phút đạt 80% dung lượng.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#fg5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="fg5" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/>
      </svg>
    ),
    title: 'Camera 48MP + LiDAR',
    desc: 'Ống kính quang học 48MP và cảm biến LiDAR quét 3D không gian chính xác tuyệt đối.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#fg6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="fg6" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs>
        <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/>
      </svg>
    ),
    title: 'Thiết Kế Titanium 36g',
    desc: 'Titanium Grade 5 siêu nhẹ, tròng sapphire chống xước, chống nước IP54. Đeo cả ngày.',
  },
];

export default function ParallaxFeatures() {
  const [ref, progress] = useElementProgress();
  
  // Header parallax - sử dụng progress trực tiếp
  const headingY = 50 * (1 - progress);

  return (
    <section className="px-features section" id="features" ref={ref}>
      <div className="px-features__bg-accent" aria-hidden="true" />
      
      <div className="container">
        <div
          className="px-features__header"
          style={{
            opacity: progress,
            transform: `translateY(${headingY}px)`,
          }}
        >
          <span className="section-label">Tính năng vượt trội</span>
          <h2 className="section-title">
            Công Nghệ Định Hình <span className="gradient-text">Tương Lai</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Mỗi chi tiết trên VisionX Pro đều được thiết kế để mang đến trải nghiệm
            AR hoàn hảo nhất.
          </p>
        </div>

        <div className="px-features__grid">
          {FEATURES.map((f, i) => {
            // Stagger: mỗi card delay thêm một chút
            const cardProgress = Math.min(1, Math.max(0, progress * 1.5 - i * 0.08));
            const cardY = 60 * (1 - cardProgress);
            const cardScale = 0.88 + cardProgress * 0.12;

            return (
              <article
                key={i}
                className="px-features__card"
                style={{
                  opacity: cardProgress,
                  transform: `translateY(${cardY}px) scale(${cardScale})`,
                }}
              >
                <div className="px-features__card-shine" />
                <div className="px-features__icon">{f.icon}</div>
                <h3 className="px-features__card-title">{f.title}</h3>
                <p className="px-features__card-desc">{f.desc}</p>
                <div className="px-features__card-border" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

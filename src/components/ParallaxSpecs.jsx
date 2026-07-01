import { useElementProgress } from '../hooks/useParallax';
import './ParallaxSpecs.css';

const SPEC_GROUPS = [
  {
    category: 'Hiển thị',
    icon: '🖥️',
    specs: [
      { label: 'Công nghệ', value: 'MicroLED trong suốt' },
      { label: 'Độ phân giải', value: '3840 × 2160 / mắt' },
      { label: 'Góc nhìn (FoV)', value: '52° đường chéo' },
      { label: 'Tần số quét', value: '120Hz' },
      { label: 'Độ sáng', value: '5000 nits' },
    ],
  },
  {
    category: 'Hiệu năng',
    icon: '⚡',
    specs: [
      { label: 'Chip xử lý', value: 'Qualcomm Snapdragon XR3' },
      { label: 'RAM / Bộ nhớ', value: '12GB / 256GB UFS 4.0' },
      { label: 'AI Engine', value: 'NPU 45 TOPS' },
      { label: 'Kết nối', value: 'Wi-Fi 7 + BT 5.4 + 5G' },
      { label: 'Hệ điều hành', value: 'VisionOS 2.0' },
    ],
  },
  {
    category: 'Thiết kế & Pin',
    icon: '🔋',
    specs: [
      { label: 'Trọng lượng', value: '36g (không tròng)' },
      { label: 'Chất liệu', value: 'Titanium Grade 5' },
      { label: 'Chống nước', value: 'IP54' },
      { label: 'Dung lượng pin', value: '800mAh Graphene' },
      { label: 'Sạc nhanh', value: '30 phút → 80%' },
    ],
  },
];

export default function ParallaxSpecs() {
  const [ref, progress] = useElementProgress();

  const headerY = 40 * (1 - progress);

  return (
    <section className="px-specs section" id="specs" ref={ref}>
      <div className="px-specs__bg" aria-hidden="true">
        <div className="px-specs__accent-line" />
      </div>

      <div className="container">
        {/* Header */}
        <div
          className="px-specs__header"
          style={{
            opacity: progress,
            transform: `translateY(${headerY}px)`,
          }}
        >
          <span className="section-label">Thông số kỹ thuật</span>
          <h2 className="section-title">
            Sức Mạnh Bên Trong <span className="gradient-text">Từng Mili-mét</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Trang bị linh kiện hàng đầu thế giới, mang đến hiệu năng vượt trội
            trong thiết kế siêu nhỏ gọn.
          </p>
        </div>

        {/* Spec Groups */}
        <div className="px-specs__groups">
          {SPEC_GROUPS.map((group, gi) => {
            // Stagger giữa các group
            const groupProgress = Math.min(1, Math.max(0, progress * 1.5 - gi * 0.12));
            const groupY = 50 * (1 - groupProgress);
            const groupScale = 0.93 + groupProgress * 0.07;

            return (
              <div
                key={gi}
                className="px-specs__group"
                style={{
                  opacity: groupProgress,
                  transform: `translateY(${groupY}px) scale(${groupScale})`,
                }}
              >
                <div className="px-specs__group-header">
                  <span className="px-specs__group-icon">{group.icon}</span>
                  <h3 className="px-specs__group-title">{group.category}</h3>
                </div>
                <div className="px-specs__table">
                  {group.specs.map((s, si) => (
                    <div
                      key={si}
                      className="px-specs__row"
                      style={{ opacity: Math.min(1, Math.max(0, groupProgress * 2 - si * 0.15)) }}
                    >
                      <span className="px-specs__label">{s.label}</span>
                      <span className="px-specs__dots" />
                      <span className="px-specs__value">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

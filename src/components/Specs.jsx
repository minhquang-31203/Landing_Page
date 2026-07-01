import './Specs.css';

const SPEC_GROUPS = [
  {
    category: 'Hiển thị',
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
    specs: [
      { label: 'Chip xử lý', value: 'Qualcomm Snapdragon XR3' },
      { label: 'RAM / Bộ nhớ', value: '12GB / 256GB UFS 4.0' },
      { label: 'AI Engine', value: 'NPU 45 TOPS' },
      { label: 'Kết nối', value: 'Wi-Fi 7 + Bluetooth 5.4 + 5G' },
      { label: 'Hệ điều hành', value: 'VisionOS 2.0' },
    ],
  },
  {
    category: 'Thiết kế & Pin',
    specs: [
      { label: 'Trọng lượng', value: '36g (không tròng)' },
      { label: 'Chất liệu', value: 'Titanium Grade 5' },
      { label: 'Chống nước', value: 'IP54' },
      { label: 'Dung lượng pin', value: '800mAh Graphene' },
      { label: 'Sạc nhanh', value: '30 phút → 80%' },
    ],
  },
];

export default function Specs() {
  return (
    <section className="specs section" id="specs">
      <div className="container">
        <div className="specs__layout">
          <div className="specs__left animate-in">
            <span className="section-label">Thông số kỹ thuật</span>
            <h2 className="section-title">Sức Mạnh Bên Trong<br /><span className="gradient-text">Từng Mili-mét</span></h2>
            <p className="section-subtitle">
              VisionX Pro được trang bị những linh kiện hàng đầu thế giới,
              mang đến hiệu năng vượt trội trong thiết kế siêu nhỏ gọn.
            </p>
            <div className="specs__image-wrapper">
              <img
                src="/specs-glasses.png"
                alt="VisionX Pro - Chi tiết thông số kỹ thuật kính thông minh AI"
                className="specs__image"
                width="500"
                height="350"
                loading="lazy"
              />
            </div>
          </div>

          <div className="specs__right">
            {SPEC_GROUPS.map((group, gi) => (
              <div key={gi} className="specs__group animate-in" style={{ transitionDelay: `${gi * 120}ms` }}>
                <h3 className="specs__group-title">{group.category}</h3>
                <div className="specs__table">
                  {group.specs.map((s, si) => (
                    <div key={si} className="specs__row">
                      <span className="specs__label">{s.label}</span>
                      <span className="specs__value">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

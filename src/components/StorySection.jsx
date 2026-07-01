import { useElementProgress } from '../hooks/useParallax';
import './StorySection.css';

/**
 * StorySection - Component kể chuyện với hiệu ứng cuộn parallax
 * Mỗi section là một "chương" trong câu chuyện thương hiệu
 */

const STORY_CHAPTERS = [
  {
    id: 'story-display',
    label: 'Chương 01',
    title: 'Thế Giới Trong\nTầm Mắt',
    description:
      'Màn hình MicroLED trong suốt với độ phân giải 4K trên mỗi mắt, góc nhìn 52° cho trải nghiệm AR chân thực nhất. Mọi thông tin hiển thị ngay trước mắt bạn.',
    image: '/ar-display.png',
    imageAlt: 'VisionX Pro AR Display 4K',
    stats: [
      { value: '4K', label: 'Mỗi mắt' },
      { value: '52°', label: 'Góc nhìn' },
      { value: '120Hz', label: 'Tần số quét' },
    ],
    direction: 'left',
    accent: 'indigo',
  },
  {
    id: 'story-ai',
    label: 'Chương 02',
    title: 'Trợ Lý AI\nHiểu Bạn',
    description:
      'Trợ lý ảo AI tích hợp nhận diện giọng nói, dịch thuật thời gian thực hỗ trợ 40+ ngôn ngữ. Chỉ cần nói — VisionX sẽ làm phần còn lại.',
    image: '/lifestyle-city.png',
    imageAlt: 'VisionX Pro AI Assistant',
    stats: [
      { value: '40+', label: 'Ngôn ngữ' },
      { value: '45', label: 'TOPS AI' },
      { value: '<50ms', label: 'Phản hồi' },
    ],
    direction: 'right',
    accent: 'cyan',
  },
  {
    id: 'story-design',
    label: 'Chương 03',
    title: 'Titanium\nSiêu Nhẹ',
    description:
      'Khung titanium Grade 5 siêu nhẹ chỉ 36g, tròng kính chống xước sapphire, chống nước IP54. Thiết kế để đeo cả ngày không mỏi — như đeo kính thường.',
    image: '/specs-glasses.png',
    imageAlt: 'VisionX Pro Titanium Design',
    stats: [
      { value: '36g', label: 'Trọng lượng' },
      { value: 'IP54', label: 'Chống nước' },
      { value: '12h', label: 'Pin liên tục' },
    ],
    direction: 'left',
    accent: 'purple',
  },
];

function StoryChapter({ chapter, index }) {
  const [ref, progress] = useElementProgress();

  // progress đi từ 0 → 1 khi element cuộn vào viewport
  // Sử dụng trực tiếp cho parallax mượt mà
  const isLeft = chapter.direction === 'left';

  const imageX = isLeft
    ? -50 * (1 - progress)
    : 50 * (1 - progress);
  const imageY = 30 * (1 - progress);
  const textX = isLeft
    ? 50 * (1 - progress)
    : -50 * (1 - progress);
  const textScale = 0.92 + progress * 0.08;
  const lineWidth = progress * 100;

  return (
    <section
      className={`story-chapter story-chapter--${chapter.direction} story-chapter--${chapter.accent}`}
      id={chapter.id}
      ref={ref}
    >
      {/* Accent glow phía sau */}
      <div className="story-chapter__glow" aria-hidden="true" />

      <div className="container story-chapter__container">
        {/* Cột hình ảnh */}
        <div
          className="story-chapter__visual"
          style={{
            opacity: progress,
            transform: `translate(${imageX}px, ${imageY}px)`,
          }}
        >
          <div className="story-chapter__image-frame">
            <img
              src={chapter.image}
              alt={chapter.imageAlt}
              className="story-chapter__image"
              width="600"
              height="400"
              loading="lazy"
            />
            <div className="story-chapter__image-overlay" />
          </div>
          {/* Floating label */}
          <div className="story-chapter__float-label">
            <span className="story-chapter__float-num">{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Cột nội dung text */}
        <div
          className="story-chapter__content"
          style={{
            opacity: progress,
            transform: `translateX(${textX}px) scale(${textScale})`,
          }}
        >
          <span className="story-chapter__label">{chapter.label}</span>

          {/* Đường kẻ phân cách động */}
          <div className="story-chapter__line-wrap">
            <div
              className="story-chapter__line"
              style={{ width: `${lineWidth}%` }}
            />
          </div>

          <h2 className="story-chapter__title">
            {chapter.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>

          <p className="story-chapter__desc">{chapter.description}</p>

          {/* Stats mini */}
          <div className="story-chapter__stats">
            {chapter.stats.map((stat, si) => (
              <div key={si} className="story-chapter__stat">
                <span className="story-chapter__stat-value">{stat.value}</span>
                <span className="story-chapter__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StorySection() {
  return (
    <div className="story-wrapper">
      {/* Đường chỉ dẫn cuộn */}
      <div className="story-timeline" aria-hidden="true">
        <div className="story-timeline__line" />
      </div>

      {STORY_CHAPTERS.map((chapter, i) => (
        <StoryChapter key={chapter.id} chapter={chapter} index={i} />
      ))}
    </div>
  );
}

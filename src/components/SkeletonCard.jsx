import './SkeletonCard.css';

/**
 * SkeletonCard — placeholder card khi đang tải dữ liệu
 * Hiệu ứng shimmer gradient di chuyển từ trái sang phải
 */
export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__icon skeleton" />
      <div className="skeleton-card__title skeleton skeleton-text" style={{ width: '60%' }} />
      <div className="skeleton-card__text skeleton skeleton-text" style={{ width: '90%' }} />
      <div className="skeleton-card__text skeleton skeleton-text" style={{ width: '75%' }} />
      <div className="skeleton-card__text skeleton skeleton-text" style={{ width: '50%' }} />
    </div>
  );
}

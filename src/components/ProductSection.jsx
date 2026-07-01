import { useElementProgress } from '../hooks/useParallax';
import { PRODUCT_CATALOG } from '../hooks/useStore';
import ProductCard from './ProductCard';
import './ProductSection.css';

/**
 * ProductSection — Giới thiệu 3 phiên bản VisionX
 * Nằm giữa ParallaxSpecs và ParallaxNewsletter
 */
export default function ProductSection({ store }) {
  const [ref, progress] = useElementProgress();
  const headerY = 50 * (1 - progress);

  const { isFavorite, toggleFavorite, addToCart, trackView } = store;

  return (
    <section className="product-section section" id="products" ref={ref}>
      {/* Background decoration */}
      <div className="product-section__bg" aria-hidden="true">
        <div className="product-section__orb product-section__orb--1" />
        <div className="product-section__orb product-section__orb--2" />
      </div>

      <div className="container">
        {/* Header */}
        <div
          className="product-section__header"
          style={{ opacity: progress, transform: `translateY(${headerY}px)` }}
        >
          <span className="section-label">Bộ sưu tập</span>
          <h2 className="section-title text-center">
            Chọn Phiên Bản <span className="gradient-text">Phù Hợp</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Ba phiên bản cho ba phong cách sống — từ tinh tế đến đỉnh cao.
          </p>
        </div>

        {/* Product grid */}
        <div className="product-section__grid">
          {PRODUCT_CATALOG.map((product, i) => {
            const cardProgress = Math.min(1, Math.max(0, progress * 1.5 - i * 0.1));
            const cardY = 70 * (1 - cardProgress);
            return (
              <div
                key={product.id}
                style={{ opacity: cardProgress, transform: `translateY(${cardY}px)` }}
              >
                <ProductCard
                  product={product}
                  isFavorite={isFavorite(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                  onTrackView={trackView}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

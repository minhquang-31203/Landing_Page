import { useState, useEffect } from 'react';
import { useRipple } from '../hooks/useRipple';
import './ProductCard.css';

/**
 * ProductCard — thẻ sản phẩm với:
 * - Nút yêu thích ❤️ có heartbeat animation
 * - Nút "Thêm vào giỏ" với ripple effect
 * - Hover: nâng nhẹ + glow tương ứng màu sản phẩm
 * - Theo dõi lượt xem sản phẩm
 */
export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, onTrackView }) {
  const createRipple = useRipple();
  const [cartFlash, setCartFlash] = useState(false);
  const [viewed, setViewed] = useState(false);

  // Track lần đầu view
  useEffect(() => {
    if (!viewed) {
      setViewed(true);
      onTrackView?.(product);
    }
  }, [viewed, product, onTrackView]);

  const handleAddToCart = (e) => {
    createRipple(e);
    onAddToCart?.(product);
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 600);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <article
      className="product-card"
      style={{ '--product-color': product.color }}
      data-track={`product_card_${product.id}`}
    >
      {/* Badge */}
      <div className={`product-card__badge product-card__badge--${product.badgeColor}`}>
        {product.badge}
      </div>

      {/* Discount badge */}
      {discount > 0 && (
        <div className="product-card__discount">-{discount}%</div>
      )}

      {/* Favorite button */}
      <button
        className={`product-card__fav${isFavorite ? ' product-card__fav--active' : ''}`}
        onClick={() => onToggleFavorite?.(product.id)}
        aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        data-track={`favorite_${product.id}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      {/* Product image */}
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
          width="280"
          height="200"
        />
        <div className="product-card__image-glow" />
      </div>

      {/* Content */}
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__tagline">{product.tagline}</p>

        {/* Specs list */}
        <ul className="product-card__specs">
          {product.specs.map((spec, i) => (
            <li key={i} className="product-card__spec">{spec}</li>
          ))}
        </ul>

        {/* Price */}
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <span className="product-card__original-price">{formatPrice(product.originalPrice)}</span>
        </div>

        {/* Add to Cart */}
        <button
          className={`btn btn-primary product-card__cta${cartFlash ? ' product-card__cta--flash' : ''}`}
          onMouseDown={handleAddToCart}
          id={`add-to-cart-${product.id}`}
          data-track={`add_to_cart_${product.id}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartFlash ? 'Đã thêm!' : 'Thêm vào giỏ'}
        </button>
      </div>

      {/* Hover glow */}
      <div className="product-card__glow" />
    </article>
  );
}

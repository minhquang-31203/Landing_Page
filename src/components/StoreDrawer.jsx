import { useState, useEffect, useRef } from 'react';
import './StoreDrawer.css';

/**
 * StoreDrawer — Panel kéo ra từ bên phải
 * 3 tab: Giỏ hàng | Yêu thích | Đã xem gần đây
 */

const formatPrice = (p) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

/* ---- Giỏ hàng ---- */
function CartSection({ cartItems, cartTotal, onUpdateQty, onRemove }) {
  if (cartItems.length === 0) {
    return (
      <div className="drawer-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".3">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Giỏ hàng đang trống</p>
        <a href="#products" className="btn btn-outline" style={{marginTop:'.5rem',fontSize:'.875rem',padding:'.6rem 1.5rem'}}>
          Khám phá sản phẩm
        </a>
      </div>
    );
  }
  return (
    <div className="drawer-cart">
      {cartItems.map(({ product, qty }) => (
        <div key={product.id} className="drawer-cart__item">
          <img src={product.image} alt={product.name} className="drawer-cart__img" loading="lazy" />
          <div className="drawer-cart__info">
            <p className="drawer-cart__name">{product.name}</p>
            <p className="drawer-cart__price">{formatPrice(product.price)}</p>
          </div>
          <div className="drawer-cart__actions">
            <div className="drawer-cart__controls">
              <button className="drawer-cart__qty-btn" onClick={() => onUpdateQty(product.id, qty - 1)}>−</button>
              <span className="drawer-cart__qty">{qty}</span>
              <button className="drawer-cart__qty-btn" onClick={() => onUpdateQty(product.id, qty + 1)}>+</button>
            </div>
            <button className="drawer-icon-btn drawer-icon-btn--remove" onClick={() => onRemove(product.id)} aria-label="Xóa">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
      <div className="drawer-cart__summary">
        <div className="drawer-cart__total">
          <span>Tổng cộng</span>
          <span className="drawer-cart__total-price">{formatPrice(cartTotal)}</span>
        </div>
        <a href="#newsletter" className="btn btn-primary btn--glow" style={{ width: '100%', justifyContent: 'center' }}>
          Đặt trước ngay →
        </a>
      </div>
    </div>
  );
}

/* ---- Yêu thích ---- */
function FavoritesSection({ favorites, catalog, onToggleFavorite, onAddToCart }) {
  const favProducts = catalog.filter((p) => favorites.has(p.id));
  if (favProducts.length === 0) {
    return (
      <div className="drawer-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".3">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <p>Chưa có sản phẩm yêu thích</p>
      </div>
    );
  }
  return (
    <div className="drawer-list">
      {favProducts.map((product) => (
        <div key={product.id} className="drawer-fav__item">
          <img src={product.image} alt={product.name} className="drawer-cart__img" loading="lazy" />
          <div className="drawer-cart__info">
            <p className="drawer-cart__name">{product.name}</p>
            <p className="drawer-cart__price">{formatPrice(product.price)}</p>
          </div>
          <div className="drawer-fav__btns">
            <button className="drawer-icon-btn drawer-icon-btn--cart" onClick={() => onAddToCart(product)} title="Thêm giỏ hàng">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <button className="drawer-icon-btn drawer-icon-btn--remove" onClick={() => onToggleFavorite(product.id)} aria-label="Bỏ yêu thích">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Đã xem gần đây ---- */
function RecentSection({ recentlyViewed, onAddToCart }) {
  if (recentlyViewed.length === 0) {
    return (
      <div className="drawer-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".3">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <p>Chưa xem sản phẩm nào</p>
      </div>
    );
  }
  return (
    <div className="drawer-list">
      {recentlyViewed.map((product) => (
        <div key={product.id} className="drawer-fav__item">
          <img src={product.image} alt={product.name} className="drawer-cart__img" loading="lazy" />
          <div className="drawer-cart__info">
            <p className="drawer-cart__name">{product.name}</p>
            <p className="drawer-cart__price">{formatPrice(product.price)}</p>
          </div>
          <button className="drawer-icon-btn drawer-icon-btn--cart" onClick={() => onAddToCart(product)} title="Thêm giỏ hàng">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---- Main StoreDrawer ---- */
export default function StoreDrawer({
  isOpen, onClose,
  cartItems, cartTotal, onUpdateQty, onRemoveFromCart,
  favorites, catalog, onToggleFavorite, onAddToCart,
  recentlyViewed,
}) {
  const [activeTab, setActiveTab] = useState('cart');
  const firstBtnRef = useRef(null);

  const tabs = [
    { id: 'cart', label: `Giỏ (${cartItems.length})` },
    { id: 'favorites', label: `Yêu thích (${favorites.size})` },
    { id: 'recent', label: 'Đã xem' },
  ];

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Focus trap — khi mở thì focus vào nút đóng
  useEffect(() => {
    if (isOpen && firstBtnRef.current) {
      setTimeout(() => firstBtnRef.current?.focus(), 50);
    }
  }, [isOpen]);

  return (
    <>
      <div className={`drawer-overlay${isOpen ? ' drawer-overlay--visible' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`store-drawer${isOpen ? ' store-drawer--open' : ''}`} aria-label="Cửa hàng" aria-modal="true" role="dialog">

        {/* Header */}
        <div className="store-drawer__header">
          <h2 className="store-drawer__title">🛍️ Cửa Hàng</h2>
          <button ref={firstBtnRef} className="store-drawer__close" onClick={onClose} aria-label="Đóng">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="store-drawer__tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`store-drawer__tab${activeTab === t.id ? ' store-drawer__tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="store-drawer__body">
          {activeTab === 'cart' && (
            <CartSection
              cartItems={cartItems} cartTotal={cartTotal}
              onUpdateQty={onUpdateQty} onRemove={onRemoveFromCart}
            />
          )}
          {activeTab === 'favorites' && (
            <FavoritesSection
              favorites={favorites} catalog={catalog}
              onToggleFavorite={onToggleFavorite} onAddToCart={onAddToCart}
            />
          )}
          {activeTab === 'recent' && (
            <RecentSection recentlyViewed={recentlyViewed} onAddToCart={onAddToCart} />
          )}
        </div>
      </aside>
    </>
  );
}

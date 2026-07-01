import { useState, useCallback, useEffect } from 'react';

/**
 * PRODUCT_CATALOG — danh sách sản phẩm VisionX
 * Dùng chung cho ProductSection, StoreDrawer, recently viewed
 */
export const PRODUCT_CATALOG = [
  {
    id: 'vx-standard',
    name: 'VisionX Standard',
    tagline: 'Bước đầu vào tương lai',
    price: 12_900_000,
    originalPrice: 15_900_000,
    badge: 'Phổ biến',
    badgeColor: 'accent',
    image: '/hero-glasses.png',
    color: '#818cf8',
    specs: ['AR Display HD', 'AI cơ bản', '8h pin', '42g'],
  },
  {
    id: 'vx-pro',
    name: 'VisionX Pro',
    tagline: 'Đỉnh cao công nghệ AR',
    price: 22_900_000,
    originalPrice: 28_900_000,
    badge: 'Nổi bật nhất',
    badgeColor: 'primary',
    image: '/hero-glasses.png',
    color: '#6366f1',
    specs: ['AR 4K mỗi mắt', 'NPU 45 TOPS', '12h pin', '36g'],
  },
  {
    id: 'vx-ultra',
    name: 'VisionX Ultra',
    tagline: 'Không giới hạn, không nhượng bộ',
    price: 38_900_000,
    originalPrice: 45_900_000,
    badge: 'Cao cấp',
    badgeColor: 'gold',
    image: '/specs-glasses.png',
    color: '#f59e0b',
    specs: ['AR 8K mỗi mắt', 'NPU 90 TOPS', '18h pin', '32g'],
  },
];

const STORAGE_KEY_FAVORITES = 'visionx-favorites';
const STORAGE_KEY_CART = 'visionx-cart';
const STORAGE_KEY_RECENT = 'visionx-recently-viewed';

function loadStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * useStore — quản lý state thương mại điện tử mini
 * - favorites: Set của product id
 * - cart: { [id]: { product, qty } }
 * - recentlyViewed: mảng product (tối đa 5)
 * Tất cả đều persist vào localStorage
 */
export function useStore() {
  const [favorites, setFavorites] = useState(() =>
    new Set(loadStorage(STORAGE_KEY_FAVORITES, []))
  );
  const [cart, setCart] = useState(() =>
    loadStorage(STORAGE_KEY_CART, {})
  );
  const [recentlyViewed, setRecentlyViewed] = useState(() =>
    loadStorage(STORAGE_KEY_RECENT, [])
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify([...favorites]));
  }, [favorites]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  }, [cart]);

  // Persist recentlyViewed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  /* ---- Favorites ---- */
  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const isFavorite = useCallback((productId) => favorites.has(productId), [favorites]);

  /* ---- Cart ---- */
  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: {
          product,
          qty: existing ? existing.qty + qty : qty,
        },
      };
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], qty },
    }));
  }, [removeFromCart]);

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  /* ---- Recently Viewed ---- */
  const trackView = useCallback((product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  }, []);

  /* ---- Drawer ---- */
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  return {
    favorites, toggleFavorite, isFavorite,
    cart, cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQty,
    recentlyViewed, trackView,
    isDrawerOpen, openDrawer, closeDrawer,
  };
}

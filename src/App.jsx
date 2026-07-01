import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useTheme } from './hooks/useTheme';
import { useAnalytics } from './hooks/useAnalytics';
import { useStore } from './hooks/useStore';
import { useToast } from './components/ToastNotification';

import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import ScrollyHero from './components/ScrollyHero';
import StorySection from './components/StorySection';
import ParallaxFeatures from './components/ParallaxFeatures';
import ParallaxSpecs from './components/ParallaxSpecs';
import ProductSection from './components/ProductSection';
import ParallaxNewsletter from './components/ParallaxNewsletter';
import Footer from './components/Footer';

import ToastContainer from './components/ToastNotification';
import StoreDrawer from './components/StoreDrawer';
import ChatBot from './components/ChatBot';

import { PRODUCT_CATALOG } from './hooks/useStore';

export default function App() {
  // Hooks
  useScrollAnimation();
  const { theme, toggleTheme } = useTheme();
  useAnalytics(); // Bắt đầu theo dõi hành vi người dùng
  const store = useStore();
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <>
      {/* Toast notification system */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Store drawer (giỏ hàng, yêu thích, đã xem) */}
      <StoreDrawer
        isOpen={store.isDrawerOpen}
        onClose={store.closeDrawer}
        cartItems={store.cartItems}
        cartTotal={store.cartTotal}
        onUpdateQty={store.updateQty}
        onRemoveFromCart={store.removeFromCart}
        favorites={store.favorites}
        catalog={PRODUCT_CATALOG}
        onToggleFavorite={store.toggleFavorite}
        onAddToCart={(product) => {
          store.addToCart(product);
          showToast(`Đã thêm "${product.name}" vào giỏ hàng! 🛒`, 'success', 3000);
        }}
        recentlyViewed={store.recentlyViewed}
      />

      {/* Chatbot */}
      <ChatBot />

      {/* Progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={() => {
          toggleTheme();
          showToast(
            theme === 'dark' ? '☀️ Đã chuyển sang Light Mode' : '🌙 Đã chuyển sang Dark Mode',
            'info',
            2500
          );
        }}
        cartCount={store.cartCount}
        onOpenCart={store.openDrawer}
      />

      {/* Main content */}
      <main>
        <ScrollyHero />
        <StorySection />
        <ParallaxFeatures />
        <ParallaxSpecs />
        <ProductSection
          store={{
            isFavorite: store.isFavorite,
            toggleFavorite: (id) => {
              const product = PRODUCT_CATALOG.find((p) => p.id === id);
              store.toggleFavorite(id);
              if (!store.isFavorite(id)) {
                showToast(`❤️ Đã thêm "${product?.name}" vào yêu thích!`, 'info', 2500);
              }
            },
            addToCart: (product) => {
              store.addToCart(product);
              showToast(`Đã thêm "${product.name}" vào giỏ hàng! 🛒`, 'success', 3000);
            },
            trackView: store.trackView,
          }}
        />
        <ParallaxNewsletter showToast={showToast} />
      </main>

      <Footer />
    </>
  );
}

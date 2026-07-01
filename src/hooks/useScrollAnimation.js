import { useEffect } from 'react';

/**
 * Hook sử dụng IntersectionObserver để thêm animation khi element vào viewport
 * Hỗ trợ cả class 'animate-in' (fade-up) và 'reveal' (scroll-triggered reveal)
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-in, .reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

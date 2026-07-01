import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook cung cấp giá trị scroll progress toàn trang (0 → 1)
 * và hàm tính parallax cho từng element dựa trên vị trí viewport
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [docHeight, setDocHeight] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      setDocHeight(document.documentElement.scrollHeight);
    };

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };

    updateDimensions();
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const globalProgress = docHeight > viewportHeight
    ? scrollY / (docHeight - viewportHeight)
    : 0;

  const getSectionProgress = useCallback((offsetTop, sectionHeight) => {
    const start = offsetTop - viewportHeight;
    const end = offsetTop + sectionHeight;
    if (scrollY <= start) return 0;
    if (scrollY >= end) return 1;
    return (scrollY - start) / (end - start);
  }, [scrollY, viewportHeight]);

  return { scrollY, viewportHeight, globalProgress, getSectionProgress };
}

/**
 * Hook theo dõi mức độ hiển thị (visibility) của element trong viewport.
 * 
 * Trả về `progress` từ 0 → 1:
 *   - 0: element hoàn toàn nằm dưới viewport (chưa nhìn thấy)
 *   - 0 → 1: element đang cuộn vào viewport (từ dưới lên)
 *   - 1: element đã hoàn toàn nằm trong viewport hoặc đã vượt qua
 * 
 * Cách tính: trigger point tại 85% viewport height, animation hoàn tất sau 350px cuộn
 */
export function useElementProgress(options = {}) {
  const { triggerPoint = 0.85 } = options;
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const trigger = vh * triggerPoint;
        
        // progress = 0 khi rect.top === trigger (element vừa chạm trigger point)
        // progress = 1 khi rect.top === trigger - scrollRange
        const scrollRange = 350;
        let p = (trigger - rect.top) / scrollRange;
        p = Math.max(0, Math.min(1, p));
        
        setProgress(p);
        rafRef.current = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [triggerPoint]);

  return [ref, progress];
}

/**
 * Hook đặc biệt cho Hero section: theo dõi lượng scroll ĐI QUA hero
 * Trả về 0 khi chưa cuộn, tăng dần khi cuộn xuống
 */
export function useHeroProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        // p = 0 khi chưa cuộn (rect.top = 0)
        // p = 1 khi đã cuộn qua 60% hero
        let p = -rect.top / (rect.height * 0.6);
        p = Math.max(0, Math.min(1, p));
        setProgress(p);
        rafRef.current = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return [ref, progress];
}

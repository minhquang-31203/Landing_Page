import { useEffect, useRef, useCallback } from 'react';

/**
 * useAnalytics — theo dõi hành vi người dùng
 * Log click, scroll milestones, và custom events
 * Lưu trữ trong localStorage với key 'visionx-analytics'
 */

const WEBHOOK_URL = 'https://webhook.site/#!/view/visionx-analytics-events';

function pushEvent(name, data = {}) {
  const event = {
    name,
    data,
    url: window.location.href,
    userAgent: navigator.userAgent.slice(0, 80),
    timestamp: new Date().toISOString(),
  };

  // Ghi vào localStorage để xem sau
  try {
    const stored = JSON.parse(localStorage.getItem('visionx-analytics') || '[]');
    stored.push(event);
    // Giữ tối đa 100 events
    if (stored.length > 100) stored.splice(0, stored.length - 100);
    localStorage.setItem('visionx-analytics', JSON.stringify(stored));
  } catch (_) { /* ignore */ }

  // Log ra console (development)
  console.log(`%c[Analytics] ${name}`, 'color:#818cf8;font-weight:bold', data);

  // Gửi tới webhook (fire-and-forget, không chặn UI)
  fetch('https://webhook.site/90b3e11d-6d43-47e6-9b11-c6d76e81d17c', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => { /* silent fail */ });
}

export function useAnalytics() {
  const scrollMilestones = useRef(new Set());

  // Theo dõi scroll milestones (25%, 50%, 75%, 100%)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach((milestone) => {
        if (percent >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          pushEvent('scroll_milestone', { percent: milestone });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theo dõi click toàn trang qua event delegation
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('[data-track]');
      if (target) {
        const label = target.getAttribute('data-track');
        const id = target.id || 'unknown';
        pushEvent('click', { label, id });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // trackEvent — gửi custom event từ component
  const trackEvent = useCallback((name, data = {}) => {
    pushEvent(name, data);
  }, []);

  return { trackEvent };
}

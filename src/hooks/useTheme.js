import { useState, useEffect, useCallback } from 'react';

/**
 * useTheme — quản lý Dark / Light mode
 * - Đọc giá trị từ localStorage khi khởi tạo
 * - Sync attribute `data-theme` lên thẻ <html>
 * - Persist lựa chọn vào localStorage
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Ưu tiên: localStorage → dark (mặc định)
    const saved = localStorage.getItem('visionx-theme');
    return saved || 'dark';
  });

  useEffect(() => {
    // Áp dụng theme lên <html>
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('visionx-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}

import { useCallback } from 'react';

/**
 * useRipple — tạo hiệu ứng ripple tỏa ra khi người dùng click
 * Sử dụng: const createRipple = useRipple();
 * Gắn: <button onClick={createRipple}> hoặc <button onMouseDown={createRipple}>
 */
export function useRipple() {
  const createRipple = useCallback((e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-circle');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Đảm bảo button có position:relative
    if (getComputedStyle(button).position === 'static') {
      button.style.position = 'relative';
    }

    button.appendChild(ripple);

    // Cleanup sau khi animation xong
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }, []);

  return createRipple;
}

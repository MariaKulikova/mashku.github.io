import { useEffect, useState } from 'react';

/**
 * true, когда страница прокручена вниз больше порога — плашки схлопываются в блоб.
 * Возврат к верху страницы снова разворачивает их.
 */
export function useScrolledDown(threshold = 90) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

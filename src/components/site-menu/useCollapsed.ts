import { useEffect, useState } from 'react';

/**
 * true, когда меню/хедер должны быть схлопнуты. Схлопывается при скролле вниз
 * (после порога) и разворачивается ТОЛЬКО когда страница прокручена к самому
 * верху. Скролл вверх посреди страницы хедер не разворачивает (для этого — клик
 * по меню, см. SiteHeader).
 *
 * Пороги разнесены (гистерезис): схлоп при y > collapseAt, разворот при y <=
 * expandAt. Это исключает осцилляцию, когда смена высоты хедера укорачивает
 * документ и браузер поджимает scrollY у низа короткой страницы.
 */
export function useScrolledDown(collapseAt = 120, expandAt = 30) {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCollapsed((prev) => (prev ? y > expandAt : y > collapseAt));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [collapseAt, expandAt]);
  return collapsed;
}

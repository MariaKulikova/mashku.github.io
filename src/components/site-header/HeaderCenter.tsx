import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Телепортирует заголовок страницы в центр липкого хедера (#site-header-center).
 * Используется в mdx каждой страницы вместо инлайнового hero/заголовка, чтобы
 * контент и i18n оставались в mdx, а раскладку задавал глобальный SiteHeader.
 * Рендерится только на клиенте (портал), поэтому на сервере — null.
 */
export default function HeaderCenter({ children }: { children: React.ReactNode }) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEl(document.getElementById('site-header-center'));
  }, []);
  return el ? createPortal(children, el) : null;
}

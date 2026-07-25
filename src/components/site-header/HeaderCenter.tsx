import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Телепортирует заголовок страницы В ДВА места: центр развёрнутого хедера
 * (#site-header-center) и центр липкой полоски (#site-header-bar-center). Оба
 * получают один и тот же контент из mdx; развёрнутый показывает крупно, полоска —
 * компактно (стили — в site-header.module.css). Рендерится только на клиенте.
 */
export default function HeaderCenter({ children }: { children: React.ReactNode }) {
  const [targets, setTargets] = useState<{ expanded: HTMLElement | null; bar: HTMLElement | null }>(
    { expanded: null, bar: null },
  );
  useEffect(() => {
    setTargets({
      expanded: document.getElementById('site-header-center'),
      bar: document.getElementById('site-header-bar-center'),
    });
  }, []);
  return (
    <>
      {targets.expanded && createPortal(children, targets.expanded)}
      {targets.bar && createPortal(children, targets.bar)}
    </>
  );
}

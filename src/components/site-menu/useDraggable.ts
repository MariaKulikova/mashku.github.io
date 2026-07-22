import { useCallback, useEffect, useRef, useState } from 'react';

type Pos = { top: number; left: number };

const DRAG_THRESHOLD = 5; // px — отличаем перетаскивание от клика

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(v, max));
}

/**
 * Логика перетаскиваемой плашки: позиция (fixed top/left), сохранение в
 * localStorage, drag через window-слушатели (без setPointerCapture — иначе
 * ломается клик по вложенным элементам), клэмп в пределах вьюпорта.
 * Возвращает ref на корень, стиль (top/left/opacity) и обработчики.
 * `defaultPos.left` можно задать заведомо большим (напр. 99999) — при загрузке
 * клэмп прижмёт плашку к правому краю (удобно для правой плашки).
 */
export function useDraggable(storageKey: string, defaultPos: Pos) {
  const rootRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState(defaultPos);
  const posRef = useRef(pos);
  posRef.current = pos;
  const [ready, setReady] = useState(false);

  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    baseTop: 0,
    baseLeft: 0,
  });

  const clampToViewport = useCallback((top: number, left: number): Pos => {
    const el = rootRef.current;
    const w = el?.offsetWidth ?? 0;
    const h = el?.offsetHeight ?? 0;
    return {
      top: clamp(top, 8, Math.max(8, window.innerHeight - h - 8)),
      left: clamp(left, 8, Math.max(8, window.innerWidth - w - 8)),
    };
  }, []);

  const onWinMove = useCallback(
    (e: PointerEvent) => {
      const s = drag.current;
      if (!s.active) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      if (!s.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) s.moved = true;
      if (s.moved) setPos(clampToViewport(s.baseTop + dy, s.baseLeft + dx));
    },
    [clampToViewport],
  );

  const onWinUp = useCallback(() => {
    const s = drag.current;
    if (!s.active) return;
    s.active = false;
    window.removeEventListener('pointermove', onWinMove);
    window.removeEventListener('pointerup', onWinUp);
    if (s.moved) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(posRef.current));
      } catch {
        /* localStorage недоступен — не критично */
      }
    }
  }, [onWinMove, storageKey]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      // Не начинаем перетаскивание с интерактивных контролов (кнопка/ссылка/свотч/
      // инпут) — иначе клик по ним «съедается» драгом и трудно попасть в кнопку.
      if (
        (e.target as HTMLElement).closest(
          'button, a, input, select, label, [role="radio"], [role="button"]',
        )
      ) {
        return;
      }
      drag.current = {
        active: true,
        moved: false,
        startX: e.clientX,
        startY: e.clientY,
        baseTop: posRef.current.top,
        baseLeft: posRef.current.left,
      };
      window.addEventListener('pointermove', onWinMove);
      window.addEventListener('pointerup', onWinUp);
    },
    [onWinMove, onWinUp],
  );

  // Подавляем клик, если плашку тащили.
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }, []);

  useEffect(() => {
    let next = defaultPos;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.top === 'number' && typeof p.left === 'number') next = p;
      }
    } catch {
      /* дефолт */
    }
    setPos(clampToViewport(next.top, next.left));
    setReady(true);
    return () => {
      window.removeEventListener('pointermove', onWinMove);
      window.removeEventListener('pointerup', onWinUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampToViewport, onWinMove, onWinUp, storageKey]);

  const style: React.CSSProperties = {
    top: `${pos.top}px`,
    left: `${pos.left}px`,
    opacity: ready ? 1 : 0,
  };

  return { rootRef, style, onPointerDown, onClickCapture };
}

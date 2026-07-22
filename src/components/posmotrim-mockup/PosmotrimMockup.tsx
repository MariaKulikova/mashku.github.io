import React, { useCallback, useRef, useState } from 'react';
import styles from './posmotrim-mockup.module.css';

// Позиции/цвета/размеры сняты с posmotrim.design (контейнер ~16/9).
// light — карточка на тёмном фоне (текст белый); иначе тёмный текст + серое тело.
const CARDS = [
  { id: 'design', title: 'дизайн', body: 'улучшить визуальную коммуникацию минимальными усилиями', bg: '#3E3FFF', light: true, top: '13%', left: '1%', rot: -8, depth: 14 },
  { id: 'brand', title: 'фирменный стиль и брендбук', body: 'системность и масштабируемость стиля', bg: '#B9FF49', light: false, top: '11%', left: '63%', rot: 5, depth: 20 },
  { id: 'lang', title: 'визуальный язык', body: 'единство стиля и тон коммуникации', bg: '#6679FF', light: true, top: '57%', left: '7%', rot: -3, depth: 10 },
  { id: 'ui', title: 'интерфейсы', body: 'логика, иерархия, читаемость, контраст', bg: '#ECFACD', light: false, top: '68%', left: '40%', rot: -4, depth: 15 },
];

const NAV = ['Ai-ревизор', 'Знания', 'Консультация'];

// Иконки соцсетей — один пак (Phosphor, viewBox 256, fill currentColor), как на сайте.
const SOCIALS = [
  'M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z',
  'M160,80a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H168A8,8,0,0,1,160,80Zm-24,78a42,42,0,0,1-42,42H32a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H90a38,38,0,0,1,25.65,66A42,42,0,0,1,136,158ZM40,116H90a22,22,0,0,0,0-44H40Zm80,42a26,26,0,0,0-26-26H40v52H94A26,26,0,0,0,120,158Zm128-6a8,8,0,0,1-8,8H169a32,32,0,0,0,56.59,11.2,8,8,0,0,1,12.8,9.61A48,48,0,1,1,248,152Zm-17-8a32,32,0,0,0-62,0Z',
  'M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z',
  'M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19Zm-61.14,36L78.15,126.35l-49.6-9.73ZM88,200V152.52l24.79,21.74Zm87.53,8L92.85,135.5l119-85.29Z',
];

/**
 * Интерактивный мокап главного экрана posmotrim.design: меню (лого + пилюли),
 * соцсети, крупный «ПОСМОТРИМ» и цветные карточки. Карточки можно перетаскивать
 * мышью; при простом движении мыши — лёгкий параллакс; на наведении — подъём.
 */
export default function PosmotrimMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [offsets, setOffsets] = useState<Record<string, { dx: number; dy: number }>>({});
  const [dragId, setDragId] = useState<string | null>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; baseDx: number; baseDy: number } | null>(null);

  const onParallax = (e: React.MouseEvent) => {
    if (dragRef.current) return; // во время перетаскивания параллакс не мешаем
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setOff({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const onDragMove = useCallback((e: PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    setOffsets((o) => ({ ...o, [d.id]: { dx: d.baseDx + (e.clientX - d.startX), dy: d.baseDy + (e.clientY - d.startY) } }));
  }, []);

  const onDragUp = useCallback(() => {
    dragRef.current = null;
    setDragId(null);
    window.removeEventListener('pointermove', onDragMove);
    window.removeEventListener('pointerup', onDragUp);
  }, [onDragMove]);

  const onCardDown = useCallback(
    (e: React.PointerEvent, id: string) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const base = offsets[id] ?? { dx: 0, dy: 0 };
      dragRef.current = { id, startX: e.clientX, startY: e.clientY, baseDx: base.dx, baseDy: base.dy };
      setDragId(id);
      window.addEventListener('pointermove', onDragMove);
      window.addEventListener('pointerup', onDragUp);
    },
    [offsets, onDragMove, onDragUp],
  );

  return (
    <div
      ref={ref}
      className={styles.mockup}
      onMouseMove={onParallax}
      onMouseLeave={() => setOff({ x: 0, y: 0 })}
      aria-label="Мокап главного экрана posmotrim.design"
    >
      <div className={styles.title} aria-hidden="true">ПОСМОТРИМ</div>

      {/* Меню: реальный логотип posmotrim слева, пилюли-разделы справа. */}
      <div className={styles.nav} aria-hidden="true">
        <span className={styles.logo}>
          <img src="/img/posmotrim-logo.svg" alt="" className={styles.logoImg} draggable={false} />
        </span>
        <span className={styles.navItems}>
          {NAV.map((n) => (
            <span key={n} className={styles.navItem}>
              {n}
            </span>
          ))}
        </span>
      </div>

      {/* Соцсети — вертикально у правого края (один пак иконок). */}
      <span className={styles.socials} aria-hidden="true">
        {SOCIALS.map((d, i) => (
          <span key={i} className={styles.social}>
            <svg viewBox="0 0 256 256" aria-hidden="true">
              <path d={d} />
            </svg>
          </span>
        ))}
      </span>

      {CARDS.map((c) => {
        const o = offsets[c.id] ?? { dx: 0, dy: 0 };
        return (
          <div
            key={c.id}
            className={`${styles.cardWrap} ${c.light ? styles.cardLight : ''}`}
            onPointerDown={(e) => onCardDown(e, c.id)}
            style={{
              top: c.top,
              left: c.left,
              transform: `translate(${off.x * c.depth + o.dx}px, ${off.y * c.depth + o.dy}px)`,
              transition: dragId === c.id ? 'none' : undefined,
              zIndex: dragId === c.id ? 5 : undefined,
              cursor: dragId === c.id ? 'grabbing' : 'grab',
            }}
          >
            <article className={styles.card} style={{ background: c.bg, ['--rot' as string]: `${c.rot}deg` }}>
              <span className={styles.cardTitle}>{c.title}</span>
              <span className={styles.cardBody}>{c.body}</span>
            </article>
          </div>
        );
      })}

      <div className={styles.cta} aria-hidden="true">и проконсультируем →</div>
    </div>
  );
}

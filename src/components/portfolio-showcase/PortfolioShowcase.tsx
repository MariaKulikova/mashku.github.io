import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import Link from '@docusaurus/Link';
import styles from './portfolio-showcase.module.css';

// SSR-safe layout effect (в браузере — до отрисовки, на сервере — no-op без варнинга).
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Радиус блоба считаем в пикселях от высоты (а не % от ширины) — иначе на широких
// вкладках форма вырождается в «линзу» с острыми концами и режет крайние буквы.
// Множители по углам дают органичную асимметрию; два набора — для морфа при переключении.
// Органичная блоб-форма (проценты) — как была изначально. Две вариации для морфа.
// От обрезки текста спасает не форма, а запас блоба вокруг лейбла (padX/padY в measure).
// Радиус в пикселях от высоты: вертикальный = r (=h/2) → бока полностью скруглены
// (не «срезаны»); горизонтальный варьируем (органичные концы). Текст держим за
// пределами угловой зоны запасом padX, поэтому он не режется при любой ширине.
function blobRadius(h: number, variant: number): string {
  const r = h / 2;
  const hx =
    variant % 2 === 0 ? [1.0, 1.55, 1.3, 0.85] : [1.45, 0.9, 1.05, 1.4];
  const parts = hx.map((k) => `${(r * k).toFixed(1)}px`).join(' ');
  return `${parts} / ${r}px ${r}px ${r}px ${r}px`;
}

export type PortfolioItem = {
  title: string;
  subtitle?: string; // компания или тип (напр. 'Shiftgears.ai', 'Telegram bot')
  role?: string; // моя роль в проекте
  url: string; // внешний ресурс проекта
  disciplines: string[]; // дисциплины — по ним работает фильтр-вкладки
  tags: string[]; // теги карточки: сфера/аудитория/стадия (CloudTech, B2B, Startup…)
  vibecoded?: boolean; // спроектировала и собрала сама → значок
  caseStudyUrl?: string; // внутренняя страница проекта/кейса — если есть, клик по карточке ведёт сюда
  image?: string; // превью (если есть)
  imageBg?: string; // подложка под превью-леттербокс
};

type Props = {
  items: PortfolioItem[];
  allLabel?: string;
};

/**
 * Полноширинная полоса тегов-фильтра + единая сетка карточек проектов и работ.
 * Активную вкладку подсвечивает один общий блоб-индикатор, который «перетекает»
 * (едет + морфит форму) к выбранной вкладке. Клик по карточке ведёт на внутреннюю
 * страницу (caseStudyUrl), если есть, иначе — на внешний ресурс.
 */
export default function PortfolioShowcase({ items, allLabel = 'All' }: Props) {
  const [active, setActive] = useState(allLabel);

  // Вкладки: allLabel (=«всё», умбрелла) + дисциплины в порядке первого появления.
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const item of items) {
      for (const d of item.disciplines) {
        if (!seen.includes(d)) seen.push(d);
      }
    }
    return [allLabel, ...seen];
  }, [items, allLabel]);

  const visible = items.filter(
    (item) => active === allLabel || item.disciplines.includes(active),
  );

  // --- Поэтапное появление: вкладки и карточки въезжают по мере скролла ---
  const bandRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [tabsIn, setTabsIn] = useState(false);
  const [cardsIn, setCardsIn] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof IntersectionObserver === 'undefined' || reduce) {
      setTabsIn(true);
      setCardsIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (e.target === bandRef.current) setTabsIn(true);
          if (e.target === gridRef.current) setCardsIn(true);
        }
      },
      { threshold: 0.15 },
    );
    if (bandRef.current) obs.observe(bandRef.current);
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  // --- Блоб-индикатор ---
  const filtersRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    ready: false,
  });
  // Счётчик переключений — по его чётности чередуем форму блоба (гарантирует морф).
  const [switchCount, setSwitchCount] = useState(0);

  const measure = useCallback(() => {
    const el = chipRefs.current[active];
    if (!el) return;
    // Запас вокруг лейбла: органичная (%) форма — «линза», поэтому текст должен
    // сидеть в её полной центральной зоне. padX — горизонтальный воздух (в пределах,
    // чтобы блоб не доставал до соседних лейблов), padY — чтобы бока были достаточно
    // высокими и не срезали верх/низ крайних букв.
    const padX = 16;
    const padY = 4;
    setIndicator({
      x: el.offsetLeft - padX,
      y: el.offsetTop - padY,
      w: el.offsetWidth + padX * 2,
      h: el.offsetHeight + padY * 2,
      ready: true,
    });
  }, [active]);

  // Пересчёт позиции при смене вкладки (до отрисовки — без мелькания).
  useIsoLayoutEffect(() => {
    measure();
  }, [measure]);

  // Морф формы — на каждое переключение.
  useIsoLayoutEffect(() => {
    setSwitchCount((c) => c + 1);
  }, [active]);

  // Пересчёт при ресайзе и после загрузки шрифта (меняется ширина чипов).
  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    let cancelled = false;
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }
    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
    };
  }, [measure]);

  return (
    <section className={styles.showcase}>
      {/* Полоса фильтра — на всю ширину вьюпорта (брейк-аут из колонки .body). */}
      <div ref={bandRef} className={`${styles.band} ${tabsIn ? styles.bandIn : ''}`}>
        <div
          ref={filtersRef}
          className={styles.filters}
          role="group"
          aria-label="Filter by category"
        >
          <span
            className={styles.indicator}
            aria-hidden="true"
            style={{
              opacity: indicator.ready ? 1 : 0,
              width: `${indicator.w}px`,
              height: `${indicator.h}px`,
              transform: `translate(${indicator.x}px, ${indicator.y}px)`,
              borderRadius: blobRadius(indicator.h, switchCount),
            }}
          />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              ref={(el) => {
                chipRefs.current[cat] = el;
              }}
              className={`${styles.chip} ${active === cat ? styles.chipActive : ''}`}
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ul ref={gridRef} className={styles.grid}>
        {visible.map((item, idx) => {
          const internal = Boolean(item.caseStudyUrl);
          const href = item.caseStudyUrl ?? item.url;

          const inner = (
            <>
              {item.image && (
                <span
                  className={styles.imageWrap}
                  style={{ '--card-img-bg': item.imageBg } as React.CSSProperties}
                >
                  <img
                    className={styles.image}
                    src={item.image}
                    alt=""
                    loading="lazy"
                  />
                </span>
              )}
              <span className={styles.cardTop}>
                <span className={styles.cardTitle}>{item.title}</span>
                {item.subtitle && (
                  <span className={styles.cardSubtitle}>{item.subtitle}</span>
                )}
                {item.role && <span className={styles.cardRole}>{item.role}</span>}
              </span>
              <span className={styles.tags}>
                {item.vibecoded && (
                  <span className={`${styles.tag} ${styles.tagVibe}`}>⚡ Vibecoded</span>
                )}
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </span>
            </>
          );

          return (
            <li
              key={item.title}
              className={`${styles.cardItem} ${cardsIn ? styles.cardItemIn : ''}`}
              style={{ transitionDelay: cardsIn ? `${idx * 70}ms` : '0ms' }}
            >
              {internal ? (
                <Link className={styles.card} to={href}>
                  {inner}
                </Link>
              ) : (
                <a
                  className={styles.card}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

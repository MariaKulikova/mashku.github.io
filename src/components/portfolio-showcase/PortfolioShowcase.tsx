import React, { useMemo, useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import PosmotrimMockup from '../posmotrim-mockup/PosmotrimMockup';
import styles from './portfolio-showcase.module.css';

export type PortfolioItem = {
  title: string;
  subtitle?: string; // компания или тип (напр. 'Shiftgears.ai', 'Telegram bot')
  role?: string; // моя роль в проекте
  url: string; // внешний ресурс проекта
  disciplines: string[]; // дисциплины — показываем тегами на карточке
  tags: string[]; // теги карточки: сфера/аудитория/стадия (CloudTech, B2B, Startup…)
  vibecoded?: boolean; // спроектировала и собрала сама → значок
  caseStudyUrl?: string; // внутренняя страница проекта/кейса — если есть, клик ведёт сюда
  image?: string; // превью (если есть)
  imageBg?: string; // подложка под превью-леттербокс
};

type Props = {
  items: PortfolioItem[];
  allLabel?: string; // больше не используется (оставлен для совместимости вызова)
};

// Ссылка карточки: внутренний кейс (Link) или внешний ресурс (a).
function cardTags(item: PortfolioItem) {
  return [...item.disciplines, ...item.tags];
}

/**
 * Витрина проектов без вкладок-фильтра: сверху — облако тегов (по всем проектам),
 * затем избранный проект Posmotrim.design во всю ширину (интерактивный мокап слева,
 * описание справа, без обводки), ниже — сетка остальных проектов. Все проекты
 * показываются сразу, дисциплины и теги — прямо на карточках.
 */
export default function PortfolioShowcase({ items }: Props) {
  // Активный тег из облака: null → показываем все проекты; иначе — только с этим тегом.
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTag ? items.filter((i) => cardTags(i).includes(activeTag)) : items),
    [items, activeTag],
  );
  // Избранные проекты с крупными обложками (Posmotrim — интерактивный мокап,
  // ShiftGears — обложка-скриншот). Остальные — обычной сеткой.
  const posmotrim = useMemo(() => filtered.find((i) => i.url.includes('posmotrim')), [filtered]);
  const shift = useMemo(() => filtered.find((i) => i.url.includes('shiftgears')), [filtered]);
  const rest = useMemo(
    () => filtered.filter((i) => i !== posmotrim && i !== shift),
    [filtered, posmotrim, shift],
  );

  // Облако тегов: частота дисциплин+тегов по всем проектам → размер и насыщенность.
  const cloud = useMemo(() => {
    const counts = new Map<string, number>();
    for (const it of items) {
      for (const t of [...it.disciplines, ...it.tags]) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    const max = Math.max(1, ...[...counts.values()]);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, w: count / max }));
  }, [items]);

  // Поэтапное появление: облако и контент въезжают по мере скролла.
  const bandRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [cloudIn, setCloudIn] = useState(false);
  const [cardsIn, setCardsIn] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof IntersectionObserver === 'undefined' || reduce) {
      setCloudIn(true);
      setCardsIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (e.target === bandRef.current) setCloudIn(true);
          if (e.target === contentRef.current) setCardsIn(true);
        }
      },
      { threshold: 0.12 },
    );
    if (bandRef.current) obs.observe(bandRef.current);
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  const renderCardInner = (item: PortfolioItem) => (
    <>
      {item.image && (
        <span
          className={styles.imageWrap}
          style={{ '--card-img-bg': item.imageBg } as React.CSSProperties}
        >
          <img className={styles.image} src={item.image} alt="" loading="lazy" />
        </span>
      )}
      <span className={styles.cardTop}>
        <span className={styles.cardTitle}>{item.title}</span>
        {item.subtitle && <span className={styles.cardSubtitle}>{item.subtitle}</span>}
        {item.role && <span className={styles.cardRole}>{item.role}</span>}
      </span>
      <span className={styles.tags}>
        {item.vibecoded && <span className={styles.tag}>⚡ Vibecoded</span>}
        {cardTags(item).map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </span>
    </>
  );

  // Обычная карточка проекта (внутренний кейс — Link, иначе внешняя ссылка).
  const renderProjectCard = (item: PortfolioItem) => {
    const internal = Boolean(item.caseStudyUrl);
    const href = item.caseStudyUrl ?? item.url;
    return internal ? (
      <Link className={styles.card} to={href}>
        {renderCardInner(item)}
      </Link>
    ) : (
      <a className={styles.card} href={href} target="_blank" rel="noopener noreferrer">
        {renderCardInner(item)}
      </a>
    );
  };

  // Избранный проект: крупная обложка + карточка-описание, наезжающая на её угол,
  // и рядом (в свободном месте) — карточка-компаньон. Клик по названию — на сайт.
  // mirror → обложка справа, компаньон слева (ритм).
  const renderFeatured = (
    item: PortfolioItem,
    cover: React.ReactNode,
    mirror: boolean,
    companion?: PortfolioItem,
  ) => (
    <div
      className={`${styles.featured} ${mirror ? styles.featuredMirror : ''} ${cardsIn ? styles.featuredIn : ''}`}
    >
      <div className={styles.featuredInner}>
        <div className={styles.featuredMockup}>{cover}</div>
        <div className={styles.featuredCard}>
          <a
            className={styles.featuredTitle}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
          {item.subtitle && <span className={styles.featuredSubtitle}>{item.subtitle}</span>}
          {item.role && <span className={styles.featuredRole}>{item.role}</span>}
          <span className={styles.tags}>
            {item.vibecoded && <span className={styles.tag}>⚡ Vibecoded</span>}
            {cardTags(item).map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </span>
        </div>
      </div>
      {companion && <div className={styles.featuredSide}>{renderProjectCard(companion)}</div>}
    </div>
  );

  return (
    <section className={styles.showcase}>
      {/* Облако тегов — на всю ширину вьюпорта (брейк-аут из колонки .body). */}
      <div ref={bandRef} className={`${styles.band} ${cloudIn ? styles.bandIn : ''}`}>
        <div className={styles.cloud} role="group" aria-label="Фильтр по тегам">
          {cloud.map(({ tag, w }) => {
            const active = activeTag === tag;
            return (
              <button
                type="button"
                key={tag}
                className={`${styles.cloudTag} ${active ? styles.cloudTagActive : ''}`}
                aria-pressed={active}
                onClick={() => setActiveTag((cur) => (cur === tag ? null : tag))}
                style={{
                  fontSize: `${(0.95 + w * 1.3).toFixed(2)}rem`,
                  opacity: active || !activeTag ? (0.5 + w * 0.5).toFixed(2) : 0.3,
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={contentRef}>
        {/* Избранные проекты крупными обложками; рядом — карточка-компаньон
            (Posmotrim + первый из остальных, ShiftGears + второй). Лишние — в сетку. */}
        {posmotrim && renderFeatured(posmotrim, <PosmotrimMockup />, false, rest[0])}
        {shift &&
          renderFeatured(
            shift,
            <img
              className={styles.coverImg}
              src="/img/shiftgears-cover.jpg"
              alt=""
              loading="lazy"
            />,
            true,
            rest[1],
          )}

        {/* Оставшиеся проекты (если есть) — обычной сеткой. */}
        {rest.length > 2 && (
          <ul ref={gridRef} className={styles.grid}>
            {rest.slice(2).map((item, idx) => (
              <li
                key={item.title}
                className={`${styles.cardItem} ${cardsIn ? styles.cardItemIn : ''}`}
                style={{ transitionDelay: cardsIn ? `${idx * 70}ms` : '0ms' }}
              >
                {renderProjectCard(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

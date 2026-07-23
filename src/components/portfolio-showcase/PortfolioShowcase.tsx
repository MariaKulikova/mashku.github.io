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
  // Избранные проекты с крупными обложками (Posmotrim — интерактивный мокап,
  // ShiftGears — обложка-скриншот). Остальные — обычной сеткой.
  const posmotrim = useMemo(() => items.find((i) => i.url.includes('posmotrim')), [items]);
  const shift = useMemo(() => items.find((i) => i.url.includes('shiftgears')), [items]);
  const rest = useMemo(
    () => items.filter((i) => i !== posmotrim && i !== shift),
    [items, posmotrim, shift],
  );

  // Поэтапное появление контента по мере скролла.
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [cardsIn, setCardsIn] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof IntersectionObserver === 'undefined' || reduce) {
      setCardsIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target === contentRef.current) setCardsIn(true);
        }
      },
      { threshold: 0.12 },
    );
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

  // Избранный проект: обложка + описание РЯДОМ (без карточки-подложки).
  // Клик по названию — на сайт. mirror → обложка справа, описание слева.
  const renderFeatured = (item: PortfolioItem, cover: React.ReactNode, mirror: boolean) => (
    <div
      className={`${styles.featured} ${mirror ? styles.featuredMirror : ''} ${cardsIn ? styles.featuredIn : ''}`}
    >
      <div className={styles.featuredMockup}>{cover}</div>
      <div className={styles.featuredInfo}>
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
  );

  return (
    <section className={styles.showcase}>
      <div ref={contentRef}>
        {/* Избранные проекты крупными обложками. */}
        {posmotrim && renderFeatured(posmotrim, <PosmotrimMockup />, false)}
        {shift &&
          renderFeatured(
            shift,
            <div className={styles.scrollCover}>
              <img src="/img/shiftgears-cover.jpg" alt="Лендинг ShiftGears" loading="lazy" />
            </div>,
            true,
          )}

        {/* Остальные проекты — сетка карточек (с обводкой). */}
        <ul ref={gridRef} className={styles.grid}>
          {rest.map((item, idx) => {
            const internal = Boolean(item.caseStudyUrl);
            const href = item.caseStudyUrl ?? item.url;
            return (
              <li
                key={item.title}
                className={`${styles.cardItem} ${cardsIn ? styles.cardItemIn : ''}`}
                style={{ transitionDelay: cardsIn ? `${idx * 70}ms` : '0ms' }}
              >
                {internal ? (
                  <Link className={styles.card} to={href}>
                    {renderCardInner(item)}
                  </Link>
                ) : (
                  <a
                    className={styles.card}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {renderCardInner(item)}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

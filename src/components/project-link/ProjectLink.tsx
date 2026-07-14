import React, { useState } from 'react';
import styles from './project-link.module.css';

type Props = { href: string; children: React.ReactNode };

// Хост для подписи-фолбэка, если сайт запрещает встраивание в iframe
// (X-Frame-Options / CSP frame-ancestors) — напр. Telegram (t.me).
function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/**
 * Ссылка проекта с превью-поповером: при наведении рядом со ссылкой
 * показывается «первый экран» сайта в живом iframe (рендерится на десктопной
 * ширине и масштабируется вниз). iframe монтируется лениво — только на hover.
 */
export default function ProjectLink({ href, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={styles.wrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="project-link">
        {children}
      </a>
      {open && (
        <span className={styles.popover} aria-hidden="true">
          <span className={styles.host}>{hostOf(href)}</span>
          <span className={styles.clip}>
            <iframe
              className={styles.frame}
              src={href}
              title=""
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
            />
          </span>
        </span>
      )}
    </span>
  );
}

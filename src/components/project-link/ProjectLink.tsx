import React, { useState } from 'react';
import styles from './project-link.module.css';

type Props = { href: string; preview?: string; previewBg?: string; children: React.ReactNode };

// Хост для подписи-фолбэка, когда для ссылки нет скриншота-превью.
function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/**
 * Ссылка проекта с превью-поповером: при наведении рядом со ссылкой
 * показывается статичный скриншот первого экрана сайта (`preview`).
 * Для ссылок без скриншота (напр. Telegram-боты) — подпись с хостом.
 */
export default function ProjectLink({ href, preview, previewBg, children }: Props) {
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
          {preview ? (
            <img
              className={styles.image}
              src={preview}
              alt=""
              loading="lazy"
              // Подложка под конкретный скриншот (не тема) — прокидываем как CSS-переменную,
              // сам цвет применяется в .module.css (без инлайновых визуальных стилей).
              style={previewBg ? ({ '--preview-bg': previewBg } as React.CSSProperties) : undefined}
            />
          ) : (
            <span className={styles.host}>{hostOf(href)}</span>
          )}
        </span>
      )}
    </span>
  );
}

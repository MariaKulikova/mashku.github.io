import React, { useEffect, useRef } from 'react';

type Props = {
  /** Идентификатор поста в формате "channelname/123" (из ссылки t.me/channelname/123). */
  post: string;
};

/**
 * Эмбед одного поста Telegram через официальный telegram-widget.js.
 * Скрипт клиентский — вставляем его в useEffect (SSR-safe): при монтировании
 * он подменяется на iframe с постом.
 */
export default function TelegramEmbed({ post }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Тёмный фон постов (data-dark) — только на тёмной теме. На синей/розовой
    // тёмные карточки выглядели бы чёрными пятнами на цветном фоне.
    const inject = () => {
      const ap = document.documentElement.getAttribute('data-appearance');
      const dark = ap === 'dark';
      el.innerHTML = '';
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-post', post);
      script.setAttribute('data-width', '100%');
      // Прячем аватар/имя канала у каждого поста — они уже есть в шапке блога.
      script.setAttribute('data-userpic', 'false');
      if (dark) script.setAttribute('data-dark', '1');
      el.appendChild(script);
    };

    inject();
    // Перерисовываем эмбед при смене темы сайта (ось data-appearance на <html>).
    const mo = new MutationObserver(inject);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-appearance'],
    });
    return () => {
      mo.disconnect();
      el.innerHTML = '';
    };
  }, [post]);

  return <div ref={ref} />;
}

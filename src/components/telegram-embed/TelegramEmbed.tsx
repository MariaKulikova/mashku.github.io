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
    el.innerHTML = '';
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-post', post);
    script.setAttribute('data-width', '100%');
    el.appendChild(script);
    return () => {
      el.innerHTML = '';
    };
  }, [post]);

  return <div ref={ref} />;
}

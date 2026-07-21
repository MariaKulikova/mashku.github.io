import React, { useEffect, useRef } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useSound } from './useSound';
import styles from './sound-toggle.module.css';

// Громкости и параметры «ветра» вынесены в константы — подбирать на слух удобнее тут.
const CLICK_VOLUME = 0.25; // звук клика — негромкий
const WIND_MAX_VOLUME = 0.45; // потолок ветра на быстром скролле
const WIND_SPEED_SCALE = 0.3; // px/ms скорости скролла → громкость
const WIND_VELOCITY_DECAY = 0.9; // затухание скорости за кадр, когда скролл остановился
const WIND_VOL_LERP = 0.15; // сглаживание громкости ветра

const SoundOnIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const SoundOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export default function SoundToggle() {
  const [enabled, setEnabled] = useSound();
  const clickSoundUrl = useBaseUrl('/audio/click_sound.mp3');
  const windSoundUrl = useBaseUrl('/audio/wind_sound.mp3');

  // Ref со свежим значением — глобальные слушатели ниже вешаются один раз,
  // но всегда читают актуальное состояние тумблера.
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  // Звук клика по всему сайту, пока звук включён. Клик — пользовательский жест,
  // поэтому autoplay-политика браузера воспроизведению не мешает.
  useEffect(() => {
    const audio = new Audio(clickSoundUrl);
    audio.preload = 'auto';
    audio.volume = CLICK_VOLUME;

    const onClick = () => {
      if (!enabledRef.current) return;
      audio.currentTime = 0;
      audio.play().catch(() => {
        /* воспроизведение может быть отклонено — не критично */
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [clickSoundUrl]);

  // Ветер на скролле: стоишь — тишины; скроллишь — тем громче, чем быстрее.
  // Только при включённом звуке. Громкость привязана к скорости скролла (px/ms).
  useEffect(() => {
    const wind = new Audio(windSoundUrl);
    wind.loop = true;
    wind.preload = 'auto';
    wind.volume = 0;

    let velocity = 0; // недавняя скорость скролла, px/ms
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;
    let lastT = performance.now();
    let raf = 0;
    let running = false;

    const tick = () => {
      velocity *= WIND_VELOCITY_DECAY; // без новых событий скролла — плавно гаснет
      const target = enabledRef.current
        ? Math.min(WIND_MAX_VOLUME, velocity * WIND_SPEED_SCALE)
        : 0;
      wind.volume += (target - wind.volume) * WIND_VOL_LERP;

      // Совсем стихло и скролл стоит — глушим и останавливаем цикл до следующего скролла.
      if (wind.volume < 0.01 && velocity < 0.002) {
        wind.volume = 0;
        if (!wind.paused) wind.pause();
        running = false;
        return;
      }
      if (enabledRef.current && wind.paused) {
        wind.play().catch(() => {});
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(now - lastT, 1);
      velocity = Math.max(velocity, Math.abs(y - lastY) / dt); // пик недавней скорости
      lastY = y;
      lastT = now;
      if (enabledRef.current && wind.paused) wind.play().catch(() => {});
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      wind.pause();
    };
  }, [windSoundUrl]);

  return (
    <button
      className={styles.button}
      onClick={() => setEnabled(!enabled)}
      aria-label={enabled ? 'Turn sound off' : 'Turn sound on'}
      aria-pressed={enabled}
      title={enabled ? 'Sound off' : 'Sound on'}
    >
      {enabled ? <SoundOnIcon /> : <SoundOffIcon />}
    </button>
  );
}

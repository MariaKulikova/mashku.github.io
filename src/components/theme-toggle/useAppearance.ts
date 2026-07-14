import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'white' | 'dark' | 'pink' | 'blue';

export const APPEARANCES: Appearance[] = ['white', 'dark', 'pink', 'blue'];

const STORAGE_KEY = 'appearance';
const DEFAULT: Appearance = 'white';

function readFromDom(): Appearance {
  if (typeof document !== 'undefined') {
    const a = document.documentElement.getAttribute('data-appearance');
    if (a && (APPEARANCES as string[]).includes(a)) {
      return a as Appearance;
    }
  }
  return DEFAULT;
}

/**
 * Тема оформления (ось `data-appearance` на <html>), независимая от Docusaurus
 * colorMode. Значение до гидрации ставит инлайн-скрипт из docusaurus.config.ts
 * (анти-FOUC); здесь синхронизируемся с ним после монтирования и переключаем.
 */
export function useAppearance(): [Appearance, (next: Appearance) => void] {
  // SSR/первый рендер — дефолт (совпадает с :root), чтобы не было расхождения гидрации
  const [appearance, setState] = useState<Appearance>(DEFAULT);

  useEffect(() => {
    setState(readFromDom());
  }, []);

  const setAppearance = useCallback((next: Appearance) => {
    setState(next);
    document.documentElement.setAttribute('data-appearance', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage может быть недоступен — не критично */
    }
  }, []);

  return [appearance, setAppearance];
}

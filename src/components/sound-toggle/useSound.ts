import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'sound';
const DEFAULT = false; // звук по умолчанию выключен

function readStored(): boolean {
  if (typeof localStorage === 'undefined') return DEFAULT;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on';
  } catch {
    return DEFAULT;
  }
}

/**
 * Глобальный тумблер звука сайта (звук клика и т.п.). Значение хранится в
 * localStorage и синхронизируется между вкладками через событие storage —
 * по образцу useAppearance. SSR/первый рендер отдаёт DEFAULT, чтобы не ловить
 * рассинхрон гидрации; фактическое значение подтягиваем после монтирования.
 */
export function useSound(): [boolean, (next: boolean) => void] {
  const [enabled, setState] = useState<boolean>(DEFAULT);

  useEffect(() => {
    setState(readStored());

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setState(e.newValue === 'on');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setEnabled = useCallback((next: boolean) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    } catch {
      /* localStorage может быть недоступен — не критично */
    }
  }, []);

  return [enabled, setEnabled];
}

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'buddy';
const EVENT = 'buddytoggle';
const DEFAULT = true; // буба включена по умолчанию

function readStored(): boolean {
  if (typeof localStorage === 'undefined') return DEFAULT;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === null ? DEFAULT : v === 'on';
  } catch {
    return DEFAULT;
  }
}

/**
 * Глобальный тумблер бубы (blue-buddy). Значение в localStorage; между вкладками
 * синхронизируется через событие storage, внутри одной вкладки — через кастомное
 * событие buddytoggle (storage в том же табе не срабатывает). SSR отдаёт DEFAULT.
 */
export function useBuddy(): [boolean, (next: boolean) => void] {
  const [enabled, setState] = useState<boolean>(DEFAULT);

  useEffect(() => {
    setState(readStored());
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(e.newValue !== 'off');
    };
    const onCustom = (e: Event) => setState((e as CustomEvent<boolean>).detail);
    window.addEventListener('storage', onStorage);
    window.addEventListener(EVENT, onCustom as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(EVENT, onCustom as EventListener);
    };
  }, []);

  const setEnabled = useCallback((next: boolean) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    } catch {
      /* localStorage может быть недоступен — не критично */
    }
    try {
      window.dispatchEvent(new CustomEvent<boolean>(EVENT, { detail: next }));
    } catch {
      /* окружение без CustomEvent — не критично */
    }
  }, []);

  return [enabled, setEnabled];
}

/**
 * hooks/useLocalStorage.ts
 *
 * Generic localStorage state hook.
 * SSR-güvenli, hydration uyumlu.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  // Sunucu tarafında initial value kullan
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Client'a geçince localStorage'dan oku
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // Bozuk veri → initial value ile devam
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue(prev => {
        const newValue = typeof value === 'function'
          ? (value as (prev: T) => T)(prev)
          : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch { /* ignore quota errors */ }
        return newValue;
      });
    },
    [key],
  );

  return [storedValue, setValue];
}

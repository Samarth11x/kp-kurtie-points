'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const WISHLIST_KEY = 'kp_kurtie_point_wishlist';

export function useWishlist() {
  const [items, setItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try {
        const parsed: string[] = JSON.parse(stored);
        setItems(new Set(parsed));
      } catch {
        setItems(new Set());
      }
    }
  }, []);

  const save = useCallback((next: Set<string>) => {
    setItems(new Set(next));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(Array.from(next)));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      setItems((prev) => {
        const updated = new Set(prev);
        if (updated.has(id)) {
          updated.delete(id);
        } else {
          updated.add(id);
        }
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(Array.from(updated)));
        return updated;
      });
    },
    [setItems]
  );

  const has = useCallback((id: string) => items.has(id), [items]);

  const clear = useCallback(() => {
    localStorage.removeItem(WISHLIST_KEY);
    setItems(new Set());
  }, []);

  const list = useMemo(() => Array.from(items), [items]);

  return {
    items,
    list,
    has,
    toggle,
    clear,
    setItems: save,
  };
}

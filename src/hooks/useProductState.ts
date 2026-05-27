import { useState } from 'react';
import type { SelectedVariant, ProductVariant } from '../data/types';

export const useSelectedVariant = (
  variants: ProductVariant[],
  urlParams?: SelectedVariant
): [SelectedVariant, (variant: SelectedVariant) => void] => {
  const [selected, setSelected] = useState<SelectedVariant>(
    urlParams || (variants.length > 0 ? { color: variants[0].color, size: variants[0].size } : { color: '', size: '' })
  );

  return [selected, setSelected];
};

export const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  };

  return [storedValue, setValue];
};

export const useImageZoom = () => {
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return {
    zoomed,
    setZoomed,
    position,
    handleMouseMove,
  };
};

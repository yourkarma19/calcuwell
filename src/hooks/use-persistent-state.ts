"use client";

import { useState, useCallback } from "react";

function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const initialValue = typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  const setPersistentState = useCallback((newValue: T | ((val: T) => T)) => {
    setState(prevState => {
      const valueToStore = newValue instanceof Function ? newValue(prevState) : newValue;
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
      return valueToStore;
    });
  }, [key]);

  return [state, setPersistentState];
}

export default usePersistentState;

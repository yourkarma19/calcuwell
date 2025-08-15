"use client";

import { useState, useEffect, useCallback } from "react";

function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setPersistentState = useCallback((newValue: T | ((val: T) => T)) => {
    setState(prevState => {
      const valueToStore = newValue instanceof Function ? newValue(prevState) : newValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
      return valueToStore;
    });
  }, [key]);

  return [state, setPersistentState];
}

export default usePersistentState;

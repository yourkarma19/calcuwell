"use client";

import { useState, useEffect, useCallback } from "react";

function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        setState(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
    setIsInitialized(true);
  }, [key]);

  const setPersistentState = useCallback((newValue: T | ((val: T) => T)) => {
      const valueToStore = newValue instanceof Function ? newValue(state) : newValue;
      setState(valueToStore);
      if (isInitialized) {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.error(`Error setting localStorage key “${key}”:`, error);
        }
      }
    }, [key, isInitialized, state]);

  return [state, setPersistentState];
}

export default usePersistentState;

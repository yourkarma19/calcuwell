"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersistentState<T>(
  key: string,
  defaultValue: T,
  reviver?: (value: unknown) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      if (item) {
        const parsed = JSON.parse(item);
        return reviver ? reviver(parsed) : parsed;
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      window.localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;

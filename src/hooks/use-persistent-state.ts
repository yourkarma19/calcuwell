
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersistentState<T>(
  key: string,
  defaultValue: T,
  reviver?: (value: unknown) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          return reviver ? reviver(parsed) : parsed;
        }
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem(key, serializedState);
      }
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;

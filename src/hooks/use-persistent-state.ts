"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersistentState<T>(
  key: string,
  defaultValue: T,
  reviver?: (value: unknown) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        setState(reviver ? reviver(parsed) : parsed);
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key, reviver]);

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

"use client";

import { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";

function usePersistentState<T>(
  key: string,
  defaultValue: T,
  reviver?: (value: unknown) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          setState(reviver ? reviver(parsed) : parsed);
        }
      } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
        setState(defaultValue);
      }
    }
  }, [key, reviver, isHydrated, defaultValue]);

  const setPersistentState = useCallback<Dispatch<SetStateAction<T>>>((newState) => {
    setState(prevState => {
      const valueToStore = newState instanceof Function ? newState(prevState) : newState;
      try {
        const serializedState = JSON.stringify(valueToStore);
        window.localStorage.setItem(key, serializedState);
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
      return valueToStore;
    });
  }, [key]);

  return [state, setPersistentState];
}

export default usePersistentState;

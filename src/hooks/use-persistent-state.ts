
"use client";

import { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";

// This is a global cache for our persistent state.
// By caching promises, we ensure that the localStorage is read only once
// per key, even if multiple components use the same hook simultaneously.
const stateCache = new Map<string, Promise<any>>();

function usePersistentState<T>(
    key: string,
    defaultValue: T,
    reviver?: (value: any) => T
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        let cacheKey = `persistent-state-${key}`;
        
        // Check if we already have a promise for this key in our cache
        let promise = stateCache.get(cacheKey);

        if (!promise) {
            // If not, create a new promise to fetch the value from localStorage
            promise = new Promise((resolve) => {
                try {
                    const item = window.localStorage.getItem(key);
                    if (item) {
                        const parsed = JSON.parse(item);
                        resolve(reviver ? reviver(parsed) : parsed);
                    } else {
                        resolve(defaultValue);
                    }
                } catch (error) {
                    console.error(`Error reading localStorage key “${key}”:`, error);
                    resolve(defaultValue);
                }
            });
            // Store the promise in the cache
            stateCache.set(cacheKey, promise);
        }

        // Use the promise (either the new one or the one from the cache)
        promise.then(storedValue => {
            if(storedValue !== null && storedValue !== undefined) {
              setState(storedValue);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const setPersistentState: Dispatch<SetStateAction<T>> = useCallback((newValue) => {
        setState(prevState => {
            const resolvedValue = typeof newValue === 'function' ? (newValue as (prevState: T) => T)(prevState) : newValue;
            try {
                if (resolvedValue !== undefined && resolvedValue !== null) {
                    window.localStorage.setItem(key, JSON.stringify(resolvedValue));
                }
            } catch (error) {
                console.error(`Error setting localStorage key “${key}”:`, error);
            }
            return resolvedValue;
        });
    }, [key]);

    return [state, setPersistentState];
}

export default usePersistentState;

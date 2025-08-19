
"use client";

import { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";

function usePersistentState<T>(
    key: string,
    defaultValue: T,
    reviver?: (value: any) => T
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        let cacheKey = `persistent-state-${key}`;
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsed = JSON.parse(item);
                setState(reviver ? reviver(parsed) : parsed);
            } else {
                setState(defaultValue);
            }
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            setState(defaultValue);
        }
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

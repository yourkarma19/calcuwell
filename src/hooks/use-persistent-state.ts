
"use client";

import { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";

function usePersistentState<T>(
    key: string,
    defaultValue: T,
    reviver?: (value: any) => T
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        let storedValue: T;
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsed = JSON.parse(item);
                storedValue = reviver ? reviver(parsed) : parsed;
            } else {
                storedValue = defaultValue;
            }
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            storedValue = defaultValue;
        }
        setState(storedValue);
    }, [key, defaultValue, reviver]);

    const setPersistentState: Dispatch<SetStateAction<T>> = useCallback((newValue) => {
        setState(prevState => {
            const resolvedValue = typeof newValue === 'function' ? (newValue as (prevState: T) => T)(prevState) : newValue;
            try {
                window.localStorage.setItem(key, JSON.stringify(resolvedValue));
            } catch (error) {
                console.error(`Error setting localStorage key “${key}”:`, error);
            }
            return resolvedValue;
        });
    }, [key]);

    return [state, setPersistentState];
}

export default usePersistentState;

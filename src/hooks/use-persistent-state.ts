"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersistentState<T>(
    key: string, 
    defaultValue: T,
    reviver?: (value: any) => T
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState(() => {
        if (typeof window === 'undefined') {
            return defaultValue;
        }
        try {
            const storedValue = window.localStorage.getItem(key);
            if (!storedValue) return defaultValue;

            const parsedValue = JSON.parse(storedValue);
            return reviver ? reviver(parsedValue) : parsedValue;

        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(key, JSON.stringify(state));
            } catch (error) {
                console.error(`Error setting localStorage key “${key}”:`, error);
            }
        }
    }, [key, state]);

    return [state, setState];
}

export default usePersistentState;

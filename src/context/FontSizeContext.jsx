import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "malta-app-large-text";

export const FontSizeContext = createContext({
    largeText: false,
    toggle: () => {},
});

export function FontSizeProvider({ children }) {
    const [largeText, setLargeText] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY) === "true";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, String(largeText));
        } catch {}
    }, [largeText]);

    const toggle = () => setLargeText((prev) => !prev);

    return (
        <FontSizeContext.Provider value={{ largeText, toggle }}>
            {children}
        </FontSizeContext.Provider>
    );
}

export function useFontSizeContext() {
    return useContext(FontSizeContext);
}

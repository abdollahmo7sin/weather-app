import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        if (!stored) return initialValue
        try {
            return JSON.parse(stored) as T
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as const
}
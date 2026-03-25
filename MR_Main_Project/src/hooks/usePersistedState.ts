import { useEffect, useState } from 'react'

type InitialValue<T> = T | (() => T)

function resolveInitialValue<T>(initialValue: InitialValue<T>): T {
    return initialValue instanceof Function ? initialValue() : initialValue
}

function usePersistedState<T>(key: string, initialValue: InitialValue<T>) {
const [value, setValue] = useState<T>(() => {
    const fallbackValue = resolveInitialValue(initialValue)
    if (typeof window === 'undefined') {
        return fallbackValue
    }
    try {
        const storedValue = window.localStorage.getItem(key)
    if (storedValue === null) {
        return fallbackValue
    }
    return JSON.parse(storedValue) as T
    } catch {
    return fallbackValue
    }
})

useEffect(() => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // doesnt work in private mode, ignore error
    }
}, [key, value])

return [value, setValue] as const
}

export default usePersistedState

import React from 'react'

export function useLocalStorage<T>(key: string, initialValue: T ) {
    const [value, setValue] = React.useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)
        if (typeof initialValue === 'function') {
            return (initialValue as () => T) ()
        }
        return initialValue
    })

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])



  return [value, setValue] as [T, typeof setValue]
}


import { useState, useEffect } from "preact/hooks"

import { getLocalValue } from "./helper"

export function useLocalValue<T>(key:string, initialValue:T){
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

export function useLocalDate(key:string, initialValue:string){
    const [date, setDate] = useState(() => {
        return new Date(getLocalValue(key, initialValue))
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(date))
    }, [date])

    return [date, setDate] as const
}
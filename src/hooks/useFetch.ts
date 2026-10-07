import { useState, useEffect, useRef } from "react"


export const useFetch = <T>(API_URL: string) => {

    const [data, setData] = useState<T | null>(null)
    const [loading, SetLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const abortController = useRef<AbortController | null>(null)

    const fetchData = async () => {
        if (!API_URL) return
        setError(null)
        abortController.current?.abort()
        abortController.current = new AbortController()
        try {
            SetLoading(true)
            const respons = await fetch(API_URL, { signal: abortController.current.signal })
            if (!respons.ok) throw new Error(`Error fetching data : ${respons.status}`);

            const result = await respons.json()
            setData(result)
            SetLoading(false)
        }
        catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                return
            }
            setError(error instanceof Error ? error.message : "Something went wrong")
            SetLoading(false)
        }


    }
    useEffect(() => {
        return () => {
            abortController.current?.abort()
        }
    }, [])


    return { data, setData, loading, error, fetchData } as const





}
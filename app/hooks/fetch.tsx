"use client"
import { useEffect, useState } from 'react'

interface FetchProps {
    url: string,
    method: string | undefined, 
    body: any | undefined,
    headers: any
}

export const useFetchWithState = ({ url, method, body, headers }: FetchProps) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<undefined | any>()

    useEffect(() => {
        setLoading(true)
        fetch(url, { method, body, headers })
            .then(response => response.json())
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, method, body])

    return {
        data,
        loading,
        error
    }
}

export const useFetchStateWithRefetch = ({ url, method, body, headers }: FetchProps) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [load, setLoad] = useState(0)

    useEffect(() => {
        if (!load) return
        setLoading(true)
        fetch(url, { method, body, headers })
            .then(response => response.json())
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
            // eslint-disable-next-line
    }, [load])

    return {
        data,
        loading,
        error,
        fetch: () => setLoad(Date.now())
    }
}
import { ObservableProvider } from '../observableProvider'
import { useState, useEffect } from 'react'
import { AutoDisposeObservableProvider } from '../observableProvider/autoDispose'

type UseProviderValues<T> = {
    isLoading: boolean
    data: T
    error: any
}

export const useProvider = <T>(provider: ObservableProvider<T> | AutoDisposeObservableProvider<T>) => {
    const [currentValue, setCurrentValue]  = useState<T | null>(null)
    const [currentError, setCurrentError] = useState<any | null>(null)

    useEffect(() => {
        const handleError = (error: any) => {
            setCurrentError(error)
        }

        const handleValue = (value: T) => {
            setCurrentValue(value)
        }
        const [valueSubscription, errorSubscription] = provider.subscribe(handleValue, handleError)
        return () => {
            valueSubscription.unsubscribe()
            errorSubscription.unsubscribe()
            provider.registerUnsubscribe()
        }
    }, [provider])

    return {
        isLoading: (currentValue === null || currentValue === undefined) && (currentError === null),
        data: currentValue,
        error: currentError,
    } as UseProviderValues<T>
}

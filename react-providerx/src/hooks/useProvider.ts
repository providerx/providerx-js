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

    useEffect(() => {
        const subscription = provider.subscribe(setCurrentValue)
        return () => {
            subscription.unsubscribe()
            provider.registerUnsubscribe()
        }
    }, [provider])

    return {
        isLoading: currentValue === null || currentValue === undefined,
        data: currentValue,
        error: null
    } as UseProviderValues<T>
}

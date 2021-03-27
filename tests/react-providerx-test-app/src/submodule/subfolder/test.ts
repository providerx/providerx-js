import { ObservableProvider } from 'react-providerx/src'
import { useState, useEffect } from 'react'

type UseProviderValues<T> = {
    isLoading: boolean
    data: T
}

export const useProvider = <T>(provider: ObservableProvider<T>) => {
    const [currentValue, setCurrentValue]  = useState<T | null>(null)

    useEffect(() => {
        const handleSubscriptionValue = (value: any) => {
            setCurrentValue(value)
        }
        const subscription = (provider.behaviorSubject$.asObservable() as any).subscribe(handleSubscriptionValue)
        return () => {
            subscription.unsubscribe()
        }
    }, [provider.behaviorSubject$])

    return {
        isLoading: currentValue === null || currentValue === undefined,
        data: currentValue,
        error: null
    } as UseProviderValues<T>
}

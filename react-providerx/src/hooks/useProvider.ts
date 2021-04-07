import { useState, useEffect } from 'react'
import { AutoDisposeObservableProvider } from '../observableProvider/autoDispose'
import { BaseObservableProvider } from '../observableProvider/base'

type UseProviderValues<T> = {
  isLoading: boolean
  data: T
  error: any
}

export const useProvider = <T>(provider: BaseObservableProvider<T>) => {
  const [currentValue, setCurrentValue] = useState<T | undefined>(undefined)
  const [currentError, setCurrentError] = useState<any | undefined>(undefined)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleError = (error: any) => {
      setCurrentError(error)
    }

    const handleLoading = (loading: boolean) => {
      setLoading(loading)
    }

    const handleValue = (value: T | undefined) => {
      setCurrentValue(value)
    }
    const [valueSubscription, errorSubscription] = provider.subscribe(
      handleValue,
      handleError
    )
    return () => {
      valueSubscription.unsubscribe()
      errorSubscription.unsubscribe()
      if (provider instanceof AutoDisposeObservableProvider) {
        provider.registerUnsubscribe()
      }
    }
  }, [])

  return {
    isLoading: currentValue === undefined && currentError === undefined,
    data: currentValue,
    error: currentError,
  } as UseProviderValues<T>
}

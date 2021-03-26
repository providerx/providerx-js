import { useObservable } from "rxjs-hooks"
import { ObservableProvider } from "../providers/observableProvider"

export const useProvider = <T>(provider: ObservableProvider<T>) => {
    try {
        const value = useObservable(() => provider.behaviorSubject$.asObservable())
        return {
            isLoading: value === null,
            data: value,
            error: null
        }
    }
    catch (error) {
        return {
            isLoading: false,
            data: null,
            error: error,
        }
    }
}

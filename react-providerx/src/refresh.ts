import { BaseObservableProvider } from "./observableProvider/base"

export const refresh = <T>(provider: BaseObservableProvider<T>) => {
    return provider._compute()
}

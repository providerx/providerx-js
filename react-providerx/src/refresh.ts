import { ObservableProvider } from "./observableProvider"

export const refresh = (provider: ObservableProvider<any>) => {
    return provider._compute()
}

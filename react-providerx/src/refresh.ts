import { ObservableProvider } from "./providers/observableProvider"

export const refresh = (provider: ObservableProvider<any>) => {
    return provider._compute()
}

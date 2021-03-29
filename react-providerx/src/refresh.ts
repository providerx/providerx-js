import { ObservableProvider } from "./observableProvider"
import { AutoDisposeObservableProvider } from "./observableProvider/autoDispose"

export const refresh = (provider: ObservableProvider<any> | AutoDisposeObservableProvider<any>) => {
    return provider._compute()
}

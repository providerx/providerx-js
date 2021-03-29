import { BaseObservableProvider } from "../base"

export abstract class BaseObservableProviderFamily<T, P> {
    _store: any = {}
    observableCreator
    constructor(observableCreator: any) {
        this.observableCreator = observableCreator
    }

    abstract pass(param: P): BaseObservableProvider<T>
}

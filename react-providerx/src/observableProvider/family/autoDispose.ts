import { Observable } from "rxjs";
import { ProviderReference } from "../../models/providerReference";
import { ObservableProvider } from "../index";
import { BaseObservableProviderFamily } from "./base";

export class AutoDisposeObservableProviderFamily<T, P> extends BaseObservableProviderFamily<T, P> {
    _store: any = {}
    observableCreator
    constructor(observableCreator: (ref: ProviderReference, param: P) => Observable<T>) {
        super(observableCreator)
        this.observableCreator = observableCreator
    }
    pass(param: P): ObservableProvider<T> {
        let retrievedProvider = this._store[param]
        if(retrievedProvider === undefined || retrievedProvider === null) {
            this._store[param] = ObservableProvider.autoDispose((ref) => {
                return this.observableCreator(ref, param)
            })
            retrievedProvider = this._store[param]
        }
        return retrievedProvider
    }
}

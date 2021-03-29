import { Observable } from "rxjs";
import { ProviderReference } from "../../models/providerReference";
import { ObservableProvider } from "../index";
import { AutoDisposeObservableProviderFamily } from "./autoDispose";
import { BaseObservableProviderFamily } from "./base";

export class ObservableProviderFamily<T, P> extends BaseObservableProviderFamily<T, P> {
    _store: any = {}
    observableCreator
    constructor(observableCreator: (param: P) => Observable<T>) {
        super(observableCreator)
        this.observableCreator = observableCreator
    }
    static autoDispose<ST, SP>(observableCreator: (ref: ProviderReference, param: SP) => Observable<ST>): AutoDisposeObservableProviderFamily<ST, SP> {
        return new AutoDisposeObservableProviderFamily(observableCreator)
    }
    
    pass(param: P): ObservableProvider<T> {
        let retrievedProvider = this._store[param]
        if(retrievedProvider === undefined || retrievedProvider === null) {
            this._store[param] = new ObservableProvider(() => {
                return this.observableCreator(param)
            })
            retrievedProvider = this._store[param]
        }
        return retrievedProvider
    }
}

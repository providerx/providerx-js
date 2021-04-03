import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { ProviderReference, AutoDisposeProviderReference } from '../models/providerReference'
import { AutoDisposeObservableProvider } from './autoDispose'
import { BaseObservableProvider } from './base'


export class ObservableProvider<T> extends BaseObservableProvider<T> {
    _valueSubject$: BehaviorSubject<T> | BehaviorSubject<undefined>
    _errorSubject$: BehaviorSubject<T> | BehaviorSubject<undefined>
    observableCreator: (ref: ProviderReference) => Observable<T>
    _observable$: Observable<T>
    ref: ProviderReference
    _internalSubscription?: Subscription

    constructor(observableCreator: (ref: ProviderReference) => Observable<T>) {
        super(observableCreator)
        this.observableCreator = observableCreator
        this._observable$ = new Observable()
        this.ref = new ProviderReference()
        this._valueSubject$ = new BehaviorSubject(undefined)
        this._errorSubject$ = new BehaviorSubject(undefined)
    }

    static autoDispose<S>(observableCreator: (ref: AutoDisposeProviderReference) => Observable<S>) {
        return new AutoDisposeObservableProvider<S>(observableCreator);
    }
    
    _compute() {
        this.ref = new ProviderReference()
        this._observable$ = this.observableCreator(this.ref)
        if(this._observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this._internalSubscription = this._observable$.subscribe(
            (val: T) => {
                if(this.ref.executionError !== undefined) {
                    this._advanceError(this.ref.executionError)
                    return
                }
                this._advanceValue(val)
            },
            (error: any) => {
                this._advanceError(error)
            }
        )
    }
}

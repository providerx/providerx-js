import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { ProviderReference } from '../models/providerReference'
import { AutoDisposeObservableProvider } from './autoDispose'
import { BaseObservableProvider } from './base'


export class ObservableProvider<T> extends BaseObservableProvider<T> {
    _valueSubject$: BehaviorSubject<T> | BehaviorSubject<undefined>
    _errorSubject$: BehaviorSubject<T> | BehaviorSubject<undefined>
    observableCreator
    _observable$: Observable<T>
    _internalSubscription?: Subscription

    constructor(observableCreator: () => Observable<T>) {
        super(observableCreator)
        this.observableCreator = observableCreator
        this._observable$ = new Observable()
        this._valueSubject$ = new BehaviorSubject(undefined)
        this._errorSubject$ = new BehaviorSubject(undefined)
    }

    static autoDispose<S>(observableCreator: (ref: ProviderReference) => Observable<S>) {
        return new AutoDisposeObservableProvider<S>(observableCreator);
    }
    
    _compute() {
        this._observable$ = this.observableCreator()
        if(this._observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this._internalSubscription = this._observable$.subscribe(
            (val: T) => {
                this._valueSubject$.next(val as any)
                this._errorSubject$.next(null as any)
            },
            (error: any) => {
                this._errorSubject$.next(error)
                this._valueSubject$.next(null as any)
            }
        )
    }
}

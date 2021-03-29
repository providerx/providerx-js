import { BehaviorSubject, from, Observable, Subscription } from "rxjs";
import { ProviderReference } from "../models/providerReference";

export class AutoDisposeObservableProvider<T> {
    _valueSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    _errorSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    observableCreator
    ref: ProviderReference
    _observable$: Observable<T>
    _internalSubscription?: Subscription

    constructor(observableCreator: (ref: ProviderReference) => Observable<T>) {
        this.observableCreator = observableCreator
        this.ref = {
            maintainState: true
        }
        this._observable$ = new Observable()
        this._valueSubject$ = new BehaviorSubject(null)
        this._errorSubject$ = new BehaviorSubject(null)
    }

    public get valueObservable() {
        return this._valueSubject$.asObservable() as Observable<T>
    }

    public get errorObservable() {
        return this._errorSubject$.asObservable() as Observable<T>
    }
    
    static fromPromise<S>(promise: () => Promise<S>): AutoDisposeObservableProvider<S> {
        return new AutoDisposeObservableProvider<S>(() => (from(promise()) as any))
    }

    subscribe(dataCallback: (value: T) => void, errorCallback: (error: any) => void): Subscription[] {
        this._compute()
        return [this.valueObservable.subscribe(dataCallback), this.errorObservable.subscribe(errorCallback)]
    }
    
    _compute() {
        this.ref = {
            ...this.ref,
            maintainState: true
        }
        this._observable$ = this.observableCreator(this.ref)
        if(this._observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this._internalSubscription = this._observable$.subscribe(
            (val: T) => {
                this._valueSubject$.next(val as any)
                this._errorSubject$.next(null as any)
            },
            (error: any) => {
                this._errorSubject$.next(error as any)
                this._valueSubject$.next(null as any)
            }
        )
    }

    _reset() {
        if(this._internalSubscription !== undefined) {
            console.log('unsubscribing')
            this._internalSubscription.unsubscribe()
        }
        this._valueSubject$ = new BehaviorSubject(null)
        this._errorSubject$ = new BehaviorSubject(null)
    }

    registerUnsubscribe() {
        if(this.ref.maintainState === true) {
            return
        }
        const valueObservers = this._valueSubject$.observers
        const errorObservers = this._errorSubject$.observers
        if(valueObservers.length < 1 && errorObservers.length < 1) {
            this._reset()
        }
    }
}

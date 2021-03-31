import { BehaviorSubject, Observable, Subscription } from 'rxjs'

export abstract class BaseObservableProvider<T> {
    _valueSubject$: BehaviorSubject<T> | BehaviorSubject<undefined>
    _errorSubject$: BehaviorSubject<T> | BehaviorSubject<undefined>
    observableCreator
    _observable$: Observable<T>
    _internalSubscription?: Subscription

    constructor(observableCreator: any) {
        this.observableCreator = observableCreator
        this._observable$ = new Observable()
        this._valueSubject$ = new BehaviorSubject(undefined)
        this._errorSubject$ = new BehaviorSubject(undefined)
    }
    
    public get observable() {
        if(this._internalSubscription === undefined) {
            this._compute()
        }
        return this._valueSubject$.asObservable() as Observable<T>
    }

    public get errorObservable() {
        return this._errorSubject$.asObservable() as Observable<T>
    }

    subscribe(dataCallback: (value: T) => void, errorCallback: (error: any) => void): Subscription[] {
        this._compute()
        return [this.observable.subscribe(dataCallback), this.errorObservable.subscribe(errorCallback)]
    }
    
    abstract _compute(): void
}

import { BehaviorSubject, Observable, Subscription } from 'rxjs'

export abstract class BaseObservableProvider<T> {
    _valueSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    _errorSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    observableCreator
    _observable$: Observable<T>

    constructor(observableCreator: any) {
        this.observableCreator = observableCreator
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

    subscribe(dataCallback: (value: T) => void, errorCallback: (error: any) => void): Subscription[] {
        this._compute()
        return [this.valueObservable.subscribe(dataCallback), this.errorObservable.subscribe(errorCallback)]
    }
    
    abstract _compute(): void
}

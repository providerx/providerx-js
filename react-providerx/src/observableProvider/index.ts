import { BehaviorSubject, from, Observable } from 'rxjs'
import { ProviderReference } from '../models/providerReference'
import { AutoDisposeObservableProvider } from './autoDispose'
import { BaseObservableProvider } from './base'


export class ObservableProvider<T> extends BaseObservableProvider<T> {
    _valueSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    _errorSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    observableCreator
    _observable$: Observable<T>

    constructor(observableCreator: () => Observable<T>) {
        super(observableCreator)
        this.observableCreator = observableCreator
        this._observable$ = new Observable()
        this._valueSubject$ = new BehaviorSubject(null)
        this._errorSubject$ = new BehaviorSubject(null)
    }

    static autoDispose<S>(observableCreator: (ref: ProviderReference) => Observable<S>) {
        return new AutoDisposeObservableProvider<S>(observableCreator);
    }
    
    static fromPromise<S>(promise: () => Promise<S>): ObservableProvider<S> {
        return new ObservableProvider<S>(() => (from(promise()) as any))
    }
    
    _compute() {
        this._observable$ = this.observableCreator()
        if(this._observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this._observable$.subscribe(
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

import { BehaviorSubject, from, Observable, Subscription } from 'rxjs'
import { AutoDisposeObservableProvider } from './autoDispose'


export class ObservableProvider<T> {
    behaviorSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    observableCreator: () => Observable<T>
    _observable$: Observable<T>

    constructor(observableCreator: () => Observable<T>) {
        this.observableCreator = observableCreator
        this._observable$ = this.observableCreator()
        this.behaviorSubject$ = new BehaviorSubject(null)
        this._compute()
    }

    static autoDispose<S>(observableCreator: () => Observable<S>) {
        return new AutoDisposeObservableProvider<S>(observableCreator);
    }
    
    get value() {
        return this.behaviorSubject$.value
    }

    get observable() {
        return this._observable$
    }
    
    static fromPromise<S>(promise: () => Promise<S>): ObservableProvider<S> {
        return new ObservableProvider<S>(() => (from(promise()) as any))
    }

    static fromValue<S>(valueGenerator: () => S): ObservableProvider<S> {
        return new ObservableProvider<S>(() => {
            return from(valueGenerator()) as any
        })
    }

    subscribe<T>(subscribeCallback: (param: T) => void): Subscription {
        if(this._observable$ === null || this._observable$ === undefined) {
            this._compute()
        }        
        return (this.behaviorSubject$.asObservable() as any).subscribe(subscribeCallback)
    }
    
    _compute() {
        if(this._observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this._observable$.subscribe((val: T) => {
            this.behaviorSubject$.next(val as any)
        })
    }

    _reset() {
        this._observable$ = this.observableCreator()
        this.behaviorSubject$ = new BehaviorSubject(null)
    }

    registerUnsubscribe() {

    }
}

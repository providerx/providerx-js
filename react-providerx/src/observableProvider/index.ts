import { BehaviorSubject, from, Observable, Subscription } from 'rxjs'
import { AutoDisposeObservableProvider } from './exporter'


export class ObservableProvider<T> {
    behaviorSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    observableCreator: () => (Observable<T> | null)
    observable$?: (Observable<T> | null)

    constructor(observableCreator: () => (Observable<T> | null)) {
        this.observableCreator = observableCreator
        this.behaviorSubject$ = new BehaviorSubject(null)
        this._compute()
    }

    static autoDispose<S>(observableCreator: () => (Observable<S> | null)) {
        return new AutoDisposeObservableProvider<S>(observableCreator);
    }
    
    get value() {
        return this.behaviorSubject$.value
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
        if(this.observable$ === null || this.observable$ === undefined) {
            this._compute()
        }        
        return (this.behaviorSubject$.asObservable() as any).subscribe(subscribeCallback)
    }
    
    _compute() {
        this.observable$ = this.observableCreator()
        if(this.observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this.observable$.subscribe((val: T) => {
            this.behaviorSubject$.next(val as any)
        })
    }

    _reset() {
        this.observable$ = null
        this.behaviorSubject$ = new BehaviorSubject(null)
    }

    registerUnsubscribe() {
    }
}

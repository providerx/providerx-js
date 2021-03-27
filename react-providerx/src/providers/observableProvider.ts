import { BehaviorSubject, from, Observable } from 'rxjs'

export class ObservableProvider<T> {
    behaviorSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    observableCreator: () => (Observable<T> | null)
    observable$?: (Observable<T> | null)
    constructor(observableCreator: () => (Observable<T> | null)) {
        this.observableCreator = observableCreator
        this.behaviorSubject$ = new BehaviorSubject(null)
        this._compute()
    }
    
    get value() {
        return this.behaviorSubject$.value
    }
    
    static fromPromise<S>(promise: () => Promise<S>): ObservableProvider<S> {
        return new ObservableProvider<S>(() => (from(promise()) as any))
    }
    
    _compute = () => {
        this.observable$ = this.observableCreator()
        if(this.observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this.observable$.subscribe((val: T) => {
            this.behaviorSubject$.next(val as any)
        })
    }
}

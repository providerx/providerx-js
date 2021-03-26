import { BehaviorSubject, Observable } from 'rxjs'

export class ObservableProvider<T> {
    behaviorSubject$: BehaviorSubject<T> | BehaviorSubject<null>
    observable$: Observable<T>
    constructor(observableCreator: () => Observable<T>) {
        this.observable$ = observableCreator()
        this.behaviorSubject$ = new BehaviorSubject(null)
        if(this.observable$ === null) {
            throw 'observableCreator cannot return null. It must return an instance of Observable'
        }
        this._compute()
    }
    
    _compute = () => {
        this.observable$.subscribe((val: T) => {
            this.behaviorSubject$.next(val as any)
        })
    }
}

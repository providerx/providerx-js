import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { ProviderReference } from '../models/providerReference'
import { filter } from 'rxjs/operators'

export abstract class BaseObservableProvider<T> {
  _valueSubject$: BehaviorSubject<T | undefined>
  _errorSubject$: BehaviorSubject<any | undefined>
  observableCreator
  ref: ProviderReference
  _observable$: Observable<T>
  _internalSubscription?: Subscription

  constructor(observableCreator: (ref: any) => Observable<T>) {
    this.observableCreator = observableCreator
    this._observable$ = new Observable()
    this.ref = new ProviderReference()
    this._valueSubject$ = new BehaviorSubject<T | undefined>(undefined)
    this._errorSubject$ = new BehaviorSubject<any | undefined>(undefined)
  }

  public get observable(): Observable<T> {
    if (this._internalSubscription === undefined) {
      this._compute()
    }
    return this._valueSubject$.pipe(
      filter((value) => value !== undefined)
    ) as any
  }

  private get errorObservable(): Observable<any> {
    return this._errorSubject$.pipe(
      filter((value) => value !== undefined)
    ) as any
  }

  _advanceValue(value: T) {
    this._valueSubject$.next(value)
    this._errorSubject$.next(undefined)
  }

  _advanceError(error: any) {
    this._errorSubject$.next(error)
    this._valueSubject$.next(undefined)
  }

  subscribe(
    dataCallback: (value: T) => void,
    errorCallback: (error: any) => void
  ): Subscription[] {
    if (this._internalSubscription === undefined) {
      this._compute()
    }
    return [
      this.observable.subscribe(dataCallback),
      this.errorObservable.subscribe(errorCallback),
    ]
  }

  abstract _compute(): void
}

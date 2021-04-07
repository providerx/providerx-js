import { BehaviorSubject, from, Observable, Subscription } from 'rxjs'
import { AutoDisposeProviderReference } from '../models/providerReference'
import { BaseObservableProvider } from './base'

export class AutoDisposeObservableProvider<
  T
> extends BaseObservableProvider<T> {
  observableCreator
  ref: AutoDisposeProviderReference
  _observable$: Observable<T>
  _internalSubscription?: Subscription

  constructor(
    observableCreator: (ref: AutoDisposeProviderReference) => Observable<T>
  ) {
    super(observableCreator)
    this.observableCreator = observableCreator
    this.ref = new AutoDisposeProviderReference(false)
    this._observable$ = new Observable()
  }

  static fromPromise<S>(
    promise: () => Promise<S>
  ): AutoDisposeObservableProvider<S> {
    return new AutoDisposeObservableProvider<S>(() => from(promise()) as any)
  }

  _reset() {
    if (this._internalSubscription !== undefined) {
      this._internalSubscription.unsubscribe()
    }
    this._valueSubject$ = new BehaviorSubject<T | undefined>(undefined)
    this._errorSubject$ = new BehaviorSubject<T | undefined>(undefined)
  }

  _compute() {
    this.ref = new AutoDisposeProviderReference(false)
    this._reset()
    this._observable$ = this.observableCreator(this.ref)
    if (this._observable$ === null) {
      throw 'observableCreator cannot return null. It must return an instance of Observable'
    }
    this._internalSubscription = this._observable$.subscribe(
      (val: T) => {
        if (this.ref.executionError !== undefined) {
          this._advanceError(this.ref.executionError)
          return
        }
        this._advanceValue(val)
      },
      (error: any) => {
        this._advanceError(error)
      }
    )
  }

  registerUnsubscribe() {
    if (this.ref.maintainState === true) {
      return
    }
    const valueObservers = this._valueSubject$.observers
    const errorObservers = this._errorSubject$.observers
    if (valueObservers.length < 1 && errorObservers.length < 1) {
      this._reset()
    }
  }
}

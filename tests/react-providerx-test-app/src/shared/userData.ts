import { ObservableProvider } from 'react-providerx'
import { of } from 'rxjs'
import { doc } from 'rxfire/firestore'
import { catchError, map, switchMap } from 'rxjs/operators'
import { db } from '../utils/firebase'
import { authStateProvider$ } from './authState'

export const userDataProvider$ = new ObservableProvider((ref) => {
  const userDataObservable = authStateProvider$.observable.pipe(
    catchError((error: any) => {
      console.log('Got an error: ')
      console.log(error)
      return ref.error(error)
    }),
    switchMap((result) => {
      if (result === null) {
        return of(null)
      } else {
        return doc(db.collection('users').doc(result!.uid)).pipe(
          map((ds) => ({ ...ds.data(), id: ds.id }))
        )
      }
    })
  )

  return userDataObservable
})

import { ObservableProvider } from "react-providerx";
import { of } from "rxjs";
import { doc } from 'rxfire/firestore';
import { map, switchMap, tap } from "rxjs/operators";
import { db } from "../utils/firebase";
import { authStateProvider$ } from "./authState";

export const userDataPromiseProvider$ = new ObservableProvider(() => {
    const userDataObservable = authStateProvider$.observable.pipe(
        switchMap(result => {
            if(result === null || result === 'not-logged-in') {
                return of(null)
            }
            else {
                return doc(db.doc(`users/${result.uid}`)).pipe(
                    map(ds => ds.data()),
                    tap(userData => {
                        console.log('Got userData: ')
                        console.log(userData)
                    })
                )
            }
        })
    )
    return userDataObservable
})

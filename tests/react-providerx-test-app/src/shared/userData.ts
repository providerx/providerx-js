import { ObservableProvider } from "react-providerx";
import { of } from "rxjs";
import { doc } from 'rxfire/firestore';
import { map, switchMap } from "rxjs/operators";
import { db } from "../utils/firebase";
import { authStateProvider$ } from "./authState";

export const userDataProvider$ = new ObservableProvider(() => {
    const userDataObservable = authStateProvider$.valueObservable.pipe(
        switchMap(result => {
            if(result === null || result === 'not-logged-in') {
                return of(null)
            }
            else {
                return doc(db.doc(`users/${result.uid}`)).pipe(
                    map(ds => ds.data())
                )
            }
        })
    )
    return userDataObservable
})

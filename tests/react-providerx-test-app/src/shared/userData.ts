import { ObservableProvider } from "react-providerx";
import { of } from "rxjs";
import { doc } from 'rxfire/firestore';
import { map, switchMap } from "rxjs/operators";
import { db } from "../utils/firebase";
import { authStateProvider$ } from "./authState";

export const userDataProvider$ = new ObservableProvider(() => {
    const userDataObservable = authStateProvider$.observable.pipe(
        switchMap(result => {
            if(result === null) {
                // Not logged in
                return of(null)
            }
            else {
                return doc(db.collection('users').doc(result.uid)).pipe(
                    map(ds => ({...ds.data(), id: ds.id}))
                )
            }
        })
    )

    return userDataObservable
})

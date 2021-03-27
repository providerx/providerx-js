import { ObservableProvider } from "react-providerx";
import { authState } from 'rxfire/auth'
import { map, tap } from 'rxjs/operators'
import { auth } from "../utils/firebase";

export const authStateProvider$ = new ObservableProvider(() => {
    return authState(auth).pipe(
        map(u => u === null ? 'not-logged-in': u),
        tap(result => {
            console.log('the value of result is')
            console.log(result)
        })
    )
})

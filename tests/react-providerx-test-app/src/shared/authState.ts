import { ObservableProvider } from "react-providerx";
import { authState } from 'rxfire/auth'
import { map } from 'rxjs/operators'
import { auth } from "../utils/firebase";

export const authStateProvider$ = new ObservableProvider(() => {
    return authState(auth).pipe(
        map(u => u === null ? 'not-logged-in': u)
    )
})

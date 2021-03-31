import { ObservableProvider } from "react-providerx/lib/index";
import { authState } from 'rxfire/auth'
import { auth } from "../utils/firebase";

export const authStateProvider$ = new ObservableProvider<firebase.default.User | null>(() => {
    return authState(auth)
})

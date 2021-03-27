import { auth, googleAuthProvider } from "../utils/firebase"

export const signInWithGoogle = async () => {
    const credential = await auth.signInWithPopup(googleAuthProvider)
    return credential.user
}

export const signOut = async () => {
    await auth.signOut()
}

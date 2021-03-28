import { auth, db, googleAuthProvider } from "../utils/firebase"

export const signInWithGoogle = async () => {
    const credential = await auth.signInWithPopup(googleAuthProvider)
    const user = credential.user
    if(user === null) {
        return null
    }
    const userDocSnapshot = await db.collection('users').doc(user.uid).get()
    if(!userDocSnapshot.exists) {
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
    }
    return user
}

export const signOut = async () => {
    await auth.signOut()
}

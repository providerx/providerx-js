import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDDYZ-lhDimlI6VjGZDdZtB4NNLDFKD6M0",
    authDomain: "providerx-trial.firebaseapp.com",
    projectId: "providerx-trial",
    storageBucket: "providerx-trial.appspot.com",
    messagingSenderId: "721929665652",
    appId: "1:721929665652:web:683dafc08ff4687a442521"
};

if(firebase.apps.length <= 0) {
    firebase.initializeApp(firebaseConfig)
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore()
const auth = firebase.auth()

export {
    db,
    auth,
    googleAuthProvider,
}
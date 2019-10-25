import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import SnapshotState from 'jest-snapshot/build/State';

const config = {
    apiKey: "AIzaSyDFDCU5ZjKg_3vK9FHJ_LYws-csmfZFSjs",
    authDomain: "crwn-db-3908d.firebaseapp.com",
    databaseURL: "https://crwn-db-3908d.firebaseio.com",
    projectId: "crwn-db-3908d",
    storageBucket: "crwn-db-3908d.appspot.com",
    messagingSenderId: "404689792228",
    appId: "1:404689792228:web:843087f0ac6a42306cd0f1",
    measurementId: "G-VB58M9SC52"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup (provider);

export default firebase;
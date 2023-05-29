import {auth} from "./firebase.js";
import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

import {createUser} from "./users.js";


let user = {
    id: null,
    email: null,
}

onAuthStateChanged(auth, newUser => {
    if(newUser) {
        user = {
            id: newUser.uid,
            email: newUser.email,
        }
    } else {
        user = {
            id: null,
            email: null,
        }
    }

    notifyAll();
});

export async function login({email, password}) {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
        return {
            id: user.uid,
            email: user.email,
        };  
    } catch (error) {
        console.error("autentication error. ", error);
        throw error;
    }

}

export async function register({email, password}) {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
        await createUser(user.uid, {
            email: user.email,
        });

        return {
            id: user.uid,
            email: user.email,
        };

    } catch(err) {
        console.error(err);
        throw err;
    }
}

export function logout() {
    return signOut(auth);
}


let observers = [];

export function subscribeToAuth(callback) {
    observers.push(callback);
    notify(callback);
    return () => observers = observers.filter(obs => obs !== callback);
}

export function notifyAll() {
    observers.forEach(callback => notify(callback));
}

export function notify(callback) {
    callback(user);
}
export const getAdmin = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("no se encontro el doc :c");
    }
  };
import {auth} from "./firebase.js";
import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import {createUser, getUserById, updateUser} from "./users.js";
import {uploadFileUsingString, getFileURL} from "./storage.js";
import {setDoc, getDoc, getDocs, doc, collection, updateDoc} from 'firebase/firestore';
import {db} from './firebase.js';



let user = {
    id: null,
    email: null,
    displayName: null,
    description: null,
    cvu: null,
    photoURL: null,
}

if(localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, async newUser => {
    if(newUser) {
        user = {
            id: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            description: newUser.description,
            cvu: newUser.cvu,
            photoURL: newUser.photoURL,
        }
        if(newUser.photoURL) {
            getFileURL(newUser.photoURL)
                .then(url => {
                    setUser({photoURL: url});
                });
        }
        getUserById(newUser.uid)
            .then(userData => {
                setUser({description: userData.description, cvu: userData.cvu});
            });
    } else {
        clearUser();
    }

});

export async function login({email, password}) {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const user = credentials.user;
        return {
            id: user.uid,
            email: user.email,
        };
    } catch(err) {
        console.error("[auth.js login()] Error al autenticar el usuario. ", err);
        throw err;
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
        console.error("[auth.js register()] Error al registrar el usuario. ", err);
        throw err;
    }
}

export function logout() {
    return signOut(auth);
}

export async function updateUserProfile(id, {displayName, description, cvu, photoURL}) {
    const promises = [];
    let photoPath = user.photoURL;

    if(photoURL) {
        photoPath = user.id + '/avatar.jpg';
        promises.push(uploadFileUsingString(photoPath, photoURL));
    }

    promises.push(updateProfile(auth.currentUser, {displayName, photoURL: photoPath}));
    promises.push(updateUser(id, {displayName, description, cvu, photoURL: photoPath}));

    return Promise.all(promises)
        .then(() => {
            setUser({
                displayName,
                description,
                cvu,
            });
            if(photoURL) getFileURL(photoPath).then(url => setUser({photoURL: url}));
        });
}
function setUser(newData) {
    user = {
        ...user,
        ...newData,
    }
    localStorage.setItem('user', JSON.stringify(user));
    notifyAll();
}

function clearUser() {
    user = {
        id: null,
        email: null,
        displayName: null,
        career: null,
        photoURL: null,
    };
    localStorage.removeItem('user');
    notifyAll();
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
    callback({...user});
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
import {db} from './firebase.js';
import {setDoc, getDoc, getDocs, doc, collection} from 'firebase/firestore';

export function createUser(id, {email}) {
    const userRef = doc(db, 'users', id);

    return setDoc(userRef, {
        email
    });
}
export async function getUserById(id) {
    const userRef = doc(db, 'users', id);

    const user = await getDoc(userRef);

    if(!user.exists()) {
        throw new Error('no se encuentre el usuario');
    }
    return {
        id,
        email: user.data().email,
    }
}
export const getUsers = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("no se encontro el doc :c");
    }
  };
  
  export async function getDataUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const datos = querySnapshot.docs.map((doc) => doc.data());
    return datos;
  }

import {db} from './firebase.js';
import {addDoc, setDoc, getDoc, getDocs, doc, collection, serverTimestamp, query, where, updateDoc,onSnapshot} from 'firebase/firestore';

// create goal
export async function createGoal(data) {
    const docRef = await addDoc(collection(db, "goals"), {
        user: data.user,
        titleGoal: data.titleGoal,
        lastUpdated: serverTimestamp(),
        streak: 0,
        shield: false,
      });

    //   addStreak( docRef.id);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id
}


// read goal
export async function readGoals(user) {
    const q = query(collection(db, "goals"), where("user", "==", user));
    const querySnapshot = await getDocs(q);
  
    const goals = [];
  
    querySnapshot.forEach((doc) => {
      goals.push({ id: doc.id, ...doc.data() });
    });
    console.log(user)
    console.log("Goals:", goals);
    return goals;
  }

// updateGoal
  export async function updateGoal(id, isCompleted, resetStreak) {
    const goalRef = doc(db, "goals", id);
    const goalDoc = await getDoc(goalRef);

    if (goalDoc.exists()) {
        const currentDate = new Date();
        const lastUpdatedDate = goalDoc.data().lastUpdated.toDate();
        // const diffInDays = Math.floor((currentDate - lastUpdatedDate) / (1000 * 60 * 60 * 24));
        const diffInMinutes = Math.floor((currentDate - lastUpdatedDate) / (1000 * 60));
        
        if (diffInMinutes > 2 || resetStreak) {
          await updateDoc(goalRef, {
            streak: 0,
            lastUpdated: serverTimestamp()
          });
        } else {
          if (isCompleted) {
              const newStreak = goalDoc.data().streak + 1;
                await updateDoc(goalRef, {
                  streak: newStreak,
                  lastUpdated: serverTimestamp()
                });
            } else {
                await updateDoc(goalRef, {
                    streak: 0,
                    lastUpdated: serverTimestamp()
                });
            }
        }
    } else {
        console.log("No such document!");
    }
}
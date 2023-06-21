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
        shieldStreak: 0,
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
  export async function updateGoal(id, isCompleted) {
    const goalRef = doc(db, "goals", id);
    const goalDoc = await getDoc(goalRef);

    if (goalDoc.exists()) {
        const currentDate = new Date();
        const lastUpdatedDate = goalDoc.data().lastUpdated.toDate();
        // const diffInDays = Math.floor((currentDate - lastUpdatedDate) / (1000 * 60 * 60 * 24));
        const diffInMinutes = Math.floor((currentDate - lastUpdatedDate) / (1000 * 60));
        
        if (diffInMinutes > 2) {
          // Si ha pasado más de 1 día, reiniciar la racha a 0
          await updateDoc(goalRef, {
            streak: 1,
            shieldStreak: 1,
            lastUpdated: serverTimestamp()
          });
        } else {
          // Si ha pasado 1 día o menos
          if (isCompleted) {
              console.log("asdasd")
              const newStreak = goalDoc.data().streak + 1;
              let newShieldStreak = goalDoc.data().shieldStreak;
              if (newStreak >= 7) {
                  // Si la streak alcanza los 7 días consecutivos, incrementar shieldStreak y habilitar el "shield"
                  newShieldStreak = goalDoc.data().shieldStreak + 1;
              }
                // Si el usuario marca el goal como "hecho", incrementar la racha en 1
                await updateDoc(goalRef, {
                  streak: newStreak,
                  shieldStreak: newShieldStreak,
                  lastUpdated: serverTimestamp()
                });
            } else {
                // Si el usuario marca el goal como "no hecho", reiniciar la racha a 0
                await updateDoc(goalRef, {
                    streak: 0,
                    shieldStreak:0,
                    lastUpdated: serverTimestamp()
                });
            }
        }
    } else {
        console.log("No such document!");
    }
}


  // export async function addStreak (data) {
    //     const docRef = collection(db, 'goals', data, 'streak');
    //     const streakRef = await addDoc(docRef, {
    //         result: false,
    //         streakDate: serverTimestamp(),
    //     })
    
    //     return streakRef
        
    // }
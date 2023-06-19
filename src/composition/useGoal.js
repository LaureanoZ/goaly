import {ref} from "vue";
import {readGoal} from "../services/goals.js";

// export function getGoal() {
//     const dataGoal = ref({
//         titleGoals: null,
//     });
//     readGoal('mr6lZLHSY6kHs4UBUO5C')
//     .then(data => {
//         titleGoals.value = data;
//     });
//     return dataGoal
// };

export function useUser(id) {
    const user = ref({
        id: null,
        user: null,
    });
    const loading = ref(true);

    getUserById(id)
        .then(userData => {
            loading.value = false;
            user.value = userData;
        });

    return {
        user,
        loading,
    }
}

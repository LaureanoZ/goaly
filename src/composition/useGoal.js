import {ref} from "vue";
import {readGoal} from "../services/goals.js";


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

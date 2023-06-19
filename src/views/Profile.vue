<script setup>
import { logout } from "../services/auth.js";
import { useRouter } from "vue-router";
import { useAuth } from "../composition/useAuth.js";
import { getUserById } from "../services/users.js";
import { onBeforeMount, ref } from "vue";

const { user } = useAuth();
const { handleLogout } = useLogout();




// function userData(){
//     let userId
//     let userEmail
//     onMounted(() => {
//         // Código a ejecutar cuando el componente se monta
//         userId = user.value.id
//         userEmail= user.value.email
//         // Ejemplo: Obtener datos de una API
//     });
//     return {userId, userEmail};
// }
// let {userId} =  userData()  


function useLogout() {
    const router = useRouter();

    return {
        handleLogout() {
            logout();
            // Redireccionamos al usuario al login.
            router.push({ path: '/login' });
        }
    }
}
</script>

<template>
    <section class="row justify-content-center mt-5">
        <h1 class="mb-4 text-4xl dm-font text-light text-center">Perfil de {{ user.email }}</h1>
        <form class="col-5" action="#" method="post" @submit.prevent="handleLogout">
            <div class="row justify-content-center">
                <button class="btn-custom btn-logout p-1 my-1" type="submit">Cerrar Sesión</button>
            </div>
        </form>
    </section>
</template>

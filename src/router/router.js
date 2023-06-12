import { createRouter, createWebHashHistory } from 'vue-router'
import {subscribeToAuth, getAdmin} from "../services/auth.js";
import {auth} from "../services/firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Shield from '../views/Shield.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import Groups from '../views/Groups.vue'
import Goals from '../views/Goals.vue'


const routes = [
    { path: '/',                 component: Home },
    { path: '/shield',           component: Shield,   meta: { requiresAuth: true, } },
    { path: '/chat',             component: Chat,     meta: { requiresAuth: true, }},
    { path: '/groups',           component: Groups,     meta: { requiresAuth: true, }},
    { path: '/goals',            component: Goals,     meta: { requiresAuth: true, }},
    { path: '/login',            component: Login },
    { path: '/register',         component: Register },
    { path: '/profile',          component: Profile,  meta: { requiresAuth: true, }},
    { path: '/:404',             component: NotFound, meta: { requiresAuth: true, } },

]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

router.beforeEach( async (to, from) => {
    onAuthStateChanged(auth, async (user)=>{
        if (user){
            const userData = await getAdmin (user.uid);
            if(userData.admin){
                console.log("sos un usuario")
            }else{

                if(to.meta.requiresAdmin){
                    console.log("no sos un admin")
                    router.push("/chat");
                }
            }
        }else{
            if(to.meta.requiresAuth){
                console.log("no estas registrado, ¿que haces aca?")
                router.push("/login");
            }
        }
    })

});



export default router
<script setup>
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
import AppLabel from "../components/AppLabel.vue";
import {login} from "../services/auth.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const {dataAuth, cargando, processLogin} = useLogin();

function useLogin() {
    const router = useRouter();
    const dataAuth = ref({
        email: '',
        password: '',
    });
    const cargando = ref(false);

    async function processLogin() {
        cargando.value = true;

        await login({
            ...dataAuth.value,
        });
        cargando.value = false;

        router.push('/');
    }

    return {
        dataAuth,
        cargando,
        processLogin,
    }
}
</script>

<template>
    <div id="login">
        <h1 class="dm-font text-center mt-4">Iniciar Sesión</h1>
    </div>
    <form 
    action="#" 
    method="post"
    @submit.prevent="processLogin"
    >
        <div class="form-group my-4">
            <AppLabel for="email">Email</AppLabel>
            <AppInput 
            type="email"
            name="email"
            id="email"
            v-model="dataAuth.email"
            />
        </div>
        <div class="form-group my-4">
            <AppLabel for="password">Contraseña</AppLabel>
            <AppInput 
            id="password"
            type="password"
            name="password"
            v-model="dataAuth.password"
            />
        </div>
        <div class="form-group">
            <AppButton class="custom-button-cta fw-bold text-white col-12">Iniciar Sesión</AppButton>
        </div>
    </form>
</template>
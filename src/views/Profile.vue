<script setup>
import { logout } from "../services/auth.js";
import { useRouter } from "vue-router";
import { useAuth } from "../composition/useAuth.js";
import { updateUserProfile } from "../services/auth.js";
import { watch, ref } from "vue";
import AppLoading from "../components/AppLoading.vue";
import AppImage from "../components/AppImage.vue";


const { user } = useAuth();
const { handleLogout } = useLogout();
const { form, cargando, handleSubmit, handleFile, showForm } = useEditProfile(user);

function useEditProfile(user) {
    const form = ref({
        displayName: '',
        description: '',
        cvu: '',
        photoURL: null,
    });
    const cargando = ref(false);
    const showForm = ref(false);
    watch(user, newUser => {
        form.value.displayName = newUser.displayName;
        if (form.value.cvu === '' || newUser.cvu !== '') {
            form.value.cvu = newUser.cvu;
        }
        if (form.value.description === '' || newUser.description !== '') {
            form.value.description = newUser.description;
        }
    });

    async function handleSubmit() {
        cargando.value = true;

        try {
            await updateUserProfile(user.value.id, {
                ...form.value,
            });
            cargando.value = false;
            showForm.value = false;
            form.value.photoURL = null;
        } catch (err) {
            console.error('[MyProfile handleSubmit] ', err);
        }
    }
    async function handleFile(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            form.value.photoURL = reader.result;
        });

        reader.readAsDataURL(file);
    }

    return {
        form,
        cargando,
        handleSubmit,
        handleFile,
        showForm,
    }
}


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
      <h1 class="mb-4 text-4xl dm-font text-light text-center">Perfil de usuario</h1>
  
      <div class="col-lg-6" v-if="showForm">
        <form class="card bg-secondary p-4" action="#" method="post" @submit.prevent="handleSubmit">
            <div v-if="form.photoURL !== null" class="mb-3">
              <p class="fw-bold mb-1 text-white">Previsualización de la imagen</p>
              <img :src="form.photoURL" alt="Foto del usuario" class="img-thumbnail" style="max-width: 150px;">
            </div>
          <div class="mb-3">
            <label for="displayName" class="form-label text-white">Nombre de usuario</label>
            <input type="text" id="displayName" v-model="form.displayName" class="form-control">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label text-white">Descripción</label>
            <input type="text" id="description" v-model="form.description" class="form-control">
          </div>
          <div class="mb-3">
            <label for="cvu" class="form-label text-white">CVU</label>
            <input type="text" id="cvu" v-model="form.cvu" class="form-control">
          </div>
          <div class="mb-3">
            <label for="photoURL" class="form-label text-white">Foto de Perfil</label>
            <input type="file" id="photoURL" @change="handleFile" class="form-control">
          </div>
          <button class="btn-custom btn-account fw-bold">
            <AppLoading :cargando="cargando">Actualizar mis datos</AppLoading>
          </button>
        </form>
      </div>
  
      <div v-if="!showForm" class="col-lg-6">
        <div class="card bg-secondary p-4">
            <div class="mb-3">
              <p class="visually-hidden">Foto de Perfil:</p>
              <AppImage :src="user.photoURL" alt="foto del usuario" class="img-thumbnail" style="max-width: 150px;" />
            </div>
          <div class="mb-3">
            <p class="fw-bold mb-0 text-white">Nombre de usuario:</p>
            <p class="mb-0 text-white">{{ form.displayName }}</p>
          </div>
          <div class="mb-3">
            <p class="fw-bold mb-0 text-white">Descripción:</p>
            <p class="mb-0 text-white">{{ form.description }}</p>
          </div>
          <div class="mb-3">
            <p class="fw-bold mb-0 text-white">CVU:</p>
            <p class="mb-0 text-white">{{ form.cvu }}</p>
          </div>
          <button class="btn-custom btn-account fw-bold" @click="showForm = true">Editar</button>
        </div>
  
        <form class="card bg-secondary p-4 mt-4" action="#" method="post" @submit.prevent="handleLogout">
          <div class="row justify-content-center">
            <button class="btn btn-danger p-2" type="submit">Cerrar Sesión</button>
          </div>
        </form>
      </div>
    </section>
  </template>

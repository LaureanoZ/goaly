<script setup>
import { logout } from "./services/auth.js";
import { useRouter } from "vue-router";
import { useAuth } from "./composition/useAuth.js";

const { user } = useAuth();
const { handleLogout } = useLogout();

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
  <div class="grid-custom">

    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav d-flex align-items-center">
            <template v-if="user.id !== null">
              <li class="nav-item p-2">
                <router-link class="nav-link text-light" to="/shield">Escudos</router-link>
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link text-light" to="/goals">Goals</router-link>
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link text-light" to="/profile">Mi Perfil</router-link>
              </li>
              <li class="p-2">
                <form action="#" method="post" @submit.prevent="handleLogout">
                  <button class="btn btn-danger p-1 my-1" type="submit">Cerrar Sesión</button>
                </form>
              </li>
            </template>
            <template v-else>
              <li class="mx-1">
                <router-link class="nav-link btn custom-button-cta text-light fw-bold p-1 my-1" to="/login">Iniciar
                  Sesión</router-link>
              </li>
              <li class="mx-1">
                <router-link class="nav-link btn custom-submit text-light fw-bold p-1 my-1"
                  to="/register">Registro</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container">
      <router-view></router-view>
    </main>

    <footer>
      <section class="container pt-3">
        <div class="row d-flex align-items-center">
          <p class="col-12 text-center text-light">©Goaly 2023 - Todos los derechos reservados</p>
        </div>
      </section>
    </footer>
  </div>
</template>


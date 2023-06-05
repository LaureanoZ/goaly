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
    <main class="container">
      <router-view></router-view>
    </main>

    <section class="botonera">
      <nav class="navbar-expand navbar-light full-width">
        <ul class="navbar-nav d-flex justify-content-around full-width">
          <template v-if="user.id !== null">
            <li class="nav-item p-2">
              <router-link class="nav-link text-light" to="/shield">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  class="bi bi-shield-check" viewBox="0 0 16 16">
                  <path
                    d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                  <path
                    d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </router-link>
            </li>
            <li class="nav-item p-2">
              <router-link class="nav-link text-light" to="/goals">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                  class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
              </router-link>
            </li>
            <li class="nav-item p-2">
              <router-link class="nav-link text-light" to="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg>
              </router-link>
            </li>
            <!-- <li class="p-2">
                <form action="#" method="post" @submit.prevent="handleLogout">
                  <button class="btn btn-danger p-1 my-1" type="submit">Cerrar Sesión</button>
                </form>
              </li> -->
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
      </nav>
    </section>
</div></template>


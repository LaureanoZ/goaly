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
  <main class="container">
    <router-view></router-view>
  </main>
</template>


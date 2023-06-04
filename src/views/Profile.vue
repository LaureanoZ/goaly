<script setup>
import { useAuth } from "./../composition/useAuth.js";


const { user } = useAuth();
</script>

<template>
    <section class="row justify-content-center mt-5">
        <h1 class="mb-4 text-4xl dm-font text-light text-center">Perfil de {{ user.email }}</h1>
    
    </section>
</template>

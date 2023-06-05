<script setup>
</script>
<template>
    <section class="row justify-content-center">
        <h2 class="text-center text-white mt-4 col-11">Tus Objetivos</h2>
        <article class="col-12 container-goals my-4 p-4" v-for="i in 4">
            <div class="row justify-content-center align-items-stretch">
                <div class="col-3">
                    <div class="row justify-content-center align-items-center full-height">
                        <img style="max-width: 100px;" src="../resources/imgs/logo-goaly.png" alt="sraza">
                    </div>
                </div>
                <div class="col-9">
                    <div class="row justify-content-center align-items-center container-goals-content">
                        <div class="col-12">
                            <h3 class="text-center text-white">Los Marginados</h3>
                        </div>
                        <div class="col-12">
                            <div class="row justify-content-center align-items-center full-height">
                                <router-link class="col-9 col-sm-4 btn-custom btn-chat text-center text-decoration-none" to="/chat">Abrir Chat</router-link>
                                <a class="col-9 col-sm-4 btn-custom btn-done text-center text-decoration-none" href="#">Hecho</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>
<script setup>
import { getDataFirestore } from "../services/show.js";
import { ref, onMounted } from "vue";
import AppButton from "../components/AppButton.vue";

const shows = ref([]);

onMounted(async () => {
  shows.value = await getDataFirestore();
});
</script>
<template>
  <section class="row justify-content-center py-5">
    <h1 class="text-center mb-4 dm-font">Nuestros Shows</h1>
    <article class="col-10 col-lg-4 mb-4" v-for="show in shows">
      <div class="card">
        <img :src="`/src/resources/imgs/${show.image}.png`" class="card-img-top img-card" :alt="show.title" />
        <div class="card-body">
          <h2 class="card-title">{{ show.title }}</h2>
          <p class="card-text">{{ show.description }}</p>
          <p class="card-text">Precio: ${{ show.price }}</p>
          <AppButton class="col-12 custom-button-cta fw-bold">Adquirir</AppButton>
        </div>
      </div>
    </article>
  </section>
</template>

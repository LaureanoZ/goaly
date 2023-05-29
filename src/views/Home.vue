<script setup>
</script>

<template>
   <header class="jumbotron jumbotron-fluid mt-5">
    <div class="container text-center">
      <h1 class="display-3 dm-font">¡Bienvenido a <span class="text-nowrap">Dos Magos!</span></h1>
      <p class="lead">Descubre el asombro de la magia en nuestros espectáculos únicos.</p>
      <router-link class="btn custom-button text-light" to="/shows">Ver Shows</router-link>
    </div>
  </header>

  <section class="bg-light py-5">
    <div class="container text-center">
      <h2 class="mb-4">Galería</h2>
      <div class="row">
        <div class="col-md-4 mb-4">
          <img src="../resources/imgs/galeria-1.png" class="img-fluid" alt="Imagen 1">
        </div>
        <div class="col-md-4 mb-4">
          <img src="../resources/imgs/galeria-2.png" class="img-fluid" alt="Imagen 2">
        </div>
        <div class="col-md-4 mb-4">
          <img src="../resources/imgs/galeria-3.png" class="img-fluid" alt="Imagen 3">
        </div>
      </div>
    </div>
  </section>

</template>
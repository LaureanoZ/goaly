<script>
</script>
<template>
    <section class="row justify-content-center">
        <h2 class="text-center text-white mt-4 col-11">Tus Escudos</h2>
        <div class="col-12 col-sm-6 col-lg-3 my-5 " v-for="i in 4">
            <div class="row justify-content-center">
                <div class="col-12">
                    <article class="card-goal">
                        <div class="bg">
                            <img class="img-goal" src="../resources/imgs/logo-goaly.png" alt="sraza">
                            <h3 class="text-white text-center fs-5 title-shield">Los Marginados</h3>
                            <a href="#" class="btn-custom btn-shield text-decoration-none">Utilizar</a>
                        </div>
                        <div class="blob"></div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>
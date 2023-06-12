<script setup>
import {ref} from "vue"
let streak = ref(true);
const HandlePopUp = function () {
    if(streak.value === true){
        streak.value = false;
    }else{
        streak.value = true;
    }
}
</script>

<template>
    <section class="row justify-content-center mx-1">
        <h2 class="text-center text-white mt-4 col-11">Objetivos</h2>
        <article class="col-12 container-goals my-2 p-2" v-for="i in 4">
            <div class="button-container-card">
                <button @click.prevent="HandlePopUp" class="round-button-card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-fire icon-card-goal" viewBox="0 0 16 16">
                        <path
                            d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                    </svg>
                </button>
            </div>
            <div class="row justify-content-center align-items-stretch">
                <div class="col-11">
                    <div class="row justify-content-center align-items-center container-goals-content">
                        <template v-if="streak === true">
                            <div class="col-12">
                                <h3 class="text-center text-white goal-title-card mt-2">Correr 1h todos los dias</h3>
                            </div>
                            <div class="col-12">
                                <div class="row justify-content-center align-items-center full-height">
                                    <a class="col-9 col-sm-4 btn-custom btn-done text-center text-decoration-none"
                                    href="#">Hecho</a>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col-12">
                                <h3 class="text-center text-white goal-title-card mt-2 mb-0">Racha de:</h3>
                                <p class="text-center text-white mb-0">4 dias consecutivos</p>
                                <p class="text-center text-white mb-0">l m m j v s d</p>
                                <p class="text-center text-white mb-0">v v x v v v v</p>

                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </article>
        <div class="button-container">
            <button class="round-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus"
                    viewBox="0 0 20 16">
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Nuevo Objetivo</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="">
                            <div class="form-group">
                                <label for="modalidad">Modalidad</label>
                                <select class="form-control" name="modalidad" id="modalidad">
                                    <option value="alone">Solo</option>
                                    <option value="group">En Grupo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="participantes">Añadir participantes</label>
                                <input class="form-control" type="text" id="participantes">
                            </div>
                            <div class="form-group">
                                <label for="multa">Multa</label>
                                <select class="form-control" name="multa" id="multa">
                                    <option value="multaSi">Si</option>
                                    <option value="multaNo">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="valor">Valor</label>
                                <input class="form-control" type="number" id="valor">
                            </div>
                            <div class="form-group">
                                <label for="objetivo">Objetivo</label>
                                <input class="form-control" type="text" id="objetivo">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary">Crear</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
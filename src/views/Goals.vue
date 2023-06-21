<script setup>
import {createGoal, readGoals, updateGoal} from "../services/goals"
import {ref, onMounted, watch} from "vue"
import { useAuth } from "../composition/useAuth.js";
// watchers
const { user } = useAuth();
let idUser = ref('')
watch(user, async (newValue) => {
    if (newValue.id) {
        await getFilterGoals(newValue.id);
        idUser.value = newValue.id;
    }
});
let goalDatadinamic = ref(null);
watch(goalDatadinamic, (newValue) => {
      if(newValue){
        goalDatadinamic = newValue;
      }
    });

// Create Goal
let titleGoal = ref('');
const handleGoal = async function (newValue) {
    let data =  {
        user: idUser.value,
        titleGoal: titleGoal.value,
    }
    createGoal(data);
    console.log('saraza?', idUser.value, titleGoal.value);
    return data
}

// Read Goal
let goals = ref([]);
async function getFilterGoals (data) {

        // console.log('saraza?', data)
        // Llamada a la función readGoal para obtener los datos del objetivo
        let goalData = await readGoals(data);
        console.log(goalData)
        goals.value = goalData
}


// update goal
async function markGoalAsDone(data) {
      const goalId = data; // Reemplaza con el ID del goal que deseas actualizar
      await updateGoal(goalId, true);
      console.log('Goal marked as done');
      console.log(data)
}
async function markGoalAsNotDone(data) {
      const goalId = data; // Reemplaza con el ID del goal que deseas actualizar
      await updateGoal(goalId, false);
      console.log('Goal marked as not done');
    }
// const disabledGoals = ref(JSON.parse(localStorage.getItem('disabledGoals')) || []);

// async function markGoalAsDone(data) {
//   const goalId = data;
//   await updateGoal(goalId, true);

//   disabledGoals.value.push(goalId);
//   saveDisabledGoals(); // Guarda la lista de objetivos deshabilitados en el almacenamiento local

//   setTimeout(() => {
//     const index = disabledGoals.value.indexOf(goalId);
//     if (index !== -1) {
//       disabledGoals.value.splice(index, 1);
//       saveDisabledGoals(); // Actualiza la lista de objetivos deshabilitados en el almacenamiento local
//     }
//   }, 24 * 60 * 60 * 1000);

//   console.log('Goal marked as done');
//   console.log(data);
// }

// async function markGoalAsNotDone(data) {
//   const goalId = data;
//   await updateGoal(goalId, false);

//   disabledGoals.value.push(goalId);
//   saveDisabledGoals(); // Guarda la lista de objetivos deshabilitados en el almacenamiento local

//   setTimeout(() => {
//     const index = disabledGoals.value.indexOf(goalId);
//     if (index !== -1) {
//       disabledGoals.value.splice(index, 1);
//       saveDisabledGoals(); // Actualiza la lista de objetivos deshabilitados en el almacenamiento local
//     }
//   }, 24 * 60 * 60 * 1000);

//   console.log('Goal marked as not done');
//   console.log(data);
// }

// // Función para guardar la lista de objetivos deshabilitados en el almacenamiento local
// function saveDisabledGoals() {
//   localStorage.setItem('disabledGoals', JSON.stringify(disabledGoals.value));
// }


// ver racha
const selectedGoal = ref(null);

const HandlePopUp = function (goalId) {
    if (selectedGoal.value === goalId) {
        selectedGoal.value = null;
      } else {
        selectedGoal.value = goalId;
      }
}


</script>

<template>
    <section class="row justify-content-center mx-1">
        <h2 class="text-center text-white mt-4 col-11">Objetivos</h2>
        <article class="col-12 container-goals my-2 p-2" v-for="goal in goals" :key="goal.id">
            <div class="button-container-card">
                <button @click.prevent="HandlePopUp(goal.id)" class="round-button-card">
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
                        <template v-if="selectedGoal === goal.id">
                            <div class="col-12">
                                <h3 class="text-center text-white goal-title-card mt-2 mb-0">Racha de:</h3>
                                <p class="text-center text-white mb-0">{{ goal.streak }} dias consecutivos</p>

                            </div>
                        </template>
                        <template v-else>
                            <div class="col-12">
                                <h3 class="text-center text-white goal-title-card mt-2">{{ goal.titleGoal }}</h3>
                            </div>
                            <div class="col-12">
                                <div class="row justify-content-center align-items-center full-height">
                                    <button class="col-9 col-sm-4 btn-custom btn-done text-center text-decoration-none" @click="markGoalAsDone(goal.id)">Hecho</button>
                                    <button class="col-9 col-sm-4 btn-custom btn-primary text-center text-decoration-none" @click="markGoalAsNotDone(goal.id)">No Hecho</button>
                                </div>
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
                            <!-- <div class="form-group">
                                <label for="modalidad">Modalidad</label>
                                <select class="form-control" name="modalidad" id="modalidad">
                                    <option value="alone">Solo</option>
                                    <option value="group">En Grupo</option>
                                </select>
                            </div> -->
                            <div class="form-group">
                                <label for="titleGoal">Titulo de tu Goal</label>
                                <input class="form-control" type="text" id="titleGoal" v-model="titleGoal">
                            </div>
                            <!-- <div class="form-group">
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
                            </div> -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button @click.prevent="handleGoal" type="submit" class="btn btn-primary">Crear</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
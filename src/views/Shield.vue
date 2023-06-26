<script setup>
import {readGoals, updateGoal} from "../services/goals"
import {ref, onMounted, watch} from "vue"
import { useAuth } from "../composition/useAuth.js";
import AppNavButtons from "../components/AppNavButtons.vue";
import AppLoading from "../components/AppLoading.vue";

const { user } = useAuth();
let idUser = ref('')

watch(user, async (newValue) => {
    if (newValue.id) {
        await getFilterGoals(newValue.id);
        idUser.value = newValue.id;
    }
});

// Read Goal

let goals = ref([]);
let cargando = ref()
async function getFilterGoals (data) {
    try {
        cargando.value = true;
        let goalData = await readGoals(data);
        goals.value = goalData;
    } finally {
        cargando.value = false;
    }
}


// shield
let feedbackMessage = ref('')
async function handleShieldButtonClick(goalId) {
const selectedGoal = goals.value.find((goal) => goal.id === goalId);
    console.log('saraza');
  if (selectedGoal.streak >= 7) {
      await updateGoal(goalId, true, true);
      await getFilterGoals(idUser.value);
      feedbackMessage.value = '¡Ha utilizado el escudo con Exito!';
      setTimeout(() => {
        feedbackMessage.value = '';
        }, 3000);
  } else {
    feedbackMessage.value = 'La racha debe ser de 7 o más para utilizar el escudo.';
    setTimeout(() => {
        feedbackMessage.value = '';
    }, 3000);
  }
}
</script>
<template>
    <section class="row justify-content-center pb-5">
        <div class="feedback-container">
            <div v-if="feedbackMessage === '¡Ha utilizado el escudo con Exito!'" class="alert alert-success fixed-top" role="alert">
                {{ feedbackMessage }}
            </div>
        </div>
        <h2 class="text-center text-white mt-4 col-11">Escudos</h2>
        <p class="text-white text-center"><i>Podras usar un escudo una vez tengas una racha de 7 dias consecutivos*</i></p>
        <AppLoading :cargando="cargando">
            <div class="col-12 col-sm-6 col-lg-3 my-5 " v-for="goal in goals" :key="goal.id">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <article class="card-goal">
                            <div class="bg">
                                <h3 class="text-white text-center fs-5 title-shield">{{ goal.titleGoal }}</h3>
                                <button class="btn-custom btn-shield text-decoration-none" :class="{ disable: goal.streak < 7 }" @click="handleShieldButtonClick(goal.id)">Utilizar</button>
                            </div>
                            <div class="blob"></div>
                        </article>
                    </div>
                </div>
            </div>
        </AppLoading>
    </section>
    <AppNavButtons></AppNavButtons>
</template>
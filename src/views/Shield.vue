<script setup>
import {readGoals, updateGoal} from "../services/goals"
import {ref, onMounted, watch} from "vue"
import { useAuth } from "../composition/useAuth.js";
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
async function getFilterGoals (data) {
        // console.log('saraza?', data)
        // Llamada a la función readGoal para obtener los datos del objetivo
        let goalData = await readGoals(data);
        goals.value = goalData
}


// shield
// Función para manejar el clic en el botón de shield
async function handleShieldButtonClick(goalId) {
  // Obtener el objetivo seleccionado
  const selectedGoal = goals.value.find((goal) => goal.id === goalId);
    console.log('gola', selectedGoal.shieldStreak);
  // Verificar si se cumple la condición de 7 días consecutivos para habilitar el shield
  if (selectedGoal.shieldStreak >= 6) {
    console.log('gola2', selectedGoal);
    // Actualizar el objetivo en la base de datos para marcarlo como "hecho" y reiniciar la racha
    await updateGoal(goalId, true); // Llama a tu función updateGoal con los parámetros correspondientes
    await getFilterGoals(idUser.value); // Vuelve a cargar los objetivos después de actualizar el objetivo
  }
}
</script>
<template>
    <section class="row justify-content-center">
        <h2 class="text-center text-white mt-4 col-11">Escudos</h2>
        <div class="col-12 col-sm-6 col-lg-3 my-5 " v-for="goal in goals" :key="goal.id">
            <div class="row justify-content-center">
                <div class="col-12">
                    <article class="card-goal">
                        <div class="bg">
                            <h3 class="text-white text-center fs-5 title-shield">{{ goal.titleGoal }}</h3>
                            <button class="btn-custom btn-shield text-decoration-none" @click="handleShieldButtonClick(goal.id)">Utilizar</button>
                        </div>
                        <div class="blob"></div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>
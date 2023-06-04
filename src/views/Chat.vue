<script setup>
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
import AppLoading from "../components/AppLoading.vue";

import { fechaAString } from "../helpers/date.js";
import { sendMessage, subscribeToChatMessages } from "../services/chat.js"
import { useAuth } from "../composition/useAuth.js";
import { onMounted, onUnmounted, ref } from "vue";



const { messages, cargando } = useChat();
const { handleSubmit, dataCarga, form, user } = useChatForm();
function useChat() {
  const cargando = ref(true);
  const messages = ref([]);
  let unsubscribe = () => { }

  onMounted(() => {
    unsubscribe = subscribeToChatMessages(newMessages => {
      cargando.value = false;
      messages.value = newMessages;
    });
  });

  // onUnmounted(() => {
  //     unsubscribe();
  // });

  return {
    cargando,
    messages,
  }
}


function useChatForm() {
  const form = ref({
    message: '',
  });
  const dataCarga = ref(false);
  const { user } = useAuth();

  function handleSubmit() {
    dataCarga.value = true;
    sendMessage({
      userId: user.value.id,
      displayName: user.value.email,
      message: form.value.message,
    })
      .then(() => {
        dataCarga.value = false;
        form.value.message = '';
      });
  }

  return {
    dataCarga,
    form,
    user,
    handleSubmit,
  }
}
</script>

<template>
  <section class="row mt-3">
    <div class="col-3">
      <div class="row">
        <AppButton class="btn-primary my-3 col-12">Crear un Nuevo Chat</AppButton>
      </div>
      <div class="row">
        <div class="col-12 border rounded my-3" v-for="i in 3">
          <div class="row flex-row-reverse justify-content-center">
            <h3 class="fs-5 col-5 mt-2">Nombre</h3>
            <img class="profile-image-chat col-7 mt-2" src="../resources/imgs/logo-goaly.png" alt="saraza">
            <RouterLink to="#" class="btn btn-secondary">Abir Chat</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="col-9">
      <div class="row justify-content-center">
        <AppButton class="btn-primary col-4 my-3">Goals</AppButton>
      </div>
      <div class="col-12 bg-secondary">
        <div class="row justify-content-center">
          <AppLoading :cargando="cargando">
            <div id="chat">
              <ul class="scrollable-container list-group">
                <li class="list-group-item bg-secondary" v-for="message in messages">
                  <b>
                    {{ message.displayName }}:
                  </b>
                  {{ message.message }}<br>
                  <span class="date-chat">{{ fechaAString(message.date) }}</span>
                </li>
              </ul>
            </div>
          </AppLoading>
        </div>
      </div>
      <div class="col-12 my-4">
        <form action="#" method="post" id="usuario" @submit.prevent="handleSubmit" class="row">
          <div class="col-11">
            <AppInput class="form-control bg-secondary" id="message" name="mensaje" v-model="form.message" />
          </div>
          <AppButton class="custom-submit text-light col-1 fw-bold"></AppButton>
        </form>
        <div v-if="dataCarga">
          <p>enviando...</p>
        </div>
      </div>
    </div>
    <div id="output"></div>
  </section>
</template>
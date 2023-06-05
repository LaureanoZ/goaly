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
    <div class="col-12 container-main-settings">
      <div class="row justify-content-between align-items-center container-chat-settings p-2">
        <div class="col-10">
          <div class="row">
            <img class="col-5 mt-1" style="min-width: 50px;max-width: 50px;" src="../resources/imgs/logo-goaly.png" alt="sarazza">
            <p class="col-7 text-white mt-2">Los Marginados</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-three-dots-vertical text-white col-2" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </div>
    </div>
    <div class="col-12">
      <div class="row justify-content-center">
          <AppLoading :cargando="cargando">
            <div id="chat">
              <ul class="scrollable-container list-group">
                <li class="list-group-item bg-secondary" v-for="message in messages">
                  <b>{{ message.displayName }}:</b><br>{{ message.message }}<br>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle text-white" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                  <span class="">{{ fechaAString(message.date) }}</span>
                </li>
              </ul>
            </div>
          </AppLoading>
        </div>
    </div>
    <div class="col-12 my-2">
        <form action="#" method="post" id="usuario" @submit.prevent="handleSubmit" class="row justify-content-center">
          <div class="col-12">
            <div class="row justify-content-evenly px-2 container-custom-chat">
              <AppInput class="col-9 input-chat" id="message" name="mensaje" v-model="form.message" placeholder = "Escribe tu mensaje" />
              <AppButton class="col-2 text-light search__btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
              </AppButton>
            </div>
          </div>
        </form>
        <div v-if="dataCarga">
          <p>enviando...</p>
        </div>
      </div>
  </section>
</template>
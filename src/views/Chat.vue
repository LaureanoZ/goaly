<script setup>
import AppButton from "../components/AppButton.vue";
import AppTextarea from "../components/AppTextarea.vue";
import AppLabel from "../components/AppLabel.vue";
import AppLoading from "../components/AppLoading.vue";

import {fechaAString} from "../helpers/date.js";
import {sendMessage, subscribeToChatMessages} from "../services/chat.js"
import {useAuth} from "../composition/useAuth.js";
import {onMounted, onUnmounted, ref} from "vue";



const {messages, cargando} = useChat();
const {handleSubmit, dataCarga, form, user} = useChatForm();
function useChat() {
    const cargando = ref(true);
    const messages = ref([]);
    let unsubscribe = () => {}

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
    const {user} = useAuth();

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
  <section class="row mt-5">
    <h1 class="text-center">Chatea con nosotros</h1>
    <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
            <h2 class="my-5">Asistente Virtual</h2>
            <form
            action="#" 
            method="post"
            id="usuario"
            @submit.prevent="handleSubmit"
            >
              <div class="row mb-3">
                <div class="col">
                  <p class="mb-2">Email</p>
                  <p>{{ user.email }}</p>

                </div>
              </div>
              <div class="mb-3">
                <AppLabel for="mensaje">Mensaje</AppLabel>
                <AppTextarea
                  class="form-control"
                  id="message"
                  name="mensaje"
                  v-model="form.message"
                />
              </div>
              <AppButton class="custom-submit text-light col-12 fw-bold"></AppButton>
            </form>
            <div
            v-if="dataCarga"
            >
            <p>enviando...</p>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="row justify-content-center">
                <h3 class="col-12 mt-5">mensajes</h3>
                <AppLoading :cargando="cargando">
                <div id="chat">
                    <ul class="scrollable-container list-group">
                      <li class="list-group-item" v-for="message in messages">
                        <b>
                          ({{ fechaAString(message.date) }})
                              {{ message.displayName }}
                              dijo: </b>
                        {{ message.message }}
                      </li>
                    </ul>
                </div>
                </AppLoading>
            </div>
          </div>
        
    </div>

<div id="output"></div>
</section>
</template>
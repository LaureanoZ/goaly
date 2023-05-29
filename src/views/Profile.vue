<script setup>
import { useAuth } from "./../composition/useAuth.js";
import {sendMessage, subscribeToChatMessages} from "../services/chat.js"
import {onMounted, onUnmounted, ref} from "vue";
import {fechaAString} from "../helpers/date.js";
import AppLoading from "../components/AppLoading.vue";


const { user } = useAuth();
const {messages, cargando} = useChat();

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

    return {
        cargando,
        messages,
    }
}
</script>

<template>
    <section class="row justify-content-center mt-5">
        <h1 class="mb-4 text-4xl dm-font text-center">Perfil de {{ user.email }}</h1>
        <div class="col-12">
            <h2 class="mb-4 text-3xl text-center">¡Aqui estan mensajes con nosotros!</h2>
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
    </section>
</template>

<script setup>
defineProps({
    cargando: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <template v-if="!cargando">
        <slot />
    </template>
    <template v-else>
        <div class="custom-loader"></div>
    </template>
</template>

<style>
.custom-loader {
  width: 50px !important;
  height: 50px!important;

  --c: radial-gradient(farthest-side,#F41010 92%,#0000);
  background: 
    var(--c) 50%  0, 
    var(--c) 50%  100%, 
    var(--c) 100% 50%, 
    var(--c) 0    50%;
  background-size: 10px 10px;
  background-repeat: no-repeat;
  animation: s8 1s infinite;
  
}
.custom-loader::before {    
  content:"";
  
  inset:0;
  margin: 3px;
  background:repeating-conic-gradient(#0000 0 35deg,#F41010 0 90deg);
  -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
  border-radius: 50%;
}

@keyframes s8 { 
  100%{transform: rotate(.5turn)}
}
</style>
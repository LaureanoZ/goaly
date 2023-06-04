<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>


<template>
    <input
        class=""
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>
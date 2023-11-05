<script setup>
import {ref} from "vue";
let input = ref("")
const numbers = [];
function filteredList() {
    return numbers.filter((totpcode) =>
    totpcode.toLowerCase().includes(input.value)
    );
}
</script>

<template>
    <div class="flex items-center justify-center m-10">
        <input type="text" v-model="input" placeholder="Search..."/>
    </div>
    <div class="item totpcode" v-for="key in filteredList()" :key="totpcode">
        <p class="flex items-center justify-center">{{ key }}</p>
    </div>
     <div class="item error" v-if="input&&!filteredList().length">
        <p>No results found </p>
    </div>
 </template>
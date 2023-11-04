<template>
  <div
    class="bg-neutral w-10/12 max-w-[400px] h-fit p-2 rounded-2xl shadow-lg flex flex-col justify-around items-start"
  >
    <h1 class="text-3xl font-semibold text-indigo-300 my-1">{{ totpKey.accountName != "" ? totpKey.accountName : "Unnamed" }}</h1>
    <h2 class="text-4xl text-secondary-content font-semibold my-1">{{ totpCode }}</h2>
    <progress
      class="progress progress-primary w-56 my-2"
      value="50"
      max="100"
    ></progress>
  </div>
</template>

<script setup lang="ts">
import calculateTOTP from "~/totpFunctions/calculateTotp";
import type TOTPKey from "~/types/totp";

const totpCode = ref("")

let props = defineProps<{totpKey: TOTPKey}>();

onMounted(()=>{
    totpCode.value = calculateTOTP(props.totpKey.totpKey);
})
</script>

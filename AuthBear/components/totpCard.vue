<template>
  <div
    class="bg-neutral w-full max-w-[400px] h-fit p-2 rounded-2xl shadow-lg flex flex-col justify-around items-start"
  >
    <h1 class="text-3xl font-semibold text-primary  my-1">{{ totpKey.accountName != "" ? totpKey.accountName : "Unnamed" }}</h1>
    <h2 class="text-4xl text-secondary-content font-semibold my-1 ">{{ totpCode }}</h2>
    <progress
      class="progress progress-primary w-56 my-2"
      :value="iterations"
      max="1765"
    ></progress>
  </div>
</template>

<script setup lang="ts">
import calculateTOTP from "~/totpFunctions/calculateTotp";
import type TOTPKey from "~/types/totp";

const totpCode = ref("")
let iterations = ref(0);
let props = defineProps<{totpKey: TOTPKey}>();

function refresh() {
  totpCode.value = calculateTOTP(props.totpKey.totpKey);
}



onMounted(()=>{
    totpCode.value = calculateTOTP(props.totpKey.totpKey);

    setInterval(function(){
      iterations.value += 1;
      if(iterations.value == 1765){
        refresh()
        iterations.value = 0;
      }
  }, 17)

    
  
})
</script>

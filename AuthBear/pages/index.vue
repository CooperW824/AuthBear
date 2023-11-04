<template>
  <ClientOnly>
    <TotpEntry v-if="enterTOTP === true" />
  </ClientOnly>
  
  <button
    @click="
      () => {
        enterTOTP = true;
        console.log(enterTOTP.valueOf());
      }
    "
    class="absolute bottom-2 right-2 btn btn-primary rounded-full w-20 h-20 flex justify-center items-center"
  >
    <h1 class="text-5xl relative top-auto">+</h1>
  </button>
</template>

<script setup>
const enterTOTP = useTOTPEntry();
</script>

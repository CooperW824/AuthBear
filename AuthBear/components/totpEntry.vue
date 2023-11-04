<template>
  <div
    class="w-full h-full z-10 absolute flex items-center justify-center flex-col bg-base-100"
  >
    <button class="btn-primary" @click="enterTOTP = false">Exit</button>
    <label for="accountName">Account Name</label>
    <input id="accountName" type="text" class="input-primary" />
    <label for="keyEntry">TOTP Key</label>

    <input id="keyEntry" type="text" class="input-primary" />
    <button id="submitKey" class="btn-primary">Add Key</button>
  </div>
</template>

<script setup lang="ts">
import jsSHA from "jssha";
const enterTOTP = useTOTPEntry();
const machineID = useMachineID();



</script>

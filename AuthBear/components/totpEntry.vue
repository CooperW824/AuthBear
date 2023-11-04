<template>
  <div
    class="w-full h-full z-10 absolute flex items-center justify-center flex-col bg-base-100"
  >
    <button class="btn-primary btn" @click="enterTOTP = false">Exit</button>
    <label for="accountName">Account Name</label>
    <input
      id="accountName"
      type="text"
      class="input-primary bg-base-100 input"
      @input="(event) => {
        accountName = (<HTMLInputElement>event.target).value;
    }"
    />
    <label for="keyEntry">TOTP Key</label>

    <input
      id="keyEntry"
      type="text"
      class="input-primary bg-base-100 input"
      @input="(event) => {
        totpSecret = (<HTMLInputElement>event.target).value;
    }"
    />
    <button id="submitKey" class="btn-primary btn" @click="handleTOTPSubmit">Add Key</button>
  </div>
</template>

<script setup lang="ts">
import type TOTPKey from "~/types/totp";
import appendKey from "../totpFunctions/saveKeys";

const enterTOTP = useTOTPEntry();
const accountName = ref("");
const totpSecret = ref("");
const totpKeys = useTOTPKeys();

const handleTOTPSubmit = () => {
  const totpKey: TOTPKey = {
    totpKey: totpSecret.value,
    accountName: accountName.value,
    folderId: "",
  };
  const totpLocale = totpKeys.value;
  totpKeys.value = appendKey(totpKey, totpLocale);
};
</script>

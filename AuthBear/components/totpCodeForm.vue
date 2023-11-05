
<script setup lang="ts">
import type TOTPKey from "~/types/totp";
import appendKey from "../totpFunctions/saveKeys";

const emit = defineEmits(["addTOTP"])

let enterTOTP = useTOTPEntry();
const totpKeys = useTOTPKeys();

const account_name = ref("");
const totp_key = ref("");

function addTOTP() {
    const new_key: TOTPKey = {accountName: account_name.value, totpKey: totp_key.value, folderId: ""};
    const totpLocale = totpKeys.value;
    totpKeys.value = appendKey(new_key, totpLocale);
    enterTOTP.value = false;
}   
</script>

<template>
<div class="w-full h-full absolute z-10 bg-base-100">

    <div>
        <button @click="enterTOTP=false" class="m-6 h-16 w-16 btn btn-primary border-b-4 border-blue-500 hover:border-blue-500" type="button">
            <p class="text-4xl">
                X
            </p>
        </button>
    </div>
    <div class="display-flex">
        <div class=" flex flex-col items-center text-4xl">
            <label class="text-center" for="account_name_input">Account Name</label>
            <input id="account_name_input" type="text" v-model="account_name" class="form-control rounded-md align-text-bottom input input-primary" placeholder="Account Name">
            
            <label class="text-center" for="totp_key_input">TOTP Key</label>
            <input id="totp_key_input" type="text" v-model="totp_key" class="form-control rounded-md align-text-bottom input input-primary" placeholder="Enter Key">
            <button type="button" class="btn btn-primary" @click="addTOTP">Save</button>
        </div>
        
    </div>
</div>
    

</template>
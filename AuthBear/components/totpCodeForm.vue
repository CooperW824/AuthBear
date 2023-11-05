
<script setup lang="ts">
import type TOTPKey from "~/types/totp";
import appendKey from "../totpFunctions/saveKeys";

const emit = defineEmits(["addTOTP"])

const enterTOTP = useTOTPEntry();
const totpKeys = useTOTPKeys();
const folders = useFolders();

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
<div class="w-full h-full absolute z-10 bg-base-100 p-6">

<div>
    <button @click="enterTOTP=false" class="m-4 h-12 w-12 btn btn-primary border-b-4 border-blue-500 hover:border-blue-500" type="button">
        <p class="text-3xl">
            X
        </p>
    </button>
</div>

<div class="flex justify-center items-center">
    <div class="text-center">
        <label for="account_name_input" class="block text-lg mb-2">Account Name</label>
        <input id="account_name_input" type="text" v-model="account_name" class="form-control rounded-md py-2 px-4 mb-4 text-base text-black" placeholder="Enter Account Name">
        
        <label for="totp_key_input" class="block text-lg mb-2">TOTP Key</label>
        <input id="totp_key_input" type="text" v-model="totp_key" class="form-control rounded-md py-2 px-4 mb-4 text-base text-black" placeholder="Enter TOTP Key">

        <select id="folder_select" class="form-control rounded-md py-2 px-4 mb-4">
            <option selected value="">(Optional) Select Folder</option>
            <option v-for="folder in folders" :value="folder.folderID" :key="folder.folderID" class="text-black">{{ folder.folderName }}</option>
        </select>
        <button @click="enterTOTP=false" type="button" class="btn btn-secondary btn-outline py-3 px-6 mx-2">Cancel</button>
        <button @click="addTOTP" type="button" class="btn btn-primary py-3 px-6 mx-2">Save</button>
    </div>
</div>
</div>
    

</template>
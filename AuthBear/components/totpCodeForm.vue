
<script setup lang="ts">
import type TOTPKey from "~/types/totp";
import appendKey from "../totpFunctions/saveKeys";
import getKeys from "~/totpFunctions/getKeys";

const emit = defineEmits(["addTOTP"])

const enterTOTP = useTOTPEntry();
const totpKeys = useTOTPKeys();
const folders = useFolders();

const account_name = ref("");
const totp_key = ref("");
const folder_id = ref("");

async function addTOTP() {
    const new_key: TOTPKey = {accountName: account_name.value, totpKey: totp_key.value, folderId: folder_id.value};
    const totpLocale = totpKeys.value;
    await appendKey(new_key, totpLocale);
    totpKeys.value = await getKeys();
    enterTOTP.value = false;
}   
</script>

<template>

  <div class="absolute w-full h-full bg-black text-white bg-opacity-70 z-10 flex items-center justify-center">
    <div class="flex justify-center items-center">
            <div class="text-center">
                <div class="flex flex-row justify-around">
                    <!--<label for="account_name_input" class="block text-lg mb-2">Account Name</label>-->
                    <span>New TOTP Key</span>
                    <button @click="enterTOTP=false" type="button" class="btn btn-square btn-sm btn-secondary btn-outline border-transparent">X</button>
                </div>
                
                <input id="account_name_input" type="text" v-model="account_name" class="form-control input input-primary rounded-md py-2 px-4 mb-4 text-base" placeholder="Enter Account Name">
                
                <!--<label for="totp_key_input" class="block text-lg mb-2">TOTP Key</label>-->
                <input id="totp_key_input" type="text" v-model="totp_key" class="form-control input input-primary rounded-md py-2 px-4 mb-4 text-base" placeholder="Enter TOTP Key">

                <select v-model="folder_id" id="folder_select" class="form-control input input-primary rounded-md py-2 px-4 mb-4 w-full">
                    <option selected value="">(Optional) Folder</option>
                    <option v-for="folder in folders" :value="folder.folderID" :key="folder.folderID">{{ folder.folderName }}</option>
                </select>
                <button @click="enterTOTP=false" type="button" class="btn btn-secondary btn-outline py-3 px-6 mx-2">Cancel</button>
                <button @click="addTOTP" type="button" class="btn btn-primary py-3 px-6 mx-2">Save</button>
            </div>
        </div>
  </div>
    

</template>
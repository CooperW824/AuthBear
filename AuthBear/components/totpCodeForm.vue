
<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";

const emit = defineEmits(["addTOTP"])

let enterTOTP = useTOTPEntry();
const scan_on = ref(false);
const account_name = ref("");
const totp_key = ref("");

function startQRScan() {
    scan_on.value = true;
}

function addTOTP() {
    const new_key = {accountName: account_name.value, totpKey: totp_key.value, folderId: ""};
    emit("addTOTP", new_key);
    enterTOTP.value = false;
}

function onDecode(result) {
    const regex = /otpauth:\/\/.*\/([^:]+):([^@]+)@.*\?secret=([^&]+)&issuer=([^&]+)/;
    const match = result.match(regex);
    if (match) {
        totp_key.value = match[3];
        account_name.value = match[4] + "(" + match[1] + ")";
       
        scan_on.value = false;
        addTOTP();

    }
    else console.log("error")
}

</script>

<template>
    <div v-if="scan_on">
        <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
    </div>
    <div v-if="!scan_on" class="display-flex">
        <p class="my-5 text-center text-8xl">
            Scan the QR code!
        </p>
        <div class="flex items-center justify-center">
            <button class="p-2 h-60 w-60 btn btn-primary border-b-4 border-blue-500 hover:border-blue-500" type="button" @click="startQRScan">
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-qr-code" viewBox="0 0 16 16"> <path d="M2 2h2v2H2V2Z"/> <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z"/> <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z"/> <path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"/> <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z"/> </svg>
            
            </button>
        </div>
        <div class="p-3 text-center text-4xl">
            <b>OR</b> enter manually
        </div>
        <div class=" flex flex-col items-center text-4xl">
            <label class="text-center" for="account_name_input">Account Name</label>
            <input id="account_name_input" type="text" v-model="account_name" class="form-control rounded-md align-text-bottom" placeholder="Account Name">
            <label class="text-center" for="totp_key_input">TOTP Key</label>
            <input id="totp_key_input" type="text" v-model="totp_key" class="form-control rounded-md align-text-bottom" placeholder="Enter Key">
        </div>
    </div>
    
    

</template>
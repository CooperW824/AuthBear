
<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";


const emit = defineEmits(["addTOTP"])

let enterTOTP = useTOTPEntry();

const scan_on = ref(false);
const account_name = ref("");
const totp_key = ref("");

function startQRScan() { scan_on.value = true; }

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
        <button type="button" class="btn btn-primary" @click="scan_on = false">Cancel</button>
    </div>
</template>
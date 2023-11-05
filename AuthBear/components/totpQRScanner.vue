
<script setup lang="ts">
import { StreamBarcodeReader } from "vue-barcode-reader";
import type TOTPKey from "~/types/totp";
import appendKey from "../totpFunctions/saveKeys";

//const emit = defineEmits(["addTOTP"])
defineExpose({
    startQRScan
})

const totpKeys = useTOTPKeys();

const scan_on = ref(false);
const account_name = ref("");
const totp_key = ref("");

function startQRScan() { scan_on.value = true; }

function addTOTP() {
    const new_key: TOTPKey = {accountName: account_name.value, totpKey: totp_key.value, folderId: ""};
    const totpLocale = totpKeys.value;
    totpKeys.value = appendKey(new_key, totpLocale);
    console.log(totpKeys.value);

}

function onDecode(result : String) {
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
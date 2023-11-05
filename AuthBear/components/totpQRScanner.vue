<script setup lang="ts">
import { StreamBarcodeReader } from "vue-barcode-reader";
import type TOTPKey from "~/types/totp";
import appendKey from "../totpFunctions/saveKeys";
import getKeys from "~/totpFunctions/getKeys";

//const emit = defineEmits(["addTOTP"])
defineExpose({
  startQRScan,
});

const emit = defineEmits(["addTOTP"]);
const totpKeys = useTOTPKeys();
const qrScanner = useQRScanner();

const scan_on = ref(false);
const account_name = ref("");
const totp_key = ref("");

function startQRScan() {
  scan_on.value = true;
}

async function addTOTP() {
  const new_key: TOTPKey = {
    accountName: account_name.value,
    totpKey: totp_key.value,
    folderId: "",
  };
  const totpLocale = totpKeys.value;
  await appendKey(new_key, totpLocale);
  totpKeys.value = await getKeys();
  qrScanner.value = false;
}

function onDecode(result: String) {
  const regex =
    /otpauth:\/\/.*\/([^:]+):([^@]+)@.*\?secret=([^&]+)&issuer=([^&]+)/;
  const match = result.match(regex);
  if (match) {
    totp_key.value = match[3];
    account_name.value = match[4] + "(" + match[1] + ")";

    scan_on.value = false;
    addTOTP();
  } else console.log("error");
}
</script>

<template>
  <div
    class="absolute w-full h-full bg-base-100 flex flex-col z-20 items-center justify-center"
  >
    <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
    <button type="button" class="btn btn-primary" @click="qrScanner = false">
      Cancel
    </button>
  </div>
</template>

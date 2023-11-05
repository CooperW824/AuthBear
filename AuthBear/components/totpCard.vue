<template>
  <div
    class="bg-neutral w-full max-w-[400px] h-fit p-2 rounded-2xl shadow-lg flex flex-col justify-around items-start"
  >
    <div class="flex items-center justify-start w-full">
      
      <h1 class="text-3xl font-semibold text-neutral-content my-1">
        {{ totpKey.accountName != "" ? totpKey.accountName : "Unnamed" }}
      </h1>
      <div class="dropdown">
        <label tabindex="0" class="btn m-1 btn-primary">⋮</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><button>Move to Other Folder</button></li>
          <li><button @click="handleKeyDelete">Delete Code</button></li>
        </ul>
      </div>
    </div>

    <h2 class="text-4xl text-secondary-content font-semibold my-1">
      {{ totpCode }}
    </h2>
    <progress
      class="progress progress-primary w-56 my-2"
      :value="percentage"
      max="100"
    ></progress>
  </div>
</template>

<script setup lang="ts">
import calculateTOTP from "~/totpFunctions/calculateTotp";
import deleteKey from "~/totpFunctions/deleteKey"
import type TOTPKey from "~/types/totp";

const totpKeys = useTOTPKeys();
const totpCode = ref("");
let percentage = ref(0);
let props = defineProps<{ totpKey: TOTPKey }>();

function refresh() {
  totpCode.value = calculateTOTP(props.totpKey.totpKey);
}

function handleKeyDelete() {
  if(confirm(`Are you sure you want to delete this key?`)){
    totpKeys.value = deleteKey(totpKeys.value, props.totpKey);
  }
}

onMounted(() => {
  totpCode.value = calculateTOTP(props.totpKey.totpKey);

  setInterval(function () {
    const date = new Date();
    let milliseconds = date.getMilliseconds();
    const seconds = date.getSeconds();
    milliseconds += seconds * 1000;
    console.log(milliseconds);
    percentage.value = ((milliseconds % (30 * 1000)) / (30 * 1000)) * 100;
    //
    if (seconds % 30 == 0) {
      refresh();
    }
  }, 100);
});
</script>

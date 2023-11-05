<template>
  <div
    class="bg-neutral w-full max-w-[400px] h-fit p-2 rounded-2xl shadow-lg flex flex-col justify-around items-start"
  >
    <h1 class="text-3xl font-semibold text-primary my-1">
      {{ totpKey.accountName != "" ? totpKey.accountName : "Unnamed" }}
    </h1>
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
import type TOTPKey from "~/types/totp";

const totpCode = ref("");
let percentage = ref(0);
let props = defineProps<{ totpKey: TOTPKey }>();

function refresh() {
  totpCode.value = calculateTOTP(props.totpKey.totpKey);
}

onMounted(() => {
  totpCode.value = calculateTOTP(props.totpKey.totpKey);

  setInterval(function () {
    const date = new Date();
    const seconds = date.getSeconds();
    percentage.value = ((seconds % 30) / 30) * 100;

    if (seconds % 30 == 0) {
      refresh();
    }
  }, 100);
});
</script>

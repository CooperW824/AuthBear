<template>
  <div
    class="absolute w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center"
  
  >
    <div
      class="bg-base-100 flex flex-col items-center justify-around w-1/4 h-1/4 rounded-lg"
    >
      <div class="flex w-11/12 justify-around items-center">
        <h3>Move To folder:</h3>
        <button class="btn btn-error">X</button>
      </div>
      <input class="input input-primary" type="text" />
      
    </div>
  </div>
</template>

<script setup lang="ts">
import type TOTPKey from "~/types/totp";

const folders = useFolders();
let props = defineProps<{ totpKey: TOTPKey }>();

function handleMoveFolder() {}
</script>

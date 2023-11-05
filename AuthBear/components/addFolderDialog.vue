<template>
  <div class="absolute w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center" @click="folderCreateModal = false">
    <div class="bg-base-100 flex flex-col items-center justify-around w-1/4 h-1/4 rounded-lg" >
      <div class="flex w-11/12 justify-around items-center">

          <h3 >New Folder Name: </h3>
          <button class="btn btn-error" @click="folderCreateModal =false;"> X </button>
      </div>
      <input class="input input-primary" type="text">
      <button class="btn btn-primary"> Create Folder</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFolderCreate } from '~/composables/states';
const folderCreateModal = useFolderCreate();
</script>

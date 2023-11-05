<template>
  <div class="absolute w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center">
    <div class="bg-base-100 flex flex-col items-center justify-around w-1/4 h-1/4 rounded-lg" >
      <div class="flex w-11/12 justify-around items-center">

          <h3 >New Folder Name: </h3>
          <button @click="folderCreateModal =false;" class="btn btn-error" type="button"> X </button>
      </div>
      <input v-model="newFolder" @input="validate" class="input input-primary" type="text">
        <button @click="createFolder" type="button" class="btn btn-primary mx-2"> Create Folder</button>
      
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFolderCreate } from '~/composables/states';
import addFolder from '~/totpFunctions/addFolder';

const folderCreateModal = useFolderCreate();
const folders = useFolders();

const newFolder = ref("");
const errorMsg = ref("")

function createFolder() {
  
  let ret = addFolder(folders.value, newFolder.value);
  folders.value = ret.folders;
  if (ret.success) folderCreateModal.value = false;
  else errorMsg.value = "Duplicate folder name";
}

function validate() {
  errorMsg.value = "";
}

</script>

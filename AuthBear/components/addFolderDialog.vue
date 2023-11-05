<template>
  <div class="absolute w-full h-full bg-black bg-opacity-70 z-10 flex flex-col items-center justify-center">
    
      <div class="flex flex-row justify-around my-2">
          <span>New Folder</span>
          <button @click="folderCreateModal=false" type="button" class="btn btn-square btn-sm btn-secondary btn-outline border-transparent ml-10">X</button>
      </div>
      <input v-model="newFolder" @input="validate" class="input input-primary my-2" type="text" placeholder="Folder name">
      <div class="flex flex-row">
        <button @click="folderCreateModal=false" type="button" class="btn btn-secondary btn-outline py-3 px-6 mx-2">Cancel</button>
        <button @click="createFolder" type="button" class="btn btn-primary mx-2"> Save</button>
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

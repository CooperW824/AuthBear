<script setup lang="ts">
// import draggable from 'vuedraggable'
import deleteFolder from "~/totpFunctions/deleteFolder";
import type Folder from "~/types/folder";
import type TOTPKey from "~/types/totp";
const props = defineProps<{ folder: Folder; totpKeys: TOTPKey[] }>();

const folders = useFolders();

function handleDelete() {
  if (confirm("Are you sure you want to delete " + props.folder.folderName + " and all its contents?")) {
    folders.value = deleteFolder(folders.value, props.folder)
  }
}

</script>

<template>
  <div
    class="collapse collapse-arrow w-10/12 max-w-[400px] bg-neutral bg-opacity-50"
  >
    <input type="checkbox" />
    
    <div class="collapse-title">
      <div class="flex flex-row">
        <button @click.stop="handleDelete" class="btn btn-outline border-transparent block text-indigo-300" style="z-index: 2;">⋮</button>
        <h1 class="text-3xl font-semibold text-indigo-300 my-1">
          {{ folder.folderName !== "" ? folder.folderName : "Unnamed" }}
        </h1>
      </div>
      
    </div>
    <div class="collapse-content">
      <div class="max-h-[300px] overflow-y-auto overflow-x-hidden">
        <TotpCard
          v-for="(totpKey, index) in totpKeys"
          :totp-key="totpKey"
          :key="index"
          class="my-2"
        />
      </div>
    </div>
  </div>
</template>

<!-- <draggable
            :list="folder" 
            group="index" 
            @end="onMoved" 
            item-key="accountName">
            <template #item="{element}">
                <TotpCard :accountName="element.accountName" :code="element.code"></TotpCard>
            </template>
        </draggable> -->

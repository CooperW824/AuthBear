<template>
  <ClientOnly>
    <SearchWidget></SearchWidget>
    <TotpCodeForm v-if="enterTOTP === true" />
    <AddFolderDialog v-if="folderCreateModal === true"></AddFolderDialog>
    <TotpQRScanner v-if="qrScanner === true"/>
  </ClientOnly>

  <div class="w-full h-full absolute flex items-start justify-center" @click="displayOptions = false">
    <FolderDisplay
      v-for="(folder, index) in folders"
      :key="index"
      :folder="folder"
      :totpKeys="
        totpKeys.filter((totpKey) => {
          totpKey.folderId === folder.folderID;
        })
      "
      class="my-2"
    />
  </div>

  <button
    v-if="displayOptions == false && enterTOTP == false"
    @click="
      () => {
        displayOptions = true;
      }
    "
    class="absolute bottom-2 right-2 btn btn-primary rounded-full w-20 h-20 flex justify-center items-center"
  >
    <h1 class="text-5xl relative top-auto">+</h1>
  </button>
  <div
    class="flex flex-col absolute bottom-2 right-2 z-10"
    v-if="displayOptions == true && enterTOTP == false"
  >
    <button
      @click="
        () => {
          folderCreateModal = true;
          displayOptions = false;
        }
      "
      class="btn btn-primary rounded-full w-20 h-20 flex justify-center items-center"
    >
      <img
        class="w-10"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNElEQVR4nO2Wv0oDQRCHv9IQxBTqA9jYCOlN7gFCOoltqryIxpeKVSCkNAlWadIYH0BP61sZmJNz2Qv3Z89LID8YOG5372N+MzscHFWD+sA7YBzxCrSrAm9ToHFsgJMqwKbi2AK9OsAGeKsLbKoo1eFp/g82z/aqxuYIJr8LE2AEXANNoAFcAUNdi3xbvQaCDA3c8QmeAi39xiXwBCyBb40FMNY1p4pmGkPvgXDH3hAY+AIHCWiUYX/kgueFPifsdWV6C3Qd7z+BizJg6V60prsGhWvtsQxYroxoVQC8KAM+1XOhZW+aulajZf71sePMAXbeU1Vg1flXvZzwGz23LGt1UY0LgB/woLTr1LHsNRofwDmeNMgxQO58QZNwaZo0qGTqHRpLJpIMhxfgS0OepaZ/7P0Bw2bZKRVGhY8AAAAASUVORK5CYII="
      />
    </button>
    <button
      class="btn btn-primary rounded-full w-20 h-20 flex justify-center items-center"
      @click="
        () => {
          enterTOTP = true;
          displayOptions = false;
        }
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="2.5em"
        viewBox="0 0 512 512"
      >
        <path
          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
        />
      </svg>
    </button>
    <button
      class="btn btn-primary rounded-full w-20 h-20 flex justify-center items-center"
      @click="
        () => {
          qrScanner = true;
          displayOptions = false;
        }
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2.5em"
        height="2.5em"
        fill="#000000"
        class="bi bi-qr-code w-10"
        viewBox="0 0 16 16"
      >
        <path d="M2 2h2v2H2V2Z" />
        <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z" />
        <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z" />
        <path
          d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"
        />
        <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import getKeys from "~/totpFunctions/getKeys";
import getFolders from "~/totpFunctions/getFolders";
import { useFolderCreate } from "~/composables/states";

const qrScanner = useQRScanner();
const folders = useFolders();
const folderCreateModal = useFolderCreate();
const displayOptions = ref(false);
const enterTOTP = useTOTPEntry();
const totpKeys = useTOTPKeys();

onMounted(async () => {
  totpKeys.value = await getKeys();
  folders.value = getFolders();
});
</script>

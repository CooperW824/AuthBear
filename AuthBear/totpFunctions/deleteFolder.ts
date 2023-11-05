import type Folder from "~/types/folder";
import deleteKey from "./deleteKey";

export default function deleteFolder(folders: Folder[], folder: Folder) {
    /*
    removes the specified folder from the list of folders and saves the new folder
    list to local storage. 
    Note: this also deletes any key that was in the folder.
    */
    const totpKeys = useTOTPKeys();
    let keysToDelete = [];
    for (const key of totpKeys.value) {
        if (key.folderId == folder.folderID) keysToDelete.push(key);
    }

    for (let i = 0; i < keysToDelete.length; i++) {
        totpKeys.value = deleteKey(totpKeys.value, keysToDelete[i]);
    }

    const updatedFolders = folders.filter((f) => {return f != folder;});
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    return updatedFolders;
}
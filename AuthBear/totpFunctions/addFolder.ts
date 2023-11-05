import type Folder from "~/types/folder";
import { v4 as uuidv4 } from "uuid";

export default function addFolder(folders: Folder[], folderName: string) {
  const index = folders.findIndex((folder) => {
    folder.folderName === folderName;
  });
  if (index != -1) {
    return {success: false, folders: folders};
  }
  
  folders = folders.concat({ folderID: uuidv4(), folderName });
  localStorage.setItem("folders", JSON.stringify(folders));

  return {success: true, folders: folders};
}

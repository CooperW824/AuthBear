import type Folder from "~/types/folder";

export default function getFolders(){
    const foldersString = localStorage.getItem("folders");
    if(foldersString){
        const folders = JSON.parse(foldersString) as Folder[];
        if(folders.length > 0){
            return folders;
        }
    }
    const folderArray = [{folderName: "General", folderID: ""}] as Folder[];
    localStorage.setItem("folders", JSON.stringify(folderArray));
    return folderArray;
}
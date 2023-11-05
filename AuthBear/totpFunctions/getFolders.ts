import type Folder from "~/types/folder";

export default function getFolders(){
    const foldersString = localStorage.getItem("folders");
    if(foldersString){
        return JSON.parse(foldersString) as Folder[];
    }
    const folderArray = [{folderName: "General", folderID: ""}] as Folder[];
    localStorage.setItem("folders", JSON.stringify(folderArray));
    return folderArray;
}
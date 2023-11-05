import getFolders from "~/totpFunctions/getFolders";
import getKeys from "~/totpFunctions/getKeys";
import getMachineId from "~/totpFunctions/machineID";
import type Folder from "~/types/folder";
import type TOTPKey from "~/types/totp";

export const useTOTPEntry = () => useState<boolean>("totpEntry", () => false);
export const useQRScanner = () => useState<boolean>("qrScanner", () => false);
export const useFolderCreate = () => useState<boolean>("FolderCreate", () => false);
export const useFolders = () => useState<Folder[]>("folders", () => []);
export const useFolderToDelete = () => useState<Folder | null>("folderToDelete", () => null);
export const useTOTPKeys = () =>
  useState<TOTPKey[]>("totpKeys", () => {
    return [];
  });
export const useMachineID = () =>
  useState<string>("machineID", () => {
    return getMachineId();
  });

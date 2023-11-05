import getKeys from "~/totpFunctions/getKeys";
import getMachineId from "~/totpFunctions/machineID";
import type TOTPKey from "~/types/totp";

export const useTOTPEntry = () => useState<boolean>("totpEntry", () => false);
export const useFolderCreate = () => useState<boolean>("FolderCreate", () => false);

export const useTOTPKeys = () =>
  useState<TOTPKey[]>("totpKeys", () => {
    return [];
  });
export const useMachineID = () =>
  useState<string>("machineID", () => {
    return getMachineId();
  });

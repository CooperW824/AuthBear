import getKeys from "~/totpFunctions/getKeys";
import getMachineId from "~/totpFunctions/machineID";
import type TOTPKey from "~/types/totp";

export const useTOTPEntry = () => useState<boolean>("totpEntry", async () => false);
export const useTOTPKeys = () =>
  useState<TOTPKey[]>("totpKeys", async () => {
    return await getKeys();
  });
export const useMachineID = () =>
  useState<string>("machineID", () => {
    return getMachineId();
  });

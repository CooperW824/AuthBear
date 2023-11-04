import getKeys from "~/totpFunctions/getKeys";
import getMachineId from "~/totpFunctions/machineID";
import type TOTPKey from "~/types/totp";

export const useTOTPEntry = () => useState<boolean>("totpEntry", () => false);
export const useTOTPCodes = () =>
  useState<TOTPKey[]>("totpCodes", () => {
    return getKeys();
  });
export const useMachineID = () =>
  useState<string>("machineID", () => {
    return getMachineId();
  });

import type TOTPKey from "~/types/totp";
import { saveKeys } from "./saveKeys";

export default function deleteKey(totpKeys: TOTPKey[], key: TOTPKey){
    const updatedKeys = totpKeys.filter((totpKey) => {return totpKey !== key});
    saveKeys(updatedKeys);
    return updatedKeys;
}
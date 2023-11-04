import type TOTPKey from "~/types/totp";
import Crypto from "crypto";
import jsSHA from "jssha";
import getMachineId from "./machineID";

export default function appendKey(key: TOTPKey, keys: TOTPKey[]){
    const updatedKeys = keys.concat(key);
    saveKeys(updatedKeys);
    return updatedKeys;
}

function saveKeys(keys: TOTPKey[]) {
  for (let i = 0; i < keys.length; i++) {
    const unencryptedKey = keys[i].totpKey;
    const encrypted = encryptKey(generateHashKey(), unencryptedKey);
    keys[i].totpKey = encrypted;
  }
  const encryptedKeyString = JSON.stringify(keys);
  localStorage.setItem("encryptedKeys", encryptedKeyString);
}

const generateHashKey = () => {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  return shaObj.update(getMachineId()).getHash("HEX");
};

function encryptKey(encryptionHash: string, keyToEncrypt: string) {
  const key = Crypto.scryptSync(encryptionHash, "HackRPI", 24);
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.alloc(16, 0); // Initialization vector.

  const cipher = Crypto.createCipheriv("aes-256-ccm", key, iv);
  let encrypted = cipher.update(keyToEncrypt, "hex", "utf8");
  encrypted += cipher.final("utf8");
  return encrypted;
}

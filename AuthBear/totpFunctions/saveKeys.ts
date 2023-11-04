import type TOTPKey from "~/types/totp";
import jsSHA from "jssha";
import getMachineId from "./machineID";

export default function appendKey(key: TOTPKey, keys: TOTPKey[]) {
  const updatedKeys = keys.concat(key);
  saveKeys(updatedKeys);
  return updatedKeys;
}

async function deriveAesKeyFromPassphrase(passphrase: string, salt: string) {
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(passphrase);
  const importedSalt = encoder.encode(salt);

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    passwordData,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: importedSalt,
      iterations: 10000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

async function encryptTotpKeyWithPassphrase(TOTPKey: string) {
  const aesKey = await deriveAesKeyFromPassphrase(generateHashKey(), "HackRPI");

  const encoder = new TextEncoder();
  const data = encoder.encode(TOTPKey);

  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    data
  );

  // Combine the IV and the encrypted data
  const encryptedArray = new Uint8Array(encryptedData);
  const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
  combinedArray.set(iv, 0);
  combinedArray.set(encryptedArray, iv.length);

  // Convert the combined data to a Base64 string
  const base64String = btoa(String.fromCharCode(...combinedArray));
  return base64String;
}

async function saveKeys(keys: TOTPKey[]) {
  for (let i = 0; i < keys.length; i++) {
    const unencryptedKey = keys[i].totpKey;
    const encrypted = await encryptTotpKeyWithPassphrase(unencryptedKey);
    keys[i].totpKey = encrypted;
  }

  const encryptedKeyString = JSON.stringify(keys);
  localStorage.setItem("encryptedKeys", encryptedKeyString);
}

const generateHashKey = () => {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  return shaObj.update(getMachineId()).getHash("HEX");
};

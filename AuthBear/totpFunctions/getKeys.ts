import type TOTPKey from "~/types/totp";
import jsSHA from "jssha";
import getMachineId from "./machineID";

export default async function getKeys() {
  const encryptedKeyString = localStorage.getItem("encryptedKeys");
  if (!encryptedKeyString) {
    console.log("No KeyStore Found");
    return [];
  }
  const encryptedKeys: TOTPKey[] = JSON.parse(encryptedKeyString);
  console.log("Encrypted Data");
  console.log(encryptedKeys);
  for (let i = 0; i < encryptedKeys.length; i++) {
    let encryptedKey = encryptedKeys[i];
    let decryptedKey = await decryptKey(encryptedKey.totpKey);
    encryptedKeys[i].totpKey = decryptedKey;
  }
  console.log("Decrypted Data");
  console.log(encryptedKeys);
  return encryptedKeys;
}

const generateHashKey = () => {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  return shaObj.update(getMachineId()).getHash("HEX");
};

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

async function decryptKey(encryptedString: string) {
  const aesKey = await deriveAesKeyFromPassphrase(generateHashKey(), "HackRPI");

  // Convert the Base64-encoded string back to a Uint8Array
  const combinedArray = new Uint8Array(
    atob(encryptedString)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  // Extract the IV and the encrypted data
  const iv = combinedArray.slice(0, 12);
  const encryptedData = combinedArray.slice(12);

  // Decrypt the data
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encryptedData
  );

  // Convert the decrypted data to a string
  const decoder = new TextDecoder();
  const decryptedString = decoder.decode(decryptedData);

  return decryptedString;
}

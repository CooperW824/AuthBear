import type TOTPKey from "~/types/totp";
import Crypto from "crypto";
import jsSHA from "jssha";
import getMachineId from "./machineID";

export default function getKeys() {
  const encryptedKeyString = localStorage.getItem("encryptedKeys");
  if (!encryptedKeyString) {
    return [];
  }
  const encryptedKeys: TOTPKey[] = JSON.parse(encryptedKeyString);
  for (let i = 0; i < encryptedKeys.length; i++) {
    let encryptedKey = encryptedKeys[i];
    let decryptedKey = decryptKey(generateHashKey(), encryptedKey.totpKey);
    encryptedKeys[i].totpKey = decryptedKey;
  }
  return encryptedKeys;
}

const generateHashKey = () => {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  return shaObj.update(getMachineId()).getHash("HEX");
};

function decryptKey(encryptionHash: string, keyToDecrypt: string) {
  const key = Crypto.scryptSync(encryptionHash, "HackRPI", 24);
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.alloc(16, 0); // Initialization vector.

  const decipher = Crypto.createDecipheriv("aes-256-ccm", key, iv);
  let decrypted = decipher.update(keyToDecrypt, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

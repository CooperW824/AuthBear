import type TOTPKey from "~/types/totp";
import totpGenerator from "totp-generator";

export default function calculateTOTP(key: TOTPKey) {
  totpGenerator(key.totpKey, {
    algorithm: "SHA-1",
    digits: 6,
    period: 30,
    timestamp: Date.now(),
  });
}

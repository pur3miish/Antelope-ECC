import base58_to_binary from "base58-js/base58_to_binary.js";

import validate_private_key from "./validate_private_key.js";

/**
 * Converts an Antelope PVT_K1_ private key into its
 * corresponding 32-byte secp256k1 private key.
 */
export default function private_key_from_wif(private_key: string): Uint8Array {
  if (!private_key.startsWith("PVT_K1_")) {
    throw new Error("Antelope private key must start with PVT_K1_.");
  }

  validate_private_key(private_key);

  return base58_to_binary(private_key.slice("PVT_K1_".length)).slice(0, -4);
}

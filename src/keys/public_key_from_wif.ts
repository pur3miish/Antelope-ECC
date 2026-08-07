import base58_to_binary from "base58-js/base58_to_binary.js";

import validate_public_key from "./validate_public_key.js";

/**
 * Converts an Antelope PUB_K1_ public key into its
 * compressed 33-byte SEC 1 representation.
 */
export default function public_key_from_wif(
  wif_public_key: string,
): Uint8Array {
  if (!wif_public_key.startsWith("PUB_K1_")) {
    throw new Error("Expected public key to start with PUB_K1_.");
  }

  validate_public_key(wif_public_key);

  return base58_to_binary(wif_public_key.slice("PUB_K1_".length)).slice(0, -4);
}

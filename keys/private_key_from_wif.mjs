import base58_to_binary from "base58-js/base58_to_binary.mjs";

/**
 * Converts an Antelope WIF private key (PVT_K1) into its corresponding 32 byte binary representation.
 * @param {String} private_key Antelope WIF private key.
 * @returns {Uint8Array} 32 byte array representing a secp256k1 key.
 */
export default function private_key_from_wif(private_key) {
  if (!private_key.startsWith("PVT_K1_"))
    throw new Error("Antelope private key must start with “PVT_K1_”");
  return base58_to_binary(private_key.replace("PVT_K1_", "")).slice(0, -4);
}

import base58_to_binary from "base58-js/base58_to_binary.mjs";

/**
 * Converts a legacy wif public key to compressed public key.
 * @param {String} wif_public_key
 * @returns {Uint8Array} Compressed secp256k1 public key.
 */
export default function legacy_to_public_key(wif_public_key) {
  return base58_to_binary(wif_public_key.replace(/^[A-Z]+/gmu, "")).slice(
    0,
    -4
  );
}

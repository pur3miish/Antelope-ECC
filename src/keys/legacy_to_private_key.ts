import base58_to_binary from "base58-js/base58_to_binary";

/**
 * Converts a legacy WIF private key to private key.
 * @param {String} wif_private_key Legacy WIF private key.
 * @returns {Uint8Array} Compressed secp256k1 private key.
 */
export default function legacy_to_private_key(
  wif_private_key: string
): Uint8Array {
  return base58_to_binary(wif_private_key).slice(1, 33);
}

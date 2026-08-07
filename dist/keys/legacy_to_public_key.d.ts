/**
 * Converts a legacy wif public key to compressed public key.
 * @param {String} wif_public_key
 * @returns {Uint8Array} Compressed secp256k1 public key.
 */
export default function legacy_to_public_key(wif_public_key: string): Uint8Array;

/**
 * Converts an Antelope based public key into its binary representation.
 * @param {String} wif_public_key Antelope based public key
 * @returns {Uint8Array} Compressed Binary representation of the secp256k1 WIF public key.
 */
export default function public_key_from_wif(wif_public_key: string): Uint8Array;

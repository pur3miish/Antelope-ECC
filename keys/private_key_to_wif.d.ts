/**
 * Converts a private key 32 byte binary array into an Antelope based WIF private key.
 * @param {Uint8Array} private_key Binary private key.
 * @returns {String} Antelope based WIF private key.
 */
export default function private_key_to_wif(private_key: Uint8Array): Promise<string>;

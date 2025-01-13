/**
 * Converts a binary representation of a compressed secp256k1 public key to Antelope based WIF public key (PUB_K1).
 * @param Binary representation of the secp256k1 WIF public key.
 */
export default function public_key_to_wif(public_key: Uint8Array): Promise<string>;

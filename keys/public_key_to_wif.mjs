import binary_to_base58 from "base58-js/binary_to_base58.mjs";
import ripemd160 from "ripemd160-js/ripemd160.mjs";

/**
 * Converts a binary representation of a compressed secp256k1 public key to Antelope based WIF public key (PUB_K1).
 * @param {Uint8Array} Binary representation of the secp256k1 WIF public key.
 * @returns {String} Antelope based public key as wallet import format (WIF).
 */
export default async function public_key_to_wif(public_key) {
  const hash = await ripemd160(Uint8Array.from([...public_key, 75, 49]));
  const checksum = hash.slice(0, 4);
  return (
    "PUB_K1_" + binary_to_base58(new Uint8Array([...public_key, ...checksum]))
  );
}

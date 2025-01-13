import binary_to_base58 from "base58-js/binary_to_base58";
import ripemd160 from "ripemd160-js";
/**
 * Converts a binary representation of the secp256k1 compressed public key to legacy key for an antelope based blockchain.
 * @param {Uin8Array} public_key compressed secp256k1 public key.
 * @param {String} prefix the prefix to add to the start of the public public key.
 * @returns {String} WIF of legacy public key such as EOS, TELOS, WAX.
 */
export default async function legacy_from_public_key(public_key, prefix) {
  if (!prefix)
    throw new Error(
      "Please include a prefix for the WIF public key, e.g EOS, TELOS."
    );
  const checksum = (await ripemd160(public_key)).slice(0, 4);
  return (
    prefix + binary_to_base58(Uint8Array.from([...public_key, ...checksum]))
  );
}

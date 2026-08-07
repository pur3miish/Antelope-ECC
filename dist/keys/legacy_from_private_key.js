import binary_to_base58 from "base58-js/binary_to_base58";
import sha256 from "isomorphic-secp256k1-js/sha256.js";
/**
 * Converts a private key into a legacy antelope/EOS key.
 * @param {Uint8Array} private_key Compressed private key
 * @returns {String} WIF private key.
 */
export default async function legacy_from_private_key(private_key) {
  private_key = new Uint8Array([128, ...private_key]);
  const checksum = await sha256(await sha256(private_key));
  const array = [...private_key, ...checksum.slice(0, 4)];
  return binary_to_base58(new Uint8Array(array));
}

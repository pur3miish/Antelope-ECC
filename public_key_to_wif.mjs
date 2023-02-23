import binary_to_base58 from "base58-js/binary_to_base58.mjs";
import ripemd160 from "ripemd160-js/ripemd160.mjs";

/**
 * Converts a public key to an EOS wallet import format (WIF) public key.
 * @kind function
 * @name public_key_to_wif
 * @param {Uint8Array} raw_public_key Compressed public key.
 * @param {Boolean} [legacy] Return public key in legacy format.
 * @returns {Promise<String>} WIF public key.
 * @ignore
 */
export default async function public_key_to_wif(raw_public_key, legacy = true) {
  const hash = legacy
    ? await ripemd160(raw_public_key)
    : await ripemd160(Uint8Array.from([...raw_public_key, 75, 49]));

  const checksum = hash.slice(0, 4);
  return (
    (legacy ? "EOS" : "PUB_K1_") +
    binary_to_base58(new Uint8Array([...raw_public_key, ...checksum]))
  );
}

import base58_to_binary from "base58-js/base58_to_binary.mjs";
import binary_to_base58 from "base58-js/binary_to_base58.mjs";
import ripemd160 from "ripemd160-js/ripemd160.mjs";

/**
 * Converts an EOSIO/Antelope legacy key to PUB_K1 format.
 * @param {String} legacy legacy public key
 * @returns {Promise<String>} public key PUB_K1 format
 * @example <caption>Usage `legacy_to_public_key`.</caption>
 * ```js
 * import legacy_to_public_key from 'eosio-ecc/legacy_to_public_key.mjs'
 * legacy_to_public_key("EOS53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDChput7").then(console.log)
 * ```
 * The logged output was PUB_K1_53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDCqCCVR.
 */
export default async function legacy_to_public_key(legacy) {
  const public_key = base58_to_binary(legacy.replace("EOS", "")).slice(0, -4);
  const checksum = await ripemd160(Uint8Array.from([...public_key, 75, 49]));

  return (
    "PUB_K1_" +
    binary_to_base58(Uint8Array.from([...public_key, ...checksum.slice(0, 4)]))
  );
}

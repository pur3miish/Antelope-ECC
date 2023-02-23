import binary_to_base58 from "base58-js/binary_to_base58.mjs";
import ripemd160 from "ripemd160-js/ripemd160.mjs";
import sha256 from "universal-sha256-js/sha256.mjs";

/**
 * Converts a private key to an EOS wallet import format (WIF) private key.
 * @kind function
 * @name private_key_to_wif
 * @param {Uint8Array} private_key Compressed public key.
 * @param {Boolean} legacy Will return legacy keys if true.
 * @returns {Promise<String>} WIF private key.
 * @ignore
 */
export default async function private_key_to_wif(private_key, legacy = true) {
  if (!legacy) {
    const checksum = await ripemd160(Uint8Array.from([...private_key, 75, 49]));
    return (
      "PVT_K1_" +
      binary_to_base58(
        Uint8Array.from([...private_key, ...checksum.slice(0, 4)])
      )
    );
  } else {
    private_key = new Uint8Array([128, ...private_key]);
    const checksum = await sha256(await sha256(private_key));
    const array = [...private_key, ...checksum.slice(0, 4)];
    return binary_to_base58(new Uint8Array(array));
  }
}

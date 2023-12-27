import base58_to_binary from "base58-js/base58_to_binary.mjs";
import get_public_key from "isomorphic-secp256k1-js/get_public_key.mjs";

import public_key_to_wif from "./public_key_to_wif.mjs";

/**
 * Convert an Antelope private key to a public key.
 * @kind function
 * @name public_key_from_private
 * @param {String} wif_private_key Wallet import format key.
 * @returns {Promise<String>} Wallet import format public key.
 * @example <caption>Usage `public_key_from_private`.</caption>
 * ```js
 * import public_key_from_private from 'antelope-ecc/public_key_from_private.mjs'
 *
 * public_key_from_private(
 *   'PVT_K1_asdf…'
 * ).then(console.log)
 * ```
 * The logged output will be PUB_K1_….
 */
export default async function public_key_from_private_key(wif_private_key) {
  const raw_pk = base58_to_binary(wif_private_key.replace("PVT_K1_", "")).slice(
    0,
    -4
  );
  return public_key_to_wif(get_public_key(raw_pk));
}

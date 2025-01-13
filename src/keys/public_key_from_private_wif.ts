import base58_to_binary from "base58-js/base58_to_binary.js";
import get_public_key from "isomorphic-secp256k1-js/get_public_key.js";

import public_key_to_wif from "./public_key_to_wif.js";

/**
 * Convert an Antelope private key to a public key.
 * @example <caption>Usage `public_key_from_private`.</caption>
 * ```js
 * import public_key_from_private from 'antelope-ecc/public_key_from_private'
 *
 * public_key_from_private(
 *   'PVT_K1_asdf…'
 * ).then(console.log)
 * ```
 * The logged output will be PUB_K1_….
 */
export default async function public_key_from_private_key(
  wif_private_key: string
) {
  const raw_pk = base58_to_binary(wif_private_key.replace("PVT_K1_", "")).slice(
    0,
    -4
  );

  return public_key_to_wif(await get_public_key(raw_pk));
}

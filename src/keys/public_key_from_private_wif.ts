import get_public_key from "isomorphic-secp256k1-js/get_public_key.js";

import private_key_from_wif from "./private_key_from_wif.js";
import public_key_to_wif from "./public_key_to_wif.js";

/**
 * Converts an Antelope PVT_K1_ private key into its
 * corresponding PUB_K1_ public key.
 *
 * @example
 * ```js
 * import {
 *   public_key_from_private_wif,
 * } from "antelope-ecc";
 *
 * console.log(
 *   public_key_from_private_wif("PVT_K1_...")
 * );
 * ```
 */
export default function public_key_from_private_wif(
  wif_private_key: string,
): string {
  const private_key = private_key_from_wif(wif_private_key);

  const public_key = get_public_key(private_key);

  return public_key_to_wif(public_key);
}

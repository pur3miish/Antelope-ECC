import get_public_key from "isomorphic-secp256k1-js/get_public_key.js";

import public_key_to_wif from "./private/public_key_to_wif.mjs";
import wif_to_private_key from "./private/wif_to_private_key.mjs";

/**
 * Convert an EOSIO/Antelope private key to a public key.
 * @kind function
 * @name public_key_from_private
 * @param {string} wif_private_key Wallet import format key.
 * @returns {string} Wallet import format public key.
 * @example <caption>Usage `public_key_from_private`.</caption>
 * ```js
 * import public_key_from_private from 'eos-ecc/public_key_from_private.mjs'
 *
 * public_key_from_private(
 *   '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3' // or PVT_K1_…
 * ).then(console.log)
 * ```
 * The logged output will be EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV or PUB_K1_….
 */
export default async function public_key_from_private(wif_private_key) {
  const private_key = await wif_to_private_key(wif_private_key);
  return public_key_to_wif(
    await get_public_key(private_key),
    !wif_private_key.startsWith("PVT_K1_")
  );
}

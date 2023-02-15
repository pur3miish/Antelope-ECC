import get_public_key from "isomorphic-secp256k1-js/get_public_key.js";

import private_key_to_wif from "./private_key_to_wif.mjs";
import public_key_to_wif from "./public_key_to_wif.mjs";
import random_bytes from "./random_bytes.mjs";

/**
 * An Antelope/EOSIO wallet import formatted (WIF) public & private key pair.
 * @kind typedef
 * @name KeyPair
 * @prop {string} public_key WIF public key.
 * @prop {string} private_key WIF private key.
 */

/**
 * Generate a new cryptographically random EOS key pair.
 * @kind function
 * @name new_eos_keys
 * @param {Uint8Array} [seed] A 32 byte array to seed a private key (seed < curve order n).
 * @returns {KeyPair} Key pair.
 * @example <caption>Usage `new_eos_keys`.</caption>
 * ```js
 * import new_eos_keys from 'eos-ecc/new_eos_keys.mjs')
 *
 * new_eos_keys().then(console.log)
 * ```
 * The logged output will be an object containing EOS wif public & private keys.
 */
export default async function new_eos_keys(seed) {
  const private_key = seed ? seed : await random_bytes();
  const public_key = await get_public_key(private_key);

  return {
    public_key: await public_key_to_wif(public_key),
    private_key: await private_key_to_wif(private_key),
  };
}

// @ts-check

import get_public_key from "isomorphic-secp256k1-js/get_public_key.mjs";

import random_bytes from "./internal/random_bytes.mjs";
import private_key_to_wif from "./keys/private_key_to_wif.mjs";
import public_key_to_wif from "./keys/public_key_to_wif.mjs";

/**
 * @typedef KeyPair
 * @prop {String} public_key Antelope/EOSIO public key (PUB_K1).
 * @prop {String} private_key Antelope/EOSIO private key (PVT_K1).
 */

/**
 * Generate a new pair of crypto keys for an Antelope/EOSIO based blockchain.
 * @kind function
 * @name new_keys
 * @param {Uint8Array} [seed] A 32 byte array to seed a private key (seed < curve order n).
 * @returns {Promise<KeyPair>} Key pair.
 * @example <caption>Usage `new_eos_keys`.</caption>
 * ```js
 * import new_keys from 'antelope-ecc/new_keys.mjs'
 * new_keys().then(console.log)
 * ```
 * The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.
 */
export default async function new_keys(seed) {
  const private_key = seed ? seed : await random_bytes();
  const public_key = await get_public_key(private_key);

  return {
    public_key: await public_key_to_wif(public_key),
    private_key: await private_key_to_wif(private_key),
  };
}

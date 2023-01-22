'use strict'

const { get_public_key } = require('isomorphic-secp256k1-js')
const private_key_to_wif = require('./private/private_key_to_wif.js')
const public_key_to_wif = require('./private/public_key_to_wif.js')
const random_bytes = require('./private/random_bytes.js')

/**
 * Generate a new pair of crypto keys for an antelope or EOSIO based blockchain.
 * @kind function
 * @name new_keys
 * @param {Uint8Array} [seed] A 32 byte array to seed a private key (seed < curve order n).
 * @returns {KeyPair} Key pair.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { new_keys } from 'eos-ecc'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { new_keys } = require('eos-ecc')
 * ```
 * @example <caption>Usage `new_eos_keys`.</caption>
 * ```js
 * new_keys().then(console.log)
 * ```
 * The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.
 */
async function new_keys(seed) {
  const private_key = seed ? seed : await random_bytes()
  const public_key = await get_public_key(private_key)

  return {
    public_key: await public_key_to_wif(public_key, false),
    private_key: await private_key_to_wif(private_key, false)
  }
}

module.exports = new_keys

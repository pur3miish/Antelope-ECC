'use strict'
const { get_public_key } = require('universal-ecdsa')
const private_key_to_wif = require('../private/private_key_to_wif')
const public_key_to_wif = require('../private/public_key_to_wif')
const random_bytes = require('../private/random_bytes')

/**
 * An EOS wallet import formatted (WIF) public & private key pair.
 * @kind typedef
 * @name KeyPair
 * @prop {string} public_key EOS WIF public key.
 * @prop {string} private_key EOS WIF private key.
 */

/**
 * Generate a new cryptographically random EOS key pair.
 * @kind function
 * @name new_eos_keys
 * @param {Uint8Array} [seed] A 32 byte array to seed a private key (seed < curve order n).
 * @returns {KeyPair} Key pair.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { new_eos_keys } from 'eos-ecc'
 * ```
 * ```js
 * import new_eos_keys from 'eos-ecc/public/new_eos_keys.js'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { new_eos_keys } = require('eos-ecc')
 * ```
 * ```js
 * const new_eos_keys = require('eos-ecc/public/new_eos_keys.js')
 * ```
 * @example <caption>Usage `new_eos_keys`.</caption>
 * ```js
 * new_eos_keys().then(console.log)
 * ```
 * The logged output will be an object containing EOS wif public & private keys.
 */
async function new_eos_keys(seed) {
  const private_key = seed ? seed : await random_bytes()
  const public_key = await get_public_key(private_key)

  return {
    public_key: await public_key_to_wif(public_key),
    private_key: await private_key_to_wif(private_key)
  }
}

module.exports = new_eos_keys

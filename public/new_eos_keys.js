'use strict'

const generate_key_pair = require('isomorphic-secp256k1/public/generate_key_pair')
const private_key_to_wif = require('../private/private_key_to_wif')
const public_key_to_wif = require('../private/public_key_to_wif')

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
async function new_eos_keys() {
  const { private_key, public_key } = await generate_key_pair()
  return {
    public_key: await public_key_to_wif(public_key),
    private_key: await private_key_to_wif(private_key)
  }
}

module.exports = new_eos_keys

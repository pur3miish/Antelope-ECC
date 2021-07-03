'use strict'

const { get_public_key } = require('universal-ecdsa')
const public_key_to_wif = require('../private/public_key_to_wif')
const wif_to_private_key = require('../private/wif_to_private_key')

/**
 * Convert an EOS WIF private key to a WIF public key.
 * @kind function
 * @name public_key_from_private
 * @param {string} wif_private_key EOS wallet import format key.
 * @returns {string} EOS wallet import format public key.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { public_key_from_private } from 'eos-ecc'
 * ```
 * ```js
 * import public_key_from_private from 'eos-ecc/public/public_key_from_private.js'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { public_key_from_private } = require('eos-ecc')
 * ```
 * ```js
 * const public_key_from_private = require('eos-ecc/public/public_key_from_private.js')
 * ```
 * @example <caption>Usage `public_key_from_private`.</caption>
 * ```js
 * public_key_from_private(
 *   '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
 * ).then(console.log)
 * ```
 * The logged output will be EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV.
 */
async function public_key_from_private(wif_private_key) {
  const private_key = await wif_to_private_key(wif_private_key)
  return public_key_to_wif(await get_public_key(private_key))
}

module.exports = public_key_from_private

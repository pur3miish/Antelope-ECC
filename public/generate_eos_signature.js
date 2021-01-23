'use strict'

const ripemd160 = require('@relocke/ripemd160')
const binary_to_base58 = require('base58-js/public/binary_to_base58.js')
const sign_hash = require('isomorphic-secp256k1/public/sign_hash')
const wif_to_private_key = require('../private/wif_to_private_key')

/**
 * Generate an EOS encoded signature.
 * @kind function
 * @name generate_eos_signature
 * @param {object} arg Argument.
 * @param {string} arg.hex Message digest sha256 to sign.
 * @param {string} arg.wif_private_key An EOS wallet import format private key.
 * @returns {string} EOS encoded signature.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { generate_eos_signature } from 'eos-ecc'
 * ```
 * ```js
 * import generate_eos_signature from 'eos-ecc/public/generate_eos_signature.js'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { generate_eos_signature } = require('eos-ecc')
 * ```
 * ```js
 * const generate_eos_signature = require('eos-ecc/public/generate_eos_signature.js')
 * ```
 * @example <caption>Usage of `generate_eos_signature`.</caption>
 * ```js
 * import crypto from 'crypto'
 *
 * const message = 'hello'
 * const hex = new Uint8Array(crypto.createHash('sha256').update(message).digest())
 * generate_eos_signature({ hex, wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3' }).then(console.log)
 * ```
 * The logged output will be SIG_K1_JxMN(…)NJ.
 */
const generate_eos_signature = async ({ hex, wif_private_key }) => {
  const { der_signature } = await sign_hash({
    hex,
    private_key: await wif_to_private_key(wif_private_key)
  })

  const [, , , r_length, ...bytes] = der_signature
  const r = bytes.slice(0, r_length)
  const [, , ...s] = bytes.slice(r_length)
  const i = 31 // signifies compressed & compact key.
  const K1 = [75, 49] // K1 as ascii
  const raw_sig = new Uint8Array([i, ...r, ...s])
  const checksum = ripemd160([...raw_sig, ...K1]).slice(0, 4)
  const base58_sig = binary_to_base58(new Uint8Array([...raw_sig, ...checksum]))
  return 'SIG_K1_' + base58_sig
}

module.exports = generate_eos_signature

'use strict'

const binary_to_base58 = require('base58-js/public/binary_to_base58.js')
const ripemd160 = require('ripemd160-js')
const { sign } = require('universal-ecdsa')
const wif_to_private_key = require('../private/wif_to_private_key')

/**
 * Generate an EOS encoded signature.
 * @kind function
 * @name sign_txn
 * @param {object} arg Argument.
 * @param {string | Uint8Array} arg.hex Data to sign.
 * @param {string} arg.wif_private_key An EOS wallet import format private key.
 * @returns {string} EOS encoded signature.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { sign_txn } from 'eos-ecc'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { sign_txn } = require('eos-ecc')
 * ```
 * @example <caption>Usage of `sign_hash`.</caption>
 * ```js
 * import crypto from 'crypto'
 *
 * sign_txn({
 *   hex: FDFDFDFD,
 *   wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
 * }).then(console.log)
 * ```
 * The logged output will be SIG_K1_….
 */
async function sign_txn({ hex, wif_private_key }) {
  const private_key = await wif_to_private_key(wif_private_key)
  let hex_array
  if (typeof hex == 'string')
    hex_array = new Uint8Array(
      hex.match(/[a-fA-F0-9]{2}/gmu).map(i => `0x${i}`)
    )
  else hex_array = hex

  const { r, s, racid } = await sign({ data: hex_array, private_key })
  const i = 31 + racid // compressed (4) + compact key(27).
  const K1 = [75, 49] // K1 as ascii
  const raw_sig = new Uint8Array([i, ...r, ...s])
  const hash = await ripemd160(Uint8Array.from([...raw_sig, ...K1]))
  const checksum = hash.slice(0, 4)

  const base58_sig = binary_to_base58(
    Uint8Array.from([...raw_sig, ...checksum])
  )

  return 'SIG_K1_' + base58_sig
}

module.exports = sign_txn

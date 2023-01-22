'use strict'

const { base58_to_binary } = require('base58-js')
const { recover_public_key: get_pub } = require('isomorphic-secp256k1-js')
const public_key_to_wif = require('./private/public_key_to_wif.js')

/**
 * Recovers EOS Wallet import format (WIF) public key from signature.
 * @param {obeject} Arg Argument
 * @kind function
 * @name recover_public_key
 * @param {string} Arg.signature EOS signature.
 * @param {string} Arg.hex Hex data that was used to create signature.
 * @param {bool} [Arg.legacy] Returns the key in the legacy format.
 * @returns {string} WIF Public key.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { recover_public_key } from 'eos-ecc'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { recover_public_key } = require('eos-ecc')
 * ```
 * @example <caption>Usage `public_key_from_private`.</caption>
 * ```js
 * recover_public_key({
 *   signature: 'SIG_K1_…',
 *   data: "ff"
 * }).then(console.log)
 * ```
 * The logged output will be EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV.
 */
async function recover_public_key({ signature, hex, legacy = false }) {
  let hex_array
  if (typeof hex == 'string')
    hex_array = new Uint8Array(
      hex.match(/[a-fA-F0-9]{2}/gmu).map(i => `0x${i}`)
    )
  else hex_array = hex

  if (!signature?.startsWith('SIG_K1_'))
    throw new TypeError('Invalid EOS signature, must start with “SIG_K1_”')

  const raw_sig = base58_to_binary(signature.replace('SIG_K1_', '')).slice(
    0,
    -4
  )

  const v = raw_sig.slice(0, 1)[0] - 31
  const r = raw_sig.slice(1, 33)
  const s = raw_sig.slice(33, 65)

  return public_key_to_wif(
    await get_pub({
      data: hex_array,
      signature: {
        r,
        s,
        v
      }
    }),
    legacy
  )
}

module.exports = recover_public_key
